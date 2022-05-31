import { Rarity } from '@pocket-ark/lost-ark-data';
import { Item } from './models';

export const initalFromSet: Item[] = [
  { rarity: Rarity.Legendary, level: 12, slot: 'helmet', hidden: true },
  { rarity: Rarity.Legendary, level: 12, slot: 'shoulders', hidden: true },
  { rarity: Rarity.Legendary, level: 12, slot: 'chest', hidden: true },
  { rarity: Rarity.Legendary, level: 12, slot: 'pants', hidden: true },
  { rarity: Rarity.Legendary, level: 12, slot: 'gloves' },
  { rarity: Rarity.Legendary, level: 12, slot: 'weapon' },
];

export const initialToSet: Item[] = [
  { rarity: Rarity.Legendary, level: 15, slot: 'helmet', hidden: true },
  { rarity: Rarity.Legendary, level: 15, slot: 'shoulders', hidden: true },
  { rarity: Rarity.Legendary, level: 15, slot: 'chest', hidden: true },
  { rarity: Rarity.Legendary, level: 15, slot: 'pants', hidden: true },
  { rarity: Rarity.Legendary, level: 15, slot: 'gloves' },
  { rarity: Rarity.Legendary, level: 15, slot: 'weapon' },
];
