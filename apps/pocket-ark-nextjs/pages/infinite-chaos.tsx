import { PricingSource } from '@pocket-ark/lost-ark-data';
import { PricingProvider } from '../src/components';
import { InfiniteChaosPage } from '../src/features/infinite-chaos';
import { getPricingSource } from '../src/srr-utils';
import { FC } from '../src/utils';
import { GetServerSideProps } from 'next';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <InfiniteChaosPage />
  </PricingProvider>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const source = getPricingSource(req, res);
  return { props: { source } };
};

export default Page;
