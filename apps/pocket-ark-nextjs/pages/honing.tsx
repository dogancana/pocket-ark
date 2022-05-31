import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getPricingPropsSSR } from '@pocket-ark/ssr-utils';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { HoningPlannerPage } from '../src/features/honing';
import { FC } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <HoningPlannerPage />
  </PricingProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const source = await getPricingPropsSSR(props);
  console.log('Using source', source?.meta);
  return { props: { source } };
};

export default Page;
