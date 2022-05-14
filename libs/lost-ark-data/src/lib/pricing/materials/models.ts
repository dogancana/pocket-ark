import { Material } from '../../static';

export interface PricedMaterial extends Material {
  price?: number;
}
