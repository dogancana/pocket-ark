import { Rarity, Tier } from '../models';
import { SecretMap } from './models';
import { MaterialType } from '../materials';

export const secretMaps: SecretMap[] = [
  {
    tier: Tier.One,
    rarity: Rarity.Rare,
    rewards: [
      {
        type: MaterialType.HarmonyShardPouchSmall,
        amount: 1,
      },
      {
        type: MaterialType.StarsBreath,
        amount: 2,
      },
    ],
  },
  {
    tier: Tier.One,
    rarity: Rarity.Epic,
    rewards: [
      {
        type: MaterialType.HarmonyShardPouchMedium,
        amount: 1,
      },
      {
        type: MaterialType.StarsBreath,
        amount: 5,
      },
    ],
  },
  {
    tier: Tier.One,
    rarity: Rarity.Legendary,
    rewards: [
      {
        type: MaterialType.HarmonyShardPouchLarge,
        amount: 2,
      },
      {
        type: MaterialType.StarsBreath,
        amount: 10,
      },
    ],
  },
  {
    tier: Tier.Two,
    rarity: Rarity.Rare,
    rewards: [
      {
        type: MaterialType.LifeShardPouchSmall,
        amount: 1,
      },
      {
        type: MaterialType.MoonsBreath,
        amount: 5,
      },
    ],
  },
  {
    tier: Tier.Two,
    rarity: Rarity.Epic,
    rewards: [
      {
        type: MaterialType.LifeShardPouchMedium,
        amount: 1,
      },
      {
        type: MaterialType.MoonsBreath,
        amount: 10,
      },
    ],
  },
  {
    tier: Tier.Two,
    rarity: Rarity.Legendary,
    rewards: [
      {
        type: MaterialType.LifeShardPouchLarge,
        amount: 2,
      },
      {
        type: MaterialType.MoonsBreath,
        amount: 15,
      },
    ],
  },
  {
    tier: Tier.Three,
    rarity: Rarity.Rare,
    rewards: [
      {
        type: MaterialType.HonorShardPouchSmall,
        amount: 1,
      },
      {
        type: MaterialType.SolarGrace,
        amount: 1,
      },
    ],
  },
  {
    tier: Tier.Three,
    rarity: Rarity.Epic,
    rewards: [
      {
        type: MaterialType.HonorShardPouchMedium,
        amount: 1,
      },
      {
        type: MaterialType.SolarGrace,
        amount: 1,
      },
      {
        type: MaterialType.SolarBlessing,
        amount: 1,
      },
    ],
  },
  {
    tier: Tier.Three,
    rarity: Rarity.Legendary,
    rewards: [
      {
        type: MaterialType.HonorShardPouchLarge,
        amount: 2,
      },
      {
        type: MaterialType.SolarGrace,
        amount: 2,
      },
      {
        type: MaterialType.SolarBlessing,
        amount: 1,
      },
      {
        type: MaterialType.SolarProtection,
        amount: 1,
      },
    ],
  },
];
