import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { CurrencyIcon } from '../ui/icons';
import { FC } from '../utils';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface CurrencyInputProps extends InputProps {
  iconType: CurrencyType | CurrencyItemType;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  iconType,
  ...rest
}) => {
  return (
    <span className="flex relative">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <CurrencyIcon type={iconType} overrides={{ width: 20, height: 20 }} />
      </div>

      <input
        className={`shadow appearance-none px-3 py-1 pl-8 w-full rounded ${
          rest.className || ''
        }`}
        type="number"
        {...rest}
      />
    </span>
  );
};
