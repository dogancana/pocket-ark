import { MaterialType } from '@pocket-ark/lost-ark-data';
import { CurrencyType } from '../static';

export interface CurrencyConversionSource {
  goldSalePrice: number;
  crystalSalePrice: number;
  royalCrystalsPack: number;
}

export type PricingSource = CurrencyConversionSource & {
  [key in MaterialType]?: {
    price: number;
  };
};

export interface CurrencyConverterStatic {
  from: CurrencyType;
  to: CurrencyType;
  multiplier: number;
}
