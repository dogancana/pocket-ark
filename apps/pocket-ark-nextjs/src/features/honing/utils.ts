import { MaterialsToCraft, MaterialType } from '@pocket-ark/lost-ark-data';
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
 * @param prices Priced materials object.
 * @returns Value score of honing protection materials with allowed max items. If there is no price information, score is undefined.
 */
export function protection(
  baseChance: number,
  chance: number,
  cost: number,
  toLevel: number,
  prices: ReturnType<typeof usePricingSource>['pricedMaterialsObject']
): MaterialProtectionScore[] {
  const chanceIncreasePerMaterialType = baseChance / 3;
  const costOfOnePerc = cost / chance;

  return [
    {
      type: MaterialType.SolarGrace,
      allowed: allowedGrace(toLevel),
    },
    {
      type: MaterialType.SolarBlessing,
      allowed: allowedGrace(toLevel) / 2,
    },
    {
      type: MaterialType.SolarProtection,
      allowed: allowedGrace(toLevel) / 6,
    },
  ].map((p) => {
    const totalCost = p.allowed * prices[p.type].price;
    const protectionCostOfOnePerc = totalCost / chanceIncreasePerMaterialType;

    return {
      ...p,
      chanceIncreaseMaterial: p.allowed
        ? chanceIncreasePerMaterialType / p.allowed
        : 0,
      costPerMaterial: prices[p.type].price,
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
