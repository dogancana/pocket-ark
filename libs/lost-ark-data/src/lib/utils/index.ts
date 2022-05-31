import { PricingSource } from '../pricing/models';
import { materials } from '../static/materials/materials';
import { MaterialsToCraft } from '../static/models/index';

export function isSourceComplete(source: PricingSource): boolean {
  const hasCurrencies = Boolean(
    source.goldSalePrice !== undefined &&
      source.crystalSalePrice !== undefined &&
      source.royalCrystalsPack
  );

  return hasCurrencies && materials.every((m) => !!source[m.type]?.price);
}

export function addCraftingMaterials(
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
