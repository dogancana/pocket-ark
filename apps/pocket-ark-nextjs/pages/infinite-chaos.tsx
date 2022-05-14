import { PricingSource } from '@pocket-ark/lost-ark-data';
import { PricingProvider } from '../src/components';
import { InfiniteChaosPage } from '../src/features/infinite-chaos';
import { getPricingSource } from '../src/srr-utils';

interface Props {
  source: PricingSource;
}

const Page: React.FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <InfiniteChaosPage />
  </PricingProvider>
);

export const getServerSideProps = ({ req, res }) => {
  const source = getPricingSource(req, res);
  return { props: { source } };
};

export default Page;
