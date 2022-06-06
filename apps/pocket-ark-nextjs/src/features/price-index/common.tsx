import {
  CurrencyType,
  MaterialCategory,
  MaterialType
} from '@pocket-ark/lost-ark-data';
import { ReactNode } from 'react';
import { MaterialValues } from '../../components';
import { FC } from '../../utils';

export const PriceItem: FC = ({ children }) => (
  <div className=" border-2 rounded-md m-1 flex flex-col relative z-0">
    {children}
  </div>
);

export const ItemFooter: FC = ({ children }) => (
  <div className="flex bg-stone-200 h-6">{children}</div>
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

export function readableCategory(category: MaterialCategory) {
  switch (category) {
    case 'honingMaterials':
      return 'Honing Materials';
    case 'additionalHoningMaterials':
      return 'Additional Honing Materials';
    case 'otherMaterials':
      return 'Other Materials';
    case 'recoveryBattleItem':
      return 'Recovery Battle Item';
    case 'offenseBattleItem':
      return 'Offense Battle Item';
    case 'utilityBattleItem':
      return 'Utility Battle Item';
    case 'buffBattleItem':
      return 'Buff Battle Item';
    case 'cooking':
      return 'Cooking';
    case 'foraging':
      return 'Foraging';
    case 'logging':
      return 'Logging';
    case 'mining':
      return 'Mining';
    case 'hunting':
      return 'Hunting';
    case 'fishing':
      return 'Fishing';
    case 'excavating':
      return 'Excavating';
  }
}
