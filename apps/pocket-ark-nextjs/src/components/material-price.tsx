import { CurrencyType, MaterialType } from '@pocket-ark/lost-ark-data';
import { debounce } from 'lodash';
import { ChangeEvent } from 'react';
import { CurrencyIcon } from '../ui/icons';
import { usePricingSource } from './material-pricing-provider';

export interface MaterialPriceProps {
  type: MaterialType;
  className?: string;
  onChange?: (value: number) => void;
}

export const MaterialPrice: React.FC<MaterialPriceProps> = ({
  type,
  className,
  onChange,
}) => {
  const { pricedMaterialsObject: materials, setMaterialPrice } =
    usePricingSource();
  const material = materials[type];
  const price = material?.price ?? 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const p = Math.max(parseInt(e.target.value, 10), 0);
    setMaterialPrice(type, p);
    if (onChange) onChange(p);
  };

  const handleChangeDebounced = debounce(handleChange, 500);

  return (
    <span className="flex relative">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <CurrencyIcon
          type={CurrencyType.Gold}
          overrides={{ width: 20, height: 20 }}
        />
      </div>

      <input
        id={`${type}-price`}
        className={`shadow appearance-none px-3 py-1 w-full rounded ${
          className ?? ''
        }`}
        type="number"
        onChange={(e) => handleChangeDebounced(e)}
        defaultValue={price}
      />
    </span>
  );
};
