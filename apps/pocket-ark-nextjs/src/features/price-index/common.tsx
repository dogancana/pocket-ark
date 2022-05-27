import { CurrencyType, MaterialType } from '@pocket-ark/lost-ark-data';
import { ReactNode } from 'react';
import { MaterialValues } from '../../components';
import { FC } from '../../utils';

export const PriceItem: FC = ({ children }) => (
  <div className="bg-stone-50 border-2 rounded-md m-1 flex flex-col">
    {children}
  </div>
);

export const ItemFooter: FC = ({ children }) => (
  <div className="flex border-t-2 mt-2 bg-stone-200 h-6">{children}</div>
);

export const MaterialValuesLine: FC<{ type: MaterialType }> = ({ type }) => (
  <MaterialValues
    type={type}
    showCurrencies={[
      CurrencyType.Crystal,
      CurrencyType.RoyalCrystal,
      CurrencyType.RealMoney,
    ]}
    itemClassName="mr-6"
  />
);

export interface PriceSectionProps {
  title: string | ReactNode;
  className?: string;
}

export const PriceTitle: FC<{ name: string; amount?: number }> = ({
  name,
  amount,
}) => (
  <span className="flex">
    {name}
    {amount && <span className="ml-2 font-thin"> (x{amount})</span>}
  </span>
);
