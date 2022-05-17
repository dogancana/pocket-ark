import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getPricingSource } from '@pocket-ark/ssr-utils';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { StrongholdCraftingPage } from '../src/features/stronghold-crafting';
import { FC } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => (
  <PricingProvider source={source}>
    <StrongholdCraftingPage />
  </PricingProvider>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const source = getPricingSource(req, res);
  return { props: { source } };
};

export default Page;
