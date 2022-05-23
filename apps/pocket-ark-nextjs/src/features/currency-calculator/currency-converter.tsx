import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { Fragment, useState } from 'react';
import { usePricingSource } from '../../components';
import { Currency, CurrencyInput } from '../../ui';
import { FC } from '../../utils';

interface State {
  values: { [key in CurrencyType]: number };
}

const Plus: FC = () => <div className="w-8 shrink-0 text-center">+</div>;
const OR: FC = () => <span className="w-8 shrink-0 text-center">or</span>;

const Box: FC = ({ children }) => (
  <div className="grow border shadow-lg p-3 w-80">{children}</div>
);

const GridContainer: FC = ({ children }) => (
  <div className="w-full flex items-center justify-center">{children}</div>
);

const fixedDigits = {
  [CurrencyType.Gold]: 0,
  [CurrencyType.Silver]: 0,
  [CurrencyType.RoyalCrystal]: 0,
  [CurrencyType.Crystal]: 0,
  [CurrencyType.RealMoney]: 2,
};

const editableCurrencies = [
  CurrencyType.RealMoney,
  CurrencyType.Crystal,
  CurrencyType.RoyalCrystal,
  CurrencyType.Gold,
];

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
    <>
      <GridContainer>
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
                className="w-full"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setCurrencyCount(currency, Number.isNaN(value) ? 0 : value);
                }}
              />
            </Box>
            {i < editableCurrencies.length - 1 && <Plus />}
          </Fragment>
        ))}
      </GridContainer>
      <p className="w-full text-center my-3">equals to</p>
      <GridContainer>
        {editableCurrencies.map((currency, i) => (
          <Fragment key={currency}>
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
          </Fragment>
        ))}
      </GridContainer>
    </>
  );
};
