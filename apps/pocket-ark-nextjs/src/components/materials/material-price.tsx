import { CurrencyType, MaterialType } from '@pocket-ark/lost-ark-data';
import { debounce } from 'lodash';
import { ChangeEvent } from 'react';
import { CurrencyInput } from '../../ui';
import { FC } from '../../utils';
import { usePricingSource } from '../material-pricing-provider';

export interface MaterialPriceProps {
  type: MaterialType;
  className?: string;
  fluid?: boolean;
  onChange?: (value: number) => void;
}

export const MaterialPrice: FC<MaterialPriceProps> = ({
  type,
  className,
  fluid,
  onChange,
}) => {
  const { pricedMaterialsObject: materials, setMaterialPrice } =
    usePricingSource();
  const material = materials[type];
  const price = material?.price || 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const p = Math.max(parseInt(e.target.value, 10), 0);
    setMaterialPrice(type, p);
    if (onChange) onChange(p);
  };

  const handleChangeDebounced = debounce(handleChange, 500);

  return (
    <CurrencyInput
      key={`Material_${type}`}
      id={`${type}-price`}
      iconType={CurrencyType.Gold}
      type="number"
      onChange={(e) => handleChangeDebounced(e)}
      defaultValue={price}
      fluid={fluid}
      className={className}
    />
  );
};