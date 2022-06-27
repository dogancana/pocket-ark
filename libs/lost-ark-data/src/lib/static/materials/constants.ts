import { MaterialCategory, MaterialType, Material } from './models';
import { Rarity } from '../models/index';
import { materials } from './materials';

export const categorySorting: MaterialCategory[] = [
  'honingMaterials',
  'additionalHoningMaterials',
  'otherMaterials',
  'recoveryBattleItem',
  'offenseBattleItem',
  'utilityBattleItem',
  'buffBattleItem',
  'cooking',
  'foraging',
  'logging',
  'mining',
  'hunting',
  'fishing',
  'excavating',
  'cooking',
  'currency',
];

export const raritySorting: Rarity[] = [
  Rarity.Common,
  Rarity.Uncommon,
  Rarity.Rare,
  Rarity.Epic,
  Rarity.Legendary,
  Rarity.Ancient,
];

export const materialKeys = materials.map((m) => m.type);
export const materialsObject = materials.reduce(
  (prev, curr) => ({
    ...prev,
    [curr.type]: curr,
  }),
  {} as { [key in MaterialType]: Material }
);
