import { Currency, CurrencyItemType, CurrencyType } from './models';

export const currencies: Currency[] = [
  {
    type: CurrencyType.RealMoney,
    name: 'RealMoney',
  },
  {
    type: CurrencyType.RoyalCrystal,
    name: 'RoyalCrystal',
  },
  {
    type: CurrencyType.Crystal,
    name: 'Blue Crystal',
  },
  {
    type: CurrencyType.Silver,
    name: 'Silver',
  },
  {
    type: CurrencyType.Gold,
    name: 'Gold',
  },
];

export const currencyItems = [
  {
    type: CurrencyItemType.PerceptionShard,
    name: 'Perception Shard',
  },
  {
    type: CurrencyItemType.GuardianShard,
    name: 'Guardian Shard',
  },
  {
    type: CurrencyItemType.ShardOfPurification,
    name: 'Shard of Purification',
  },
  {
    type: CurrencyItemType.Pheon,
    name: 'Pheon',
  },
  {
    type: CurrencyItemType.HarmonyShard,
    name: 'Harmony Shard',
  },
  {
    type: CurrencyItemType.LifeShard,
    name: 'Life Shard',
  },
  {
    type: CurrencyItemType.HonorShard,
    name: 'Honor Shard',
  },
];
