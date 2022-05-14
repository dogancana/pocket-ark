import { Currency, CurrencyType } from './models';

export const GoldCurrency: Currency = {
  type: CurrencyType.Gold,
  name: 'Gold',
};

export const SilverCurrency: Currency = {
  type: CurrencyType.Silver,
  name: 'Silver',
};

export const ShardOfPurificationCurrency: Currency = {
  type: CurrencyType.ShardOfPurification,
  name: 'Shard of Purification',
};
