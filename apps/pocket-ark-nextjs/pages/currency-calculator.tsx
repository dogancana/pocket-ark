import { PricingSource } from '@pocket-ark/lost-ark-data';
import { PricingProvider } from '../src/components';
import { CurrencyCalculatorPage } from '../src/features/currency-calculator';
import { FC } from '../src/utils';
import { GetServerSideProps } from 'next';
import { getPricingSourceFromCookies } from '@pocket-ark/ssr-utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <CurrencyCalculatorPage />
  </PricingProvider>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const source = getPricingSourceFromCookies(req, res);
  return { props: { source } };
};

export default Page;
