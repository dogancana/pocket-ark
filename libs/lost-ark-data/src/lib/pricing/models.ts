import { MaterialType } from '../static';

export interface CurrencyConversionSource {
  goldSalePrice?: number;
  crystalSalePrice?: number;
  royalCrystalsPack?: number;
}

export interface PriceSourceMeta {
  lastUpdatedAtISO: string;
  reference: string;
  key?: string;
}

export type PricingSource = CurrencyConversionSource & {
  meta?: PriceSourceMeta;
} & {
  [key in MaterialType]?: {
    price: number;
  };
};
