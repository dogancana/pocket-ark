import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { isNumber } from 'lodash';
import { FC } from '../../utils/react';
import { CurrencyIcon } from '../icons';

interface CurrencyProps {
  type: CurrencyType | CurrencyItemType;
  value: number;
  className?: string;
  size?: number;
  arround?: boolean;
  fragments?: number;
}

export const Currency: FC<CurrencyProps> = ({
  type,
  value,
  className,
  size,
  arround,
  fragments,
}) => {
  const shouldShowQuestionMark =
    (isNumber(value) && isNaN(value)) || value === undefined;
  const str =
    !shouldShowQuestionMark && isNumber(value)
      ? value?.toLocaleString([], { maximumFractionDigits: fragments || 0 })
      : value;

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
        {arround && !shouldShowQuestionMark ? '~' : ''}
        {shouldShowQuestionMark ? '?' : str}
      </span>
    </div>
  );
};
