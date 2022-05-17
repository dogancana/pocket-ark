import { MaterialType } from '../materials/models';
import { Rarity, Tier } from '../models';

export interface SecretMap {
  rarity: Rarity;
  tier: Tier;
  rewards: {
    type: MaterialType;
    amount: number;
  }[];
}
