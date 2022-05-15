import { MaterialType } from '@pocket-ark/lost-ark-data';

export interface CurrencyConversionSource {
  goldSalePrice?: number;
  crystalSalePrice?: number;
  royalCrystalsPack?: number;
}

export type PricingSource = CurrencyConversionSource & {
  [key in MaterialType]?: {
    price: number;
  };
};
