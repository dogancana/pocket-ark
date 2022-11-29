import { LOAMarketCategory } from '@pocket-ark/loa-market-api';
import { GetServerSideProps } from 'next';
import { MaterialsProvider } from '../src/components';
import { MaterialsProviderProps } from '../src/components/materials-provider';
import { StrongholdCraftingPage, StrongholdCraftingFiltersProvider } from '../src/features/stronghold-crafting';
import { FC } from '../src/utils/react';
import { getMarketPrices } from '../src/utils/ssr';

const Page: FC<MaterialsProviderProps> = (props) => (
  <MaterialsProvider {...props}>
    <StrongholdCraftingFiltersProvider>
      <StrongholdCraftingPage />
    </StrongholdCraftingFiltersProvider>
  </MaterialsProvider>
);

export const getServerSideProps: GetServerSideProps = async (props) => {
  const categories = [
    LOAMarketCategory.CombatSupplies,
    LOAMarketCategory.EnhancementMaterial,
    LOAMarketCategory.Trader,
    LOAMarketCategory.Cooking,
  ];
  const materials = await getMarketPrices(categories, props);
  return { props: { materials, categories } };
};

export default Page;
