import { MaterialType } from '../materials/models';

export enum Rarity {
  Common = 0,
  Uncommon = 1,
  Rare = 2,
  Epic = 3,
  Legendary = 4,
  Relic = 5,
  Ancient = 6,
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
