import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getPricingSourceFromCookies } from '@pocket-ark/ssr-utils';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { SecretMapsPage } from '../src/features/secret-maps';
import { FC } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <SecretMapsPage />
  </PricingProvider>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const source = getPricingSourceFromCookies(req, res);
  return { props: { source } };
};

export default Page;
