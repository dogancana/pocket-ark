import { FC } from '../../utils';
import { CurrencyConverter } from './currency-converter';

export const CurrencyCalculatorPage: FC = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <p>You can convert currencies on this page</p>
      <div className="mt-8">
        <CurrencyConverter />
      </div>
    </div>
  );
};
