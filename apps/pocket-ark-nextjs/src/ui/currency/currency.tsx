import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { CurrencyIcon } from '../icons';
import { FC } from '../../utils';

interface CurrencyProps {
  type: CurrencyType | CurrencyItemType;
  value: number | string;
  className?: string;
  size?: number;
}

export const Currency: FC<CurrencyProps> = ({
  type,
  value,
  className,
  size,
}) => {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <CurrencyIcon
        type={type}
        overrides={{
          width: size || 25,
          height: size || 25,
          className: 'inline-flex',
        }}
      />
      <span className="ml-1 inline-block ">
        {value}
      </span>
    </div>
  );
};
