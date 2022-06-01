import {
  BodyItemType,
  MaterialsToCraft,
  MaterialType,
  Rarity,
} from '@pocket-ark/lost-ark-data';
import { usePricingSource } from '../../components';

export function allowedGrace(toLevel) {
  if (toLevel >= 12) return 24;
  if (toLevel >= 7) return 12;
  return 0;
}

export interface MaterialProtectionScore {
  type: MaterialType;
  allowed: number;
  chanceIncreaseMaterial: number;
  costPerMaterial: number;
  score?: number;
}

/**
 * Calculates value score of honing protection materials based on pricing data.
 * It doesn't check if materials would go into was if all of them were used.
 *
 * @param baseChance Percentage of base chance without artistan energy.
 * @param chance Percentage of current honing chance with artistan energy.
 * @param cost Cost of one honing attempt.
 * @param toLevel Target level.
 * @param rarity Rarity of the item.
 * @param armorType Armor type of the item.
 * @param prices Priced materials object.
 * @returns Value score of honing protection materials with allowed max items. If there is no price information, score is undefined.
 */
export function protection(
  baseChance: number,
  chance: number,
  cost: number,
  toLevel: number,
  rarity: Rarity,
  armorType: BodyItemType,
  prices: ReturnType<typeof usePricingSource>['pricedMaterialsObject']
): MaterialProtectionScore[] {
  const chanceIncreasePerMaterialType = baseChance / 3;
  const costOfOnePerc = cost / chance;
  const isEpic = rarity === Rarity.Epic;
  const isLegendary = rarity === Rarity.Legendary;
  const isRelic = rarity === Rarity.Relic;
  const isWeapon = armorType === 'weapon';
  const isArmor = armorType === 'armor';
  const hasLevelForExtra = toLevel > 7 && toLevel < 16;

  return [
    {
      type: MaterialType.SolarGrace,
      allowed: allowedGrace(toLevel),
      chancePerMat: chanceIncreasePerMaterialType,
    },
    {
      type: MaterialType.SolarBlessing,
      allowed: allowedGrace(toLevel) / 2,
      chancePerMat: chanceIncreasePerMaterialType,
    },
    {
      type: MaterialType.SolarProtection,
      allowed: allowedGrace(toLevel) / 6,
      chancePerMat: chanceIncreasePerMaterialType,
    },
    {
      type: MaterialType.TailoringBasicMending,
      allowed: isEpic && isArmor && hasLevelForExtra ? 1 : 0,
      chancePerMat: 10,
    },
    {
      type: MaterialType.TailoringAppliedMending,
      allowed: (isLegendary || isRelic) && isArmor && hasLevelForExtra ? 1 : 0,
      chancePerMat: 10,
    },
    {
      type: MaterialType.MetallurgyBasicWelding,
      allowed: isEpic && isWeapon && hasLevelForExtra ? 1 : 0,
      chancePerMat: 10,
    },
    {
      type: MaterialType.MetallurgyAppliedWelding,
      allowed: (isLegendary || isRelic) && isWeapon && hasLevelForExtra ? 1 : 0,
      chancePerMat: 10,
    },
  ]
    .filter((p) => p.allowed > 0)
    .map((p) => {
      const totalCost = p.allowed * prices?.[p.type]?.price;
      const protectionCostOfOnePerc = totalCost / p.chancePerMat;

      return {
        ...p,
        chanceIncreaseMaterial: p.allowed ? p.chancePerMat / p.allowed : 0,
        costPerMaterial: prices?.[p.type].price,
        score: costOfOnePerc / protectionCostOfOnePerc,
      };
    });
}

export interface RecommendedProtections extends MaterialProtectionScore {
  recommended: number;
}

export function limitProtection(
  chance: number,
  protections: MaterialProtectionScore[]
): RecommendedProtections[] {
  const sortedProtections = protections.sort((a, b) => b.score - a.score);

  const recommended: { [key in MaterialType]?: number } = {};

  for (
    let i = 0, totalChance = chance;
    i < sortedProtections.length && totalChance < 100;
    i++
  ) {
    const protection = sortedProtections[i];

    if (!protection.allowed || !(protection.score > 1)) continue;

    const remainingPerc = 100 - totalChance;
    const itemsToUse = Math.min(
      Math.ceil(remainingPerc / protection.chanceIncreaseMaterial),
      protection.allowed
    );
    totalChance += protection.chanceIncreaseMaterial * itemsToUse;
    recommended[protection.type] = itemsToUse;
  }

  return sortedProtections.map((p) => ({
    ...p,
    recommended: recommended[p.type] || 0,
  }));
}

const sorter = [
  MaterialType.SimpleOrehaFusionMaterial,
  MaterialType.BasicOrehaFusionMaterial,
  MaterialType.GuardianStoneCrystal,
  MaterialType.DestructionStoneCrystal,
  MaterialType.HonorLeapstone,
  MaterialType.GreatHonorLeapstone,
  MaterialType.SolarGrace,
  MaterialType.SolarBlessing,
  MaterialType.SolarProtection,
];

export function sortMaterials(materials: MaterialsToCraft) {
  return materials?.sort(
    (a, b) =>
      sorter.findIndex((predicate) => predicate === a.type) -
      sorter.findIndex((predicate) => predicate === b.type)
  );
}
