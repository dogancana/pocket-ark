import {
  BodyItemType,
  MaterialsToCraft,
  MaterialType,
  Rarity,
} from '@pocket-ark/lost-ark-data';
import { MaterialsObject } from '../../utils/materials';

export function allowedGrace(toLevel) {
  if (toLevel >= 22) return 48;
  if (toLevel >= 18) return 36;
  if (toLevel >= 12) return 24;
  if (toLevel >= 7) return 12;
  return 0;
}

export function allowedProtection(toLevel: number) {
  if (toLevel >= 22) {
    return {
      [MaterialType.SolarGrace]: 48,
      [MaterialType.SolarBlessing]: 10,
      [MaterialType.SolarProtection]: 8,
    };
  }
  if (toLevel >= 18) {
    return {
      [MaterialType.SolarGrace]: 36,
      [MaterialType.SolarBlessing]: 15,
      [MaterialType.SolarProtection]: 6,
    };
  }
  if (toLevel >= 12) {
    return {
      [MaterialType.SolarGrace]: 24,
      [MaterialType.SolarBlessing]: 12,
      [MaterialType.SolarProtection]: 4,
    };
  }
  if (toLevel >= 7) {
    return {
      [MaterialType.SolarGrace]: 12,
      [MaterialType.SolarBlessing]: 6,
      [MaterialType.SolarProtection]: 2,
    };
  }
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
  prices: MaterialsObject
): MaterialProtectionScore[] {
  const chanceIncreasePerMaterialType = baseChance / 3;
  const costOfOnePerc = cost / chance;
  const isEpic = rarity === Rarity.Epic;
  const isLegendary = rarity === Rarity.Legendary;
  const isRelic = rarity === Rarity.Relic;
  const isWeapon = armorType === 'weapon';
  const isArmor = armorType === 'armor';
  const hasLevelForExtra = toLevel > 7 && toLevel < 16;
  const allowed = allowedProtection(toLevel);

  return [
    {
      type: MaterialType.SolarGrace,
      allowed: allowed[MaterialType.SolarGrace],
      chancePerMat: chanceIncreasePerMaterialType,
    },
    {
      type: MaterialType.SolarBlessing,
      allowed: allowed[MaterialType.SolarBlessing],
      chancePerMat: chanceIncreasePerMaterialType,
    },
    {
      type: MaterialType.SolarProtection,
      allowed: allowed[MaterialType.SolarProtection],
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
      const totalCost = p.allowed * prices?.[p.type]?.lowPrice;
      const protectionCostOfOnePerc = totalCost / p.chancePerMat;

      return {
        ...p,
        chanceIncreaseMaterial: p.allowed ? p.chancePerMat / p.allowed : 0,
        costPerMaterial: prices?.[p.type].lowPrice,
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
