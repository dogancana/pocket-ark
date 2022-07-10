import { MaterialType, Rarity } from '@pocket-ark/lost-ark-data';

export interface MariOffer {
  materialType: MaterialType;
  quantity: number;
  blueCrystalCost: number;
  rarity: Rarity;
}

export const mariOffers: MariOffer[] = [
  {
    materialType: MaterialType.GuardianStoneCrystal,
    quantity: 200,
    blueCrystalCost: 60,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.GuardianStoneCrystal,
    quantity: 800,
    blueCrystalCost: 240,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.GuardianStoneCrystal,
    quantity: 1000,
    blueCrystalCost: 270,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.DestructionStoneCrystal,
    quantity: 50,
    blueCrystalCost: 40,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.DestructionStoneCrystal,
    quantity: 300,
    blueCrystalCost: 240,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.DestructionStoneCrystal,
    quantity: 500,
    blueCrystalCost: 300,
    rarity: Rarity.Epic,
  },
  {
    materialType: MaterialType.HonorLeapstone,
    quantity: 5,
    blueCrystalCost: 10,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.HonorLeapstone,
    quantity: 10,
    blueCrystalCost: 20,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.HonorLeapstone,
    quantity: 20,
    blueCrystalCost: 40,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.GreatHonorLeapstone,
    quantity: 5,
    blueCrystalCost: 50,
    rarity: Rarity.Epic,
  },
  {
    materialType: MaterialType.SolarProtection,
    quantity: 3,
    blueCrystalCost: 150,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SolarProtection,
    quantity: 8,
    blueCrystalCost: 360,
    rarity: Rarity.Epic,
  },
  {
    materialType: MaterialType.SolarProtection,
    quantity: 25,
    blueCrystalCost: 750,
    rarity: Rarity.Common,
  },
  {
    materialType: MaterialType.HonorShardPouchSmall,
    quantity: 10,
    blueCrystalCost: 56,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.HonorShardPouchSmall,
    quantity: 20,
    blueCrystalCost: 112,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.HonorShardPouchLarge,
    quantity: 20,
    blueCrystalCost: 291,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SolarGrace,
    quantity: 20,
    blueCrystalCost: 80,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SolarGrace,
    quantity: 40,
    blueCrystalCost: 160,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SolarBlessing,
    quantity: 15,
    blueCrystalCost: 150,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SolarBlessing,
    quantity: 30,
    blueCrystalCost: 300,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SimpleOrehaFusionMaterial,
    quantity: 10,
    blueCrystalCost: 30,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.SimpleOrehaFusionMaterial,
    quantity: 20,
    blueCrystalCost: 54,
    rarity: Rarity.Rare,
  },
  {
    materialType: MaterialType.BasicOrehaFusionMaterial,
    quantity: 10,
    blueCrystalCost: 40,
    rarity: Rarity.Epic,
  },
  {
    materialType: MaterialType.BasicOrehaFusionMaterial,
    quantity: 20,
    blueCrystalCost: 72,
    rarity: Rarity.Epic,
  },
  {
    materialType: MaterialType.MetallurgyAppliedWelding,
    quantity: 2,
    blueCrystalCost: 280,
    rarity: Rarity.Legendary,
  },
  {
    materialType: MaterialType.TailoringAppliedMending,
    quantity: 4,
    blueCrystalCost: 260,
    rarity: Rarity.Legendary,
  },
];
