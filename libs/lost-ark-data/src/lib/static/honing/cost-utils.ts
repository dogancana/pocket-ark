import { Rarity } from '../models/index';
import { armorHoningCosts } from './armor-honing-costs';
import { BodyItemType } from './models';
import { weaponHoningCosts } from './weapon-honing-costs';

export function getCostsOfUpgrade(
  itemType: BodyItemType,
  toLavel: number,
  rarity: Rarity
) {
  switch (rarity) {
    case Rarity.Relic:
    case Rarity.Legendary:
      return (itemType === 'armor' ? armorHoningCosts : weaponHoningCosts).find(
        (i) => i.toLevel === toLavel
      );
    default:
      return undefined;
  }
}
