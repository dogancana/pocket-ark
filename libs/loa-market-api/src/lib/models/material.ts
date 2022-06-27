export enum LOAMarketRarirty {
  Common = 0,
  Uncommon = 1,
  Rare = 2,
  Epic = 3,
  Legendary = 4,
  Relic = 5,
  Ancient = 6,
}

export enum LOAMarketCategory {
  EnhancementMaterial = 'Enhancement Material',
  Trader = 'Trader',
  EngravingRecipe = 'Engraving Recipe',
  CombatSupplies = 'Combat Supplies',
  AdventurersTome = "Adventurer's Tome",
  Cooking = 'Cooking',
  GemChest = 'Gem Chest',
  Mount = 'Mount',
  Pets = 'Pets',
  Sailing = 'Sailing',
  CurrencyExchange = 'Currency Exchange',
}

export interface LOAMarketMaterial {
  id: string;
  gameCode: string;
  name: string;
  image: string;
  avgPrice: number;
  lowPrice: number;
  recentPrice: number;
  cheapestRemaining: number;
  amount: number;
  rarity: LOAMarketRarirty;
  category: LOAMarketCategory;
  subcategory: string;
  shortHistoric: Record<string, number>;
  updatedAt: string;
}
