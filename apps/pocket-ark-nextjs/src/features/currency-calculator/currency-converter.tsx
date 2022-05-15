import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { useState } from 'react';
import { usePricingSource } from '../../components';
import { Currency, CurrencyInput } from '../../ui';
import { FC } from '../../utils';

interface State {
  values: { [key in CurrencyType]: number };
}

const Plus = () => <span className="w-12 text-center">+</span>;
const OR = () => <span className="w-12 text-center">or</span>;

const Box: FC = ({ children }) => (
  <span className="w-full border shadow-lg p-3">{children}</span>
);

const fixedDigits = {
  [CurrencyType.Gold]: 0,
  [CurrencyType.Silver]: 0,
  [CurrencyType.RoyalCrystal]: 0,
  [CurrencyType.Crystal]: 0,
  [CurrencyType.RealMoney]: 2,
};

export const CurrencyConverter: FC = () => {
  const { rates } = usePricingSource();
  const [state, setState] = useState<State>({
    values: {
      [CurrencyType.Crystal]: 0,
      [CurrencyType.RoyalCrystal]: 0,
      [CurrencyType.RealMoney]: 0,
      [CurrencyType.Silver]: 0,
      [CurrencyType.Gold]: 0,
    },
  });

  const setCurrencyCount = (currency: CurrencyType, count: number) => {
    setState({
      values: { ...state.values, [currency]: count },
    });
  };

  const editableCurrencies = [
    CurrencyType.RealMoney,
    CurrencyType.Crystal,
    CurrencyType.RoyalCrystal,
    CurrencyType.Gold,
  ];

  const totalInGold = Object.entries(state.values).reduce(
    (acc, [currency, count]) => {
      const value = rates[currency] * count;
      return acc + value;
    },
    0
  );

  return (
    <>
      <h3 className="font-bold mb-2">Currency Converter</h3>
      <div className="flex items-center w-full">
        {editableCurrencies.map((currency, i) => (
          <div key={currency} className="grow flex items-center">
            <Box>
              <CurrencyInput
                iconType={currency}
                type="number"
                id={`${currency}-amount`}
                defaultValue={0}
                placeholder="0"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setCurrencyCount(currency, Number.isNaN(value) ? 0 : value);
                }}
              />
            </Box>
            {i < editableCurrencies.length - 1 && <Plus />}
          </div>
        ))}
      </div>
      <p className="w-full text-center my-3">equals to</p>
      <div className="flex items-center w-full">
        {editableCurrencies.map((currency, i) => (
          <div key={currency} className="grow flex items-center">
            <Box>
              <Currency
                key={currency}
                type={currency}
                value={(totalInGold / rates[currency]).toFixed(
                  fixedDigits[currency]
                )}
              />
            </Box>
            {i < editableCurrencies.length - 1 && <OR />}
          </div>
        ))}
      </div>
    </>
  );
};
