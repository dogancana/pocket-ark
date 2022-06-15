import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { Input, InputProps } from 'semantic-ui-react';
import { CurrencyIcon } from '../icons';
import { FC } from '../../utils/react';

export interface CurrencyInputProps extends InputProps {
  iconType: CurrencyType | CurrencyItemType;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  iconType,
  ...rest
}) => {
  return (
    <Input
      type="number"
      icon={
        <i className="icon p-2">
          <CurrencyIcon
            type={iconType}
            overrides={{ layout: 'responsive', width: 40, height: 40 }}
          />
        </i>
      }
      iconPosition="left"
      {...rest}
    />
  );
};
