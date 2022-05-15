export enum MaterialType {
  HonorLeapstone = 'HonorLeapstone',
  GreatHonorLeapstone = 'GreatHonorLeapstone',
  HonorShardPouchSmall = 'HonorShardPouchSmall',
  HonorShardPouchMedium = 'HonorShardPouchMedium',
  HonorShardPouchLarge = 'HonorShardPouchLarge',
  SolarGrace = 'SolarGrace',
  SolarBlessing = 'SolarBlessing',
  SolarProtection = 'SolarProtection',
  DestructionStoneCrystal = 'DestructionStoneCrystal',
  GuardianStoneCrystal = 'GuardianStoneCrystal',
  PowderOfSage = 'PowderOfSage',
  HPPotion = 'HPPotion',
  MajorHPPotion = 'MajorHPPotion',
  ElementalHPPotion = 'ElementalHPPotion',
  WildFlower = 'WildFlower',
  ShyWildFlower = 'ShyWildFlower',
  BrightWildFlower = 'BrightWildFlower',
  CrudeMushroom = 'CrudeMushroom',
  FreshMushroom = 'FreshMushroom',
  ExquisiteMushroom = 'ExquisiteMushroom',
  HeavyIronOre = 'HeavyIronOre',
  TenderTimber = 'TenderTimber',
  NaturalPearl = 'NaturalPearl',
  DestructionBomb = 'DestructionBomb',
  PheromoneBomb = 'PheromoneBomb',
  WhirlwindGrenade = 'WhirlwindGrenade',
  Flare = 'Flare',
  SacredCharm = 'SacredCharm',
  CaldarrFusionMaterial = 'CaldarrFusionMaterial',
  SimpleOrehaFusionMaterial = 'SimpleOrehaFusionMaterial',
  BasicOrehaFusionMaterial = 'BasicOrehaFusionMaterial',
  CaldarrThickRawMeat = 'CaldarrThickRawMeat',
  ToughLeather = 'ToughLeather',
  ThickRawMeat = 'ThickRawMeat',
  OrehaThickMeat = 'OrehaThickMeat',
  CaldarrSolarCarp = 'CaldarrSolarCarp',
  Fish = 'Fish',
  OrehaSolarCarp = 'OrehaSolarCarp',
  CaldarrRelic = 'CaldarrRelic',
  RareRelic = 'RareRelic',
  AncientRelic = 'AncientRelic',
  OrehaRelic = 'OrehaRelic',
}

export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
  Relic = 'Relic',
  Ancient = 'Ancient',
}

export interface Material {
  type: MaterialType;
  name: string;
  rarity: Rarity;
  chaosDungeonShards?: number;
  saleAmount?: number;
}
