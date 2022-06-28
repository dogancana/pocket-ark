import { Rarity } from '@pocket-ark/lost-ark-data';

export function rarityString(rarity: Rarity) {
  switch (rarity) {
    case Rarity.Uncommon:
      return 'Uncommon';
    case Rarity.Common:
      return 'Common';
    case Rarity.Rare:
      return 'Rare';
    case Rarity.Epic:
      return 'Epic';
    case Rarity.Legendary:
      return 'Legendary';
    case Rarity.Relic:
      return 'Relic';
    case Rarity.Ancient:
      return 'Ancient';
  }
}
