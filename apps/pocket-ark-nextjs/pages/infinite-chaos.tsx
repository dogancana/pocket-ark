import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getPricingPropsSSR } from '@pocket-ark/ssr-utils';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { InfiniteChaosPage } from '../src/features/infinite-chaos';
import { FC } from '../src/utils/react';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <InfiniteChaosPage />
  </PricingProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const source = await getPricingPropsSSR(props);
  return { props: { source } };
};

export default Page;
