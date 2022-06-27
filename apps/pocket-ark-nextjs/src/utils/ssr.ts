import {
  getMaterials,
  LOAMarketCategory,
  LOAMarketRegion,
} from '@pocket-ark/loa-market-api';
import { COOKIES, MaterialType } from '@pocket-ark/lost-ark-data';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { mapLOAMMaterial, PricedMaterial } from './materials';

export const getMarketPrices = async (
  categories: LOAMarketCategory[],
  props?: GetServerSidePropsContext
) => {
  try {
    const region =
      (getCookie(COOKIES.region, props) as LOAMarketRegion | undefined) ||
      LOAMarketRegion.NAE;
    const mats = await getMaterials(region, { categories });
    const materials = mats.map(mapLOAMMaterial);
    return materials.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.type]: curr,
      }),
      {} as { [key in MaterialType]: PricedMaterial }
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};
