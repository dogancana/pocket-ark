import { Rarity } from '../models';

export enum MaterialType {
  HonorLeapstone = 'HonorLeapstone',
  GreatHonorLeapstone = 'GreatHonorLeapstone',
  HarmonyShardPouchSmall = 'HarmonyShardPouchSmall',
  HarmonyShardPouchMedium = 'HarmonyShardPouchMedium',
  HarmonyShardPouchLarge = 'HarmonyShardPouchLarge',
  LifeShardPouchSmall = 'LifeShardPouchSmall',
  LifeShardPouchMedium = 'LifeShardPouchMedium',
  LifeShardPouchLarge = 'LifeShardPouchLarge',
  HonorShardPouchSmall = 'HonorShardPouchSmall',
  HonorShardPouchMedium = 'HonorShardPouchMedium',
  HonorShardPouchLarge = 'HonorShardPouchLarge',
  SolarGrace = 'SolarGrace',
  SolarBlessing = 'SolarBlessing',
  SolarProtection = 'SolarProtection',
  StarsBreath = 'StarsBreath',
  MoonsBreath = 'MoonsBreath',
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
  TailoringBasicMending = 'TailoringBasicMending',
  TailoringAppliedMending = 'TailoringAppliedMending',
  MetallurgyBasicWelding = 'MetallurgyBasicWelding',
  MetallurgyAppliedWelding = 'MetallurgyAppliedWelding',
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
  | 'excavating';

export interface Material {
  type: MaterialType;
  name: string;
  rarity: Rarity;
  chaosDungeonShards?: number;
  saleAmount?: number;
  category: MaterialCategory;
}
