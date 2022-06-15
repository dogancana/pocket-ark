import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getPricingPropsSSR } from '@pocket-ark/ssr-utils';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { PriceIndexPage } from '../src/features/price-index';
import { FC } from '../src/utils/react';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => {
  return (
    <PricingProvider source={source || {}}>
      <PriceIndexPage />
    </PricingProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (props) => {
  const source = await getPricingPropsSSR(props);
  return { props: { source } };
};

export default Page;
