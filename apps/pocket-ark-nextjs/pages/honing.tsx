import { LOAMarketCategory } from '@pocket-ark/loa-market-api';
import { GetServerSideProps } from 'next';
import {
  MaterialsProvider,
  MaterialsProviderProps,
} from '../src/components/materials-provider';
import { HoningPlannerPage } from '../src/features/honing';
import { FC } from '../src/utils/react';
import { getMarketPrices } from '../src/utils/ssr';

const Page: FC<MaterialsProviderProps> = (props) => (
  <MaterialsProvider {...props}>
    <HoningPlannerPage />
  </MaterialsProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const categories = [LOAMarketCategory.EnhancementMaterial];
  const materials = await getMarketPrices(categories, props);
  return { props: { materials, categories } };
};

export default Page;
