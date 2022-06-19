import { MaterialCategory } from './models';
import { Rarity } from '../models/index';

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
];

export const raritySorting: Rarity[] = [
  Rarity.Common,
  Rarity.Uncommon,
  Rarity.Rare,
  Rarity.Epic,
  Rarity.Legendary,
  Rarity.Ancient,
];
