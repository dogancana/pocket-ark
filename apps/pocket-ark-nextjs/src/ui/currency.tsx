import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { CurrencyIcon } from './icons';

interface CurrencyProps {
  type: CurrencyType | CurrencyItemType;
  value: number | string;
  className?: string;
  size?: number;
}

export const Currency: React.FC<CurrencyProps> = ({
  type,
  value,
  className,
  size,
}) => {
  return (
    <span className={`flex items-center ${className ? className : ''}`}>
      <CurrencyIcon
        type={type}
        overrides={{ width: size ?? 25, height: size ?? 25 }}
      />
      <span className="ml-1">{value}</span>
    </span>
  );
};
