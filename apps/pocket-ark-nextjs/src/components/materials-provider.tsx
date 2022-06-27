import { LOAMarketCategory } from '@pocket-ark/loa-market-api';
import { getConversionRates, MaterialType } from '@pocket-ark/lost-ark-data';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { MaterialsObject } from '../utils/materials';
import { FC } from '../utils/react';
import { getMarketPrices } from '../utils/ssr';

export interface MaterialsProviderProps {
  materials: MaterialsObject;
  categories: LOAMarketCategory[];
}

export interface MaterialsProviderContext extends MaterialsProviderProps {
  setMaterials: Dispatch<SetStateAction<MaterialsObject>>;
}

const context = createContext<MaterialsProviderContext>({} as any);

export const MaterialsProvider: FC<MaterialsProviderProps> = ({
  materials: materialsProp,
  categories,
  children,
}) => {
  const [materials, setMaterials] = useState<MaterialsObject>(materialsProp);
  return (
    <context.Provider value={{ materials, categories, setMaterials }}>
      {children}
    </context.Provider>
  );
};

export function useMaterials() {
  const { materials, categories, setMaterials } = useContext(context);

  const addMaterials = (arr: { type: MaterialType; amount?: number }[]) => {
    return arr.reduce((prev, curr) => {
      if (prev === undefined) return undefined;

      const m = materials[curr.type];
      const salePrice = m?.lowPrice;
      if (!salePrice) return undefined;

      const unitPrice = salePrice / (m?.amount || 1);
      return prev + unitPrice * (curr.amount || 1);
    }, 0);
  };

  const refetchMaterials = async () => {
    try {
      const m = await getMarketPrices(categories);
      setMaterials(m);
    } catch (e) {
      window.location.reload();
    }
  };

  return {
    materials,
    rates: getConversionRates(
      materials?.BlueCrystal?.lowPrice,
      materials?.RoyalCrystal?.lowPrice
    ),
    refetchMaterials,
    addMaterials,
  };
}
