import { Rarity } from '../models';
import { MaterialsToCraft } from '../models/index';

export type BodyItemType = 'armor' | 'weapon';
export type BodyItemSlot =
  | 'helmet'
  | 'chest'
  | 'pants'
  | 'shoulders'
  | 'gloves'
  | 'weapon';

export interface BodyItem {
  rarity: Rarity;
  itemType: BodyItemType;
  itemSlot: BodyItemSlot;
}

export interface SingleLevelHoning {
  rarirty: Rarity;
  itemType: BodyItemType;
  upgrade: {
    gold: number;
    silver: number;
    shards: number;
    materials: MaterialsToCraft;
  };
  feed: {
    silver: number;
    shards: number;
  };
  fromLevel: number;
  toLevel: number;
  chance: {
    maxAttempts: number;
    reducedAttempts?: number;
    start: number;
    increase: number;
  };
}
