import { Container } from 'semantic-ui-react';
import { FC } from '../../utils';
import { CurrencyConverter } from './currency-converter';

export const CurrencyCalculatorPage: FC = () => {
  return (
    <Container className="mt-8 flex flex-col items-center text-center">
      <h1>Currency Calculator</h1>
      <p>You can convert currencies on this page</p>
      <div className="mt-8">
        <CurrencyConverter />
      </div>
    </Container>
  );
};
