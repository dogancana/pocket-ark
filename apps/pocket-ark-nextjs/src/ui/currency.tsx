import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { CurrencyIcon } from './icons';

interface CurrencyProps {
  type: CurrencyType;
  value: number | string;
  className?: string;
}

export const Currency: React.FC<CurrencyProps> = ({
  type,
  value,
  className,
}) => {
  return (
    <span className={`flex items-center ${className ? className : ''}`}>
      <CurrencyIcon type={type} overrides={{ width: 25, height: 25 }} />
      <span className="ml-1">{value}</span>
    </span>
  );
};
