export interface Currency {
  type: CurrencyType;
  name: string;
}

export enum CurrencyType {
  Gold = 'Gold',
  Silver = 'Silver',
  ShardOfPurification = 'ShardOfPurification',
}
