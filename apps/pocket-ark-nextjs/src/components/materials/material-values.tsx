import { CurrencyType, MaterialType } from '@pocket-ark/lost-ark-data';
import { Currency } from '../../ui';
import { usePricingSource } from '../material-pricing-provider';
import { FC } from '../../utils';

export interface MaterialValueLineProps {
  type: MaterialType;
  showCurrencies: CurrencyType[];
  itemClassName?: string;
}

export const MaterialValues: FC<MaterialValueLineProps> = ({
  type,
  showCurrencies,
  itemClassName,
}) => {
  const { pricedMaterialsObject } = usePricingSource();
  const material = pricedMaterialsObject[type];

  if (!material) return null;

  return (
    <>
      {showCurrencies.map((currency) => (
        <Currency
          key={currency}
          type={currency}
          value={material.values[currency] || '?'}
          size={20}
          className={itemClassName}
        />
      ))}
    </>
  );
};
