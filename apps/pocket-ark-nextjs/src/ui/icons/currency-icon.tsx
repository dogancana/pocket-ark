import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import Image, { ImageProps } from 'next/image';
import { FC } from '../../utils';

export interface CurrencyIconProps {
  type: CurrencyType | CurrencyItemType;
  overrides?: Partial<Omit<ImageProps, 'src'>>;
}

export const CurrencyIcon: FC<CurrencyIconProps> = ({ type, overrides }) => {
  const path = (icon: string) => `/assets/currency/${icon}.webp`;
  const src = path(type);

  return (
    <Image
      src={src}
      width={40}
      height={40}
      alt={`${type} Icon`}
      {...overrides}
    />
  );
};
