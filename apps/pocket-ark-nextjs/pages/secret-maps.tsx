import { LOAMarketCategory } from '@pocket-ark/loa-market-api';
import { GetServerSideProps } from 'next';
import { MaterialsProvider } from '../src/components';
import { MaterialsProviderProps } from '../src/components/materials-provider';
import { SecretMapsPage } from '../src/features/secret-maps';
import { FC } from '../src/utils/react';
import { getMarketPrices } from '../src/utils/ssr';

const Page: FC<MaterialsProviderProps> = ({ categories, materials }) => (
  <MaterialsProvider {...{ categories, materials }}>
    <SecretMapsPage />
  </MaterialsProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const categories = [
    LOAMarketCategory.CurrencyExchange,
    LOAMarketCategory.EnhancementMaterial,
  ];
  const materials = await getMarketPrices(categories, props);
  return { props: { materials, categories } };
};

export default Page;
