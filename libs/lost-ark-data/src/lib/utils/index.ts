import { PricingSource } from '../pricing/models';
import { materials } from '../static/materials/materials';

export function isSourceComplete(source: PricingSource): boolean {
  const hasCurrencies = Boolean(
    source.goldSalePrice !== undefined &&
      source.crystalSalePrice !== undefined &&
      source.royalCrystalsPack
  );

  return hasCurrencies && materials.every((m) => !!source[m.type]?.price);
}
