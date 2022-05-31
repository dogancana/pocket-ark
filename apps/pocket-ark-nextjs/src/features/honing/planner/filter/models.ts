import { BodyItemSlot, Rarity } from '@pocket-ark/lost-ark-data';

export interface Item {
  slot: BodyItemSlot;
  rarity: Rarity;
  level: number;
  hidden?: boolean;
}
