import {
  armorHoningCosts,
  BodyItemSlot,
  getResearchReduction,
  MaterialsToCraft,
  MaterialType,
  SingleLevelHoning,
  weaponHoningCosts,
} from '@pocket-ark/lost-ark-data';
import { flattenDeep } from 'lodash';
import { useMaterials } from '../../../../components/materials-provider';
import { MaterialsObject } from '../../../../utils/materials';
import {
  HoningCosts,
  SingleLevelHoningWithAttempts,
  SingleLevelHoningWithTotals,
} from '../../models';
import { limitProtection, protection } from '../../utils';
import { useHoningFilter } from '../filter/honing-filter-provider';
import { Item } from '../filter/models';

const slots: BodyItemSlot[] = [
  'helmet',
  'shoulders',
  'chest',
  'pants',
  'gloves',
  'weapon',
];

export function useHoningData() {
  const { materials, addMaterials } = useMaterials();
  const {
    state: { from, to, avgChance, research1370 },
  } = useHoningFilter();

  return slots
    .filter((s) => !from.find((f) => f.slot === s).hidden)
    .map((slot) => {
      const fromItem = from.find((f) => f.slot === slot);
      const toItem = to.find((f) => f.slot === slot);
      const plannedCosts = (
        slot === 'weapon' ? weaponHoningCosts : armorHoningCosts
      ).filter((cost) => getIsPlanned(cost, fromItem, toItem));

      const costs = plannedCosts.map((cost): SingleLevelHoningWithAttempts => {
        const attempts = createAttemptsWithProtectionData(
          cost,
          materials,
          research1370,
          addMaterials
        );

        const expectedCostProtected = expectedCost(
          attempts.map((a) => ({
            chancePerc: a.chance + a.protectionChance,
            cost: a.cost + a.protectionCost,
          }))
        );
        const expectedCostUnprotected = expectedCost(
          attempts.map((a) => ({
            chancePerc: a.chance,
            cost: a.cost,
          }))
        );

        return {
          ...cost,
          attempts: attempts.map((a) => ({
            ...a,
            flattenChanceProtected:
              expectedCostProtected.flattenChances[a.attemptNumber],
            flattenChanceUnprotected:
              expectedCostUnprotected.flattenChances[a.attemptNumber],
          })),
          expectedCostUnprotected: expectedCostUnprotected.expectedCost,
          expectedCostProtected: expectedCostProtected.expectedCost,
        };
      });

      const costsWithSuccessPoints = mapCostsForAttemptToSucceed(
        costs,
        avgChance,
        research1370
      );

      return {
        slot,
        costs: costsWithSuccessPoints,
      };
    });
}

function createAttemptsWithProtectionData(
  cost: SingleLevelHoning,
  prices: MaterialsObject,
  research1370: boolean,
  addMaterials: ReturnType<typeof useMaterials>['addMaterials']
) {
  const discount = getResearchReduction(cost.toLevel, { research1370 });
  const chanceIncrease = discount?.chanceIncrease || 0;
  const attempts = discount
    ? cost.chance.reducedAttempts || cost.chance.maxAttempts
    : cost.chance.maxAttempts;

  return new Array(attempts)
    .fill(0)
    .map((_, i) => ({
      // Basic chance and cost
      attemptNumber: i,
      chance:
        i === attempts - 1
          ? 100
          : Math.min(
              cost.chance.start + i * cost.chance.increase,
              cost.chance.start * 2
            ) + chanceIncrease,
      cost:
        addMaterials(
          cost.upgrade.materials.filter(
            (m) => m.type !== MaterialType.HonorShardPouchMedium
          )
        ) + cost.upgrade.gold,
    }))
    .map((a) => {
      return {
        // protection
        ...a,
        protection: protection(
          cost.chance.start,
          a.chance,
          a.cost,
          cost.toLevel,
          cost.rarirty,
          cost.itemType,
          prices
        ),
      };
    })
    .map((a) => {
      // protection
      const protection = limitProtection(a.chance, a.protection);
      const protectionCost = protection.reduce(
        (acc, curr) => acc + curr.recommended * curr.costPerMaterial,
        0
      );
      const protectionChance = protection.reduce(
        (acc, curr) => acc + curr.recommended * curr.chanceIncreaseMaterial,
        0
      );

      return {
        ...a,
        protection,
        protectionCost,
        protectionChance,
      };
    });
}

function expectedCost(
  attempts: { chancePerc: number; cost: number }[]
): HoningCosts {
  const res = attempts.reduce(
    (acc, step) => {
      const chance = step.chancePerc / 100;
      const flattenChance = chance * (1 - acc.carryChance);
      const carryCost = acc.carryCost + step.cost;

      return {
        carryChance: acc.carryChance + flattenChance,
        carryCost: acc.carryCost + step.cost,
        expectedCost: acc.expectedCost + flattenChance * carryCost,
        arr: [
          ...acc.arr,
          {
            flattenChance,
            carryCost,
          },
        ],
      };
    },
    {
      carryChance: 0,
      carryCost: 0,
      arr: [] as { flattenChance: number; carryCost: number }[],
      expectedCost: 0,
    }
  );
  return {
    expectedCost: res.expectedCost,
    flattenChances: res.arr.map((i) => i.flattenChance),
  };
}

function getIsPlanned(cost: SingleLevelHoning, fromItem: Item, toItem: Item) {
  if (cost.toLevel > toItem.level || cost.fromLevel < fromItem.level) {
    return false;
  }

  return true;
}

function mapCostsForAttemptToSucceed(
  costs: SingleLevelHoningWithAttempts[],
  avgChance: number,
  research1370: boolean
): SingleLevelHoningWithTotals[] {
  const mappedCosts = costs.map((cost) => {
    const discount = getResearchReduction(cost.toLevel, { research1370 });
    const feedMultiplier = discount?.feedMultiplier || 1;
    const averageAttemptIndexToSuccess = cost.attempts
      .reduce((acc, curr) => {
        const last = acc[acc.length - 1];
        return [
          ...acc,
          last
            ? last + curr.flattenChanceProtected
            : curr.flattenChanceProtected,
        ];
      }, [] as number[])
      .findIndex((p) => p * 100 >= avgChance);

    return {
      ...cost,
      feed: {
        silver: cost.feed.silver * feedMultiplier,
        shards: cost.feed.shards * feedMultiplier,
      },
      averageAttemptIndexToSuccess,
    };
  });

  return mappedCosts.map((cost) => {
    const { averageAttemptIndexToSuccess } = cost;
    const base = cost.upgrade.materials.map((m) => ({
      ...m,
      amount: m.amount * (averageAttemptIndexToSuccess + 1),
    }));
    const protection = flattenDeep(
      cost.attempts
        .slice(0, averageAttemptIndexToSuccess + 1)
        .map((a) => a.protection)
    )
      .map((p) => ({ type: p.type, amount: p.recommended }))
      .filter((m) => m.amount > 0)
      .reduce((acc, curr) => addMaterials(acc, [curr]), [] as MaterialsToCraft);

    const itemsNeededOnAverage = addMaterials(base, protection);

    return {
      ...cost,
      itemsNeededOnAverage,
    };
  });
}

function addMaterials(
  source: MaterialsToCraft,
  additions: MaterialsToCraft
): MaterialsToCraft {
  return [
    ...source.map((i) => {
      const addition = additions.find((a) => a.type === i.type);
      if (!addition) {
        return i;
      }

      return {
        ...i,
        amount: i.amount + addition.amount,
      };
    }),
    ...additions.filter((a) => !source.find((i) => i.type === a.type)),
  ];
}
