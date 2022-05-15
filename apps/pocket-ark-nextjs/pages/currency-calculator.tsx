import { PricingSource } from '@pocket-ark/lost-ark-data';
import { PricingProvider } from '../src/components';
import { CurrencyCalculatorPage } from '../src/features/currency-calculator';
import { getPricingSource } from '../src/srr-utils';
import { FC } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <CurrencyCalculatorPage />
  </PricingProvider>
);

export const getServerSideProps = ({ req, res }) => {
  const source = getPricingSource(req, res);
  return { props: { source } };
};

export default Page;
