import { LOAMarketCategory } from '@pocket-ark/loa-market-api';
import { GetServerSideProps } from 'next';
import { MaterialsProvider, MaterialsProviderProps } from '../src/components';
import { CurrencyCalculatorPage } from '../src/features/currency-calculator';
import { FC } from '../src/utils/react';
import { getMarketPrices } from '../src/utils/ssr';

const Page: FC<MaterialsProviderProps> = (props) => (
  <MaterialsProvider {...props}>
    <CurrencyCalculatorPage />
  </MaterialsProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const categories = [
    LOAMarketCategory.CurrencyExchange,
    LOAMarketCategory.EnhancementMaterial,
    LOAMarketCategory.Cooking,
    LOAMarketCategory.CombatSupplies,
    LOAMarketCategory.Trader,
  ];
  const materials = await getMarketPrices(categories, props);
  return { props: { materials, categories } };
};

export default Page;
