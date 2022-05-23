import { setPricingSourceToCookies } from '@pocket-ark/fe-utils';
import {
  CurrencyConversionSource,
  getBaseCurrencyConversionRates,
  getPricedMaterials,
  isSourceComplete,
  materials,
  MaterialType,
  PricedMaterial,
  PricingSource,
} from '@pocket-ark/lost-ark-data';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { putPricingSource } from '../services';
import { Alert } from '../ui';
import { FC } from '../utils';

export interface PricingProviderProps {
  source: PricingSource;
}

export interface MaterialPricngProviderContext {
  source: PricingSource;
  setSource: Dispatch<SetStateAction<PricingSource>>;
  showShareModal: boolean;
  setShowShareModal: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<MaterialPricngProviderContext>({
  source: {},
  showShareModal: false,
  setSource: () => null,
  setShowShareModal: () => null,
});

export const PricingProvider: FC<PricingProviderProps> = ({
  children,
  source: sourceProp,
}) => {
  const [source, setSource] = useState(sourceProp);
  const [showShareModal, setShowShareModal] = useState(false);
  const { pathname } = useRouter();

  const hasMissingMaterialPrices = !materials.every(
    (m) => !!source[m.type]?.price
  );
  const isOnPriceIndex = pathname === '/price-index';

  return (
    <>
      <Context.Provider
        value={{ source, showShareModal, setShowShareModal, setSource }}
      >
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
    </>
  );
};

export function usePricingSource() {
  const { source, showShareModal, setSource, setShowShareModal } =
    useContext(Context);

  const pricedMaterialsArray = getPricedMaterials(source);
  const isComplete = isSourceComplete(source);
  const pricedMaterialsObject = pricedMaterialsArray.reduce(
    (prev, curr) => ({ ...prev, [curr.type]: curr }),
    {} as { [key in MaterialType]: PricedMaterial }
  );

  const updateSource = debounce(async (s: PricingSource) => {
    setPricingSourceToCookies(s);
    const m = await putPricingSource();
    setSource((s) => ({ ...s, meta: m }));
  }, 1000);

  const setMaterialPrice = async (type: MaterialType, price: number) => {
    const newSource = {
      ...source,
      [type]: {
        ...source[type],
        price,
      },
    };
    updateSource(newSource);
  };

  const setCurrencyConversionSource = async (s: CurrencyConversionSource) => {
    const newSource = { ...source, ...s };
    updateSource(newSource);
  };

  const addMaterials = (arr: { type: MaterialType; amount?: number }[]) => {
    return arr.reduce((prev, curr) => {
      if (prev === undefined) return undefined;

      const m = pricedMaterialsObject[curr.type];
      const salePrice = m?.price;
      if (!salePrice) return undefined;

      const unitPrice = salePrice / (m?.saleAmount || 1);
      return prev + unitPrice * (curr.amount || 1);
    }, 0);
  };

  return {
    source,
    isSourceComplete: isComplete,
    pricedMaterialsArray,
    pricedMaterialsObject,
    rates: getBaseCurrencyConversionRates(source),
    showShareModal,
    setShowShareModal,
    setSource,
    addMaterials,
    setMaterialPrice,
    setCurrencyConversionSource,
  };
}
