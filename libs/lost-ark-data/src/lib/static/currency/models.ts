export interface Currency {
  type: CurrencyType;
  name: string;
}

export enum CurrencyType {
  RealMoney = 'RealMoney',
  RoyalCrystal = 'RoyalCrystal',
  Crystal = 'Crystal',
  Silver = 'Silver',
  Gold = 'Gold',
}

export enum CurrencyItemType {
  PerceptionShard = 'PerceptionShard', // T1 Chaos
  GuardianShard = 'GuardianShard', // T2 Chaos
  ShardOfPurification = 'ShardOfPurification', // T3 Chaos/
  Pheon = 'Pheon',
  HarmonyShard = 'HarmonyShard',
  LifeShard = 'LifeShard',
  HonorShard = 'HonorShard',
}
