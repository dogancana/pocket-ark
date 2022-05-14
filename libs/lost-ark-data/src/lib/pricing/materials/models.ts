import { CurrencyType, Material } from '../../static';

export interface PricedMaterial extends Material {
  price?: number;
  values?: { [key in CurrencyType]?: number };
}
