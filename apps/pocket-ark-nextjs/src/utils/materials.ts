import { LOAMarketMaterial } from '@pocket-ark/loa-market-api';
import {
  Material,
  materialsObject,
  MaterialType
} from '@pocket-ark/lost-ark-data';

export interface PricedMaterial
  extends Omit<Material, 'rarity' | 'category'>,
    LOAMarketMaterial {}

export type MaterialsObject = {
  [key in MaterialType]?: PricedMaterial;
};

export function mapLOAMMaterialType(material: LOAMarketMaterial): MaterialType {
  return material.name.replace(/\[?.+\]| |'|:|\(|\)/g, '') as MaterialType;
}

export function mapLOAMMaterial(material: LOAMarketMaterial): PricedMaterial {
  const type = mapLOAMMaterialType(material);
  const paMaterial = materialsObject[type];
  return {
    ...paMaterial,
    ...material,
  };
}
