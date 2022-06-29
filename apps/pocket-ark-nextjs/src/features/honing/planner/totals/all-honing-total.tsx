import {
  addCraftingMaterials,
  CurrencyItemType,
  CurrencyType,
  getResearchReduction,
  MaterialsToCraft,
} from '@pocket-ark/lost-ark-data';
import { flatten } from 'lodash';
import { useState } from 'react';
import { Divider } from 'semantic-ui-react';
import { useMaterials } from '../../../../components';
import { MaterialsLine } from '../../../../components/materials';
import { Currency } from '../../../../ui/currency/currency';
import { FC } from '../../../../utils/react';
import { sortMaterials } from '../../utils';
import { useHoningData } from '../data';
import { useHoningFilter } from '../filter/honing-filter-provider';
import { ExcludedMaterials } from './excluded-materials';

interface SlotTotals {
  materials: MaterialsToCraft;
  gold: number;
  silver: number;
  shards: number;
}

interface State {
  excludedMaterials: MaterialsToCraft;
}

export const AllHoningTotal: FC = () => {
  const honingData = useHoningData();
  const {
    state: { research1370 },
  } = useHoningFilter();
  const { materials, addMaterials } = useMaterials();
  const [{ excludedMaterials }, setState] = useState<State>({
    excludedMaterials: [],
  });

  const flattened = flatten(honingData.map((d) => d.costs));

  const totals = flattened.reduce(
    (acc: SlotTotals, curr) => {
      const discount = getResearchReduction(curr.toLevel, { research1370 });
      const feedMultiplier = discount?.feedMultiplier || 1;

      return {
        materials: addCraftingMaterials(
          acc.materials,
          curr.itemsNeededOnAverage
        ),
        gold:
          acc.gold +
          curr.upgrade.gold * (curr.averageAttemptIndexToSuccess + 1),
        silver:
          acc.silver +
          curr.feed.silver * feedMultiplier +
          curr.upgrade.silver +
          (curr.averageAttemptIndexToSuccess + 1),
        shards:
          acc.shards +
          curr.feed.shards * feedMultiplier +
          curr.upgrade.shards * (curr.averageAttemptIndexToSuccess + 1),
      };
    },
    {
      materials: [],
      gold: 0,
      silver: 0,
      shards: 0,
    }
  );

  const totalCost = addMaterials(
    totals.materials.map((m) => {
      const alreadyHave = excludedMaterials.find((e) => e.type === m.type);
      const amount = alreadyHave
        ? Math.max(0, m.amount - alreadyHave.amount)
        : m.amount;
      return { type: m.type, amount };
    })
  );

  const honingMaterials = sortMaterials(totals.materials).map((m) => ({
    ...materials[m.type],
    count: m.amount,
  }));

  if (totals.gold === 0) {
    return <span className="text-gray-500">Nothing to calculate</span>;
  }

  return (
    <div>
      <Divider />
      <div className="flex flex-col md:flex-row pb-4 md-pb-16">
        <div className="flex flex-col md:flex-row items-end md:items-start">
          <span className="whitespace-nowrap mb-3">Need on average:</span>
          <div className="flex flex-col items-end">
            <div className="flex pl-3 flex-wrap justify-end">
              <MaterialsLine
                materials={honingMaterials}
                className="mb-3 mr-0 ml-3"
              />
            </div>
            <div className="flex mt-2">
              <Currency
                type={CurrencyType.Silver}
                value={totals.silver}
                className="mr-3"
              />
              <Currency
                type={CurrencyItemType.HonorShard}
                value={totals.shards}
                className="mr-3"
              />
              <Currency type={CurrencyType.Gold} value={totals.gold} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-0.5 h-0.5 md:h-auto bg-gray-300 my-4 mx-0 md:mx-8 md:my-1"></div>
        <div>
          <div className="flex items-center justify-end">
            Mats. Cost:
            <div className="flex align-center">
              <Currency
                type={CurrencyType.Gold}
                value={totalCost}
                className="mx-3"
              />
              <ExcludedMaterials onMaterialsChanged={onMaterialsExcluded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function onMaterialsExcluded(materials: MaterialsToCraft) {
    setState((p) => ({ ...p, excludedMaterials: materials }));
  }
};
