import { LOAMarketCategory } from '@pocket-ark/loa-market-api';
import { GetServerSideProps } from 'next';
import { MaterialsProvider } from '../src/components';
import { MaterialsProviderProps } from '../src/components/materials-provider';
import { InfiniteChaosPage } from '../src/features/infinite-chaos';
import { FC } from '../src/utils/react';
import { getMarketPrices } from '../src/utils/ssr';

const Page: FC<MaterialsProviderProps> = (props) => (
  <MaterialsProvider {...props}>
    <InfiniteChaosPage />
  </MaterialsProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const categories = [LOAMarketCategory.EnhancementMaterial];
  const materials = await getMarketPrices(categories, props);
  return { props: { materials, categories } };
};

export default Page;
