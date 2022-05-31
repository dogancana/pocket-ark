import { MaterialType } from '../materials/models';

export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
  Relic = 'Relic',
  Ancient = 'Ancient',
}

export const rarityOrder: Rarity[] = [
  Rarity.Common,
  Rarity.Uncommon,
  Rarity.Rare,
  Rarity.Epic,
  Rarity.Legendary,
  Rarity.Relic,
  Rarity.Ancient,
];

export enum Tier {
  One = 1,
  Two = 2,
  Three = 3,
}

export type MaterialsToCraft = Array<{
  type: MaterialType;
  amount: number;
}>;
