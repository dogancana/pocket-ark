import {
  CurrencyConversionSource,
  getBaseCurrencyConversionRates,
  getPricedMaterials,
  materials,
  MaterialType,
  PricedMaterial,
  PricingSource,
} from '@pocket-ark/lost-ark-data';
import { setCookies } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import { COOKIES } from '../constants/cookies';
import { Alert } from '../ui';

export interface PricingProviderProps {
  source: PricingSource;
}

export interface MaterialPricngProviderContext {
  source: PricingSource;
  setSource: (source: PricingSource) => void;
}

const Context = createContext<MaterialPricngProviderContext>({
  source: {},
  setSource: () => null,
});

export const PricingProvider: React.FC<PricingProviderProps> = ({
  children,
  source: sourceProp,
}) => {
  const [source, setSource] = useState(sourceProp);
  const { pathname } = useRouter();

  // +3 for the currency conversion stuff
  const hasMissingMaterialPrices =
    materials.length + 3 > Object.keys(sourceProp ?? {}).length;
  const isOnPriceIndex = pathname === '/price-index';

  return (
    <Context.Provider value={{ source, setSource }}>
      {hasMissingMaterialPrices && !isOnPriceIndex && (
        <Alert>
          <p className="font-bold">You have missing material prices</p>
          <p className="text-sm">
            You can edit prices of your server from{' '}
            <Link href="/price-index" passHref>
              <span className="font-bold cursor-pointer">this link</span>
            </Link>
          </p>
        </Alert>
      )}
      {children}
    </Context.Provider>
  );
};

export function usePricingSource() {
  const { source, setSource } = useContext(Context);
  const materials = getPricedMaterials(source);
  const pricedMaterialsObject = materials.reduce(
    (prev, curr) => ({ ...prev, [curr.type]: curr }),
    {} as { [key in MaterialType]: PricedMaterial }
  );

  const setMaterialPrice = (type: MaterialType, price: number) => {
    const newSource = {
      ...source,
      [type]: {
        ...source[type],
        price,
      },
    };
    setSource(newSource);
    setCookies(COOKIES.pricingSourceJSON, newSource);
  };

  const setCurrencyConversionSource = (s: CurrencyConversionSource) => {
    const newSource = { ...source, ...s };
    setSource(newSource);
    setCookies(COOKIES.pricingSourceJSON, newSource);
  };

  const addRecipeMaterials = (
    arr: { type: MaterialType; amount?: number }[]
  ) => {
    return arr.reduce((prev, curr) => {
      if (prev === undefined) return undefined;

      const m = pricedMaterialsObject[curr.type];
      const salePrice = m?.price;
      if (!salePrice) return undefined;

      const unitPrice = salePrice / (m?.saleAmount ?? 1);
      return prev + unitPrice * (curr.amount ?? 1);
    }, 0);
  };

  return {
    source,
    pricedMaterialsArray: materials,
    pricedMaterialsObject,
    rates: getBaseCurrencyConversionRates(source),
    addRecipeMaterials,
    setMaterialPrice,
    setCurrencyConversionSource,
  };
}
