import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { useState, Fragment } from 'react';
import { usePricingSource } from '../../components';
import { Currency, CurrencyInput } from '../../ui';
import { FC } from '../../utils';

interface State {
  values: { [key in CurrencyType]: number };
}

const Operator: FC = ({ children }) => (
  <div className="grow text-center">{children}</div>
);

const Box: FC = ({ children }) => (
  <div className="border shadow-lg p-3 w-full h-16 flex items-center">
    {children}
  </div>
);

const editableCurrencies = [
  CurrencyType.RealMoney,
  CurrencyType.Crystal,
  CurrencyType.RoyalCrystal,
  CurrencyType.Gold,
  CurrencyType.Pheon,
];

interface CurrencyConverterProps {
  className?: string;
}

export const CurrencyConverter: FC<CurrencyConverterProps> = ({
  className,
}) => {
  const { rates } = usePricingSource();
  const [state, setState] = useState<State>({
    values: {
      [CurrencyType.Crystal]: 0,
      [CurrencyType.RoyalCrystal]: 0,
      [CurrencyType.RealMoney]: 0,
      [CurrencyType.Silver]: 0,
      [CurrencyType.Gold]: 0,
      [CurrencyType.Pheon]: 0,
    },
  });

  const setCurrencyCount = (currency: CurrencyType, count: number) => {
    setState({ values: { ...state.values, [currency]: count } });
  };

  const totalInGold = Object.entries(state.values).reduce(
    (acc, [currency, count]) => {
      const value = rates[currency] * count;
      return acc + value;
    },
    0
  );

  return (
    <div className={`flex justify-center ${className || ''}`}>
      <div className="flex flex-col w-2/5">
        {editableCurrencies.map((currency, i) => (
          <Fragment key={currency}>
            <Box>
              <CurrencyInput
                iconType={currency}
                type="number"
                id={`${currency}-amount`}
                defaultValue={0}
                placeholder="0"
                fluid
                className="h-full grow"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setCurrencyCount(currency, Number.isNaN(value) ? 0 : value);
                }}
              />
            </Box>
            <Operator>{i < editableCurrencies.length - 1 && '+'}</Operator>
          </Fragment>
        ))}
      </div>
      <p className="text-center p-3 text-4xl flex items-center">=</p>
      <div className="flex flex-col items-center w-2/5">
        {editableCurrencies.map((currency, i) => (
          <Fragment key={currency}>
            <Box>
              <Currency
                key={currency}
                type={currency}
                value={totalInGold / rates[currency]}
              />
            </Box>
            <Operator>{i < editableCurrencies.length - 1 && 'or'}</Operator>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
