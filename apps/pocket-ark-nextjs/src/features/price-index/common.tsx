import { CurrencyType, MaterialType } from '@pocket-ark/lost-ark-data';
import { ReactNode } from 'react';
import { Card } from 'semantic-ui-react';
import { MaterialValues } from '../../components';
import { FC } from '../../utils';

export const PriceItem: FC = ({ children }) => (
  <Card>
    <Card.Content style={{ padding: 0 }} className="flex flex-col">
      {children}
    </Card.Content>
  </Card>
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

export const PriceSection: FC<PriceSectionProps> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={`mt-4 w-full ${className || ''}`}>
      <h3 className="ml-2 font-bold text-center">{title}</h3>
      <Card.Group className="flex flex-wrap" stackable centered>
        {children}
      </Card.Group>
    </div>
  );
};

export const PriceTitle: FC<{ name: string; amount?: number }> = ({
  name,
  amount,
}) => (
  <span className="flex">
    {name}
    {amount && <span className="ml-2 font-thin"> (x{amount})</span>}
  </span>
);
