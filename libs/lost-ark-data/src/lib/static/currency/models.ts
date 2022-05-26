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
  Pheon = 'Pheon',
}

export enum CurrencyItemType {
  PerceptionShard = 'PerceptionShard', // T1 Chaos
  GuardianShard = 'GuardianShard', // T2 Chaos
  ShardOfPurification = 'ShardOfPurification', // T3 Chaos/
  HarmonyShard = 'HarmonyShard',
  LifeShard = 'LifeShard',
  HonorShard = 'HonorShard',
}
