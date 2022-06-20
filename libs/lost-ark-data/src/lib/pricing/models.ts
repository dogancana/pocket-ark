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
  region: 'EUC' | 'EUW' | 'SA' | 'NAE' | 'NAW';
  description: string;
}

export type PricingSource = CurrencyConversionSource & {
  meta?: PriceSourceMeta;
} & {
  [key in MaterialType]?: {
    price: number;
  };
};

export type PartialPricingSource = {
  meta?: Partial<PricingSource['meta']>;
} & Partial<Omit<PricingSource, 'meta'>>;
