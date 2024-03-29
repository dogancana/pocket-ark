import { Rarity } from '../models';

export enum MaterialType {
  BlueCrystal = 'BlueCrystal',
  RoyalCrystal = 'RoyalCrystal',
  HonorLeapstone = 'HonorLeapstone',
  GreatHonorLeapstone = 'GreatHonorLeapstone',
  HarmonyShardPouchSmall = 'HarmonyShardPouchS',
  HarmonyShardPouchMedium = 'HarmonyShardPouchM',
  HarmonyShardPouchLarge = 'HarmonyShardPouchL',
  LifeShardPouchSmall = 'LifeShardPouchS',
  LifeShardPouchMedium = 'LifeShardPouchM',
  LifeShardPouchLarge = 'LifeShardPouchL',
  HonorShardPouchSmall = 'HonorShardPouchS',
  HonorShardPouchMedium = 'HonorShardPouchM',
  HonorShardPouchLarge = 'HonorShardPouchL',
  SolarGrace = 'SolarGrace',
  SolarBlessing = 'SolarBlessing',
  SolarProtection = 'SolarProtection',
  StarsBreath = 'StarsBreath',
  MoonsBreath = 'MoonsBreath',
  DestructionStoneCrystal = 'CrystallizedDestructionStone',
  GuardianStoneCrystal = 'CrystallizedGuardianStone',
  PowderOfSage = 'PowderofSage',
  HPPotion = 'HPPotion',
  MajorHPPotion = 'MajorHPPotion',
  ElementalHPPotion = 'ElementalHPPotion',
  SplendidElementalHPPotion = 'SplendidElementalHPPotion',
  WildFlower = 'WildFlower',
  ShyWildFlower = 'ShyWildFlower',
  BrightWildFlower = 'BrightWildFlower',
  CrudeMushroom = 'CrudeMushroom',
  FreshMushroom = 'FreshMushroom',
  ExquisiteMushroom = 'ExquisiteMushroom',
  Timber = 'Timber',
  TenderTimber = 'TenderTimber',
  SturdyTimber = 'SturdyTimber',
  IronOre = 'IronOre',
  HeavyIronOre = 'HeavyIronOre',
  StrongIronOre = 'StrongIronOre',
  SacredBomb = 'SacredBomb',
  ElectricGrenade = 'ElectricGrenade',
  FlameGrenade = 'FlameGrenade',
  ClayGrenade = 'ClayGrenade',
  FrostGrenade = 'FrostGrenade',
  DarkGrenade = 'DarkGrenade',
  CorrosiveBomb = 'CorrosiveBomb',
  FlashGrenade = 'FlashGrenade',
  SleepBomb = 'SleepBomb',
  DestructionBomb = 'DestructionBomb',
  WhirlwindGrenade = 'WhirlwindGrenade',
  ThunderPotion = 'ThunderPotion',
  SplendidCorrosionBomb = 'SplendidCorrosionBomb',
  SplendidSacredBomb = 'SplendidSacredBomb',
  SplendidDestructionBomb = 'SplendidDestructionBomb',
  SplendidFrostGrenade = 'SplendidFrostGrenade',
  SplendidFlameGrenade = 'SplendidFlameGrenade',
  SplendidWhirlwindGrenade = 'SplendidWhirlwindGrenade',
  SplendidSleepBomb = 'SplendidSleepBomb',
  SplendidDarkGrenade = 'SplendidDarkGrenade',
  SplendidClayGrenade = 'SplendidClayGrenade',
  SplendidThunderPotion = 'SplendidThunderPotion',
  SplendidFlashGrenade = 'SplendidFlashGrenade',
  TauntingScarecrow = 'TauntingScarecrow',
  CamouflageRobe = 'CamouflageRobe',
  StealthRobe = 'StealthRobe',
  RepairShopPortalScroll = 'RepairShopPortalScroll',
  Panacea = 'Panacea',
  PheromoneBomb = 'PheromoneBomb',
  Campfire = 'Campfire',
  SacredCharm = 'SacredCharm',
  Flare = 'Flare',
  SplendidSacredCharm = 'SplendidSacredCharm',
  LuterrasHorn = 'LuterrasHorn',
  SplendidDisguiseRobe = 'SplendidDisguiseRobe',
  SplendidTauntingScarecrow = 'SplendidTauntingScarecrow',
  SplendidFlare = 'SplendidFlare',
  TimeStopPotion = 'TimeStopPotion',
  SplendidCampfire = 'SplendidCampfire',
  SplendidPanacea = 'SplendidPanacea',
  SplendidStealthRobe = 'SplendidStealthRobe',
  ProtectivePotion = 'ProtectivePotion',
  MarchingFlag = 'MarchingFlag',
  SwiftnessRobe = 'SwiftnessRobe',
  SplendidMarchingFlag = 'SplendidMarchingFlag',
  Stimulant = 'Stimulant',
  SplendidProtectivePotion = 'SplendidProtectivePotion',
  AdrophinePotion = 'AdrophinePotion',
  SplendidSprintersRobe = 'SplendidSwiftRobe',
  CaldarrFusionMaterial = 'CaldarrFusionMaterial',
  SimpleOrehaFusionMaterial = 'SimpleOrehaFusionMaterial',
  BasicOrehaFusionMaterial = 'BasicOrehaFusionMaterial',
  CaldarrThickRawMeat = 'CaldarrThickRawMeat',
  ToughLeather = 'ToughLeather',
  TreatedMeat = 'TreatedMeat',
  ThickRawMeat = 'ThickRawMeat',
  OrehaThickMeat = 'OrehaThickMeat',
  NaturalPearl = 'NaturalPearl',
  Fish = 'Fish',
  RedfleshFish = 'RedfleshFish',
  CaldarrSolarCarp = 'CaldarrSolarCarp',
  OrehaSolarCarp = 'OrehaSolarCarp',
  CaldarrRelic = 'CaldarrRelic',
  RareRelic = 'RareRelic',
  AncientRelic = 'AncientRelic',
  OrehaRelic = 'OrehaRelic',
  TailoringBasicMending = 'TailoringBasicMending',
  TailoringAppliedMending = 'TailoringAppliedMending',
  MetallurgyBasicWelding = 'MetallurgyBasicWelding',
  MetallurgyAppliedWelding = 'MetallurgyAppliedWelding',
  MastersSaltyStew = 'MastersSaltyStew',
  MastersMoistOmelet = 'MastersMoistOmelet',
  MastersChewyGrilledSkewers = 'MastersChewyGrilledSkewers',
  MastersHerbSteakMeal = 'MastersHerbSteakMeal',
}

export type MaterialCategory =
  | 'honingMaterials'
  | 'additionalHoningMaterials'
  | 'otherMaterials'
  | 'recoveryBattleItem'
  | 'offenseBattleItem'
  | 'utilityBattleItem'
  | 'buffBattleItem'
  | 'cooking'
  | 'foraging'
  | 'logging'
  | 'mining'
  | 'hunting'
  | 'fishing'
  | 'excavating'
  | 'cooking'
  | 'currency';

export interface Material {
  type: MaterialType;
  name: string;
  rarity: Rarity;
  chaosDungeonShards?: number;
  saleAmount?: number;
  category: MaterialCategory;
}
