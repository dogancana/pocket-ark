import { MaterialType } from '@pocket-ark/lost-ark-data';
import { MaterialIcon } from './icons/material-icon';
import { FC } from '../utils';

interface MaterialCountProps {
  type: MaterialType;
  value: number | string;
  className?: string;
  size?: number;
}

export const MaterialCount: FC<MaterialCountProps> = ({
  type,
  value,
  className,
  size,
}) => {
  return (
    <span className={`flex items-center ${className ? className : ''}`}>
      <MaterialIcon
        type={type}
        overrides={{ width: size || 25, height: size || 25 }}
      />
      <span className="ml-1">{value}</span>
    </span>
  );
};
