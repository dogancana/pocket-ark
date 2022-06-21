import { EngravingType } from '@pocket-ark/lost-ark-data';
import Image, { ImageProps } from 'next/image';
import { FC } from '../../utils/react';

export interface EngravingIconProps {
  type: EngravingType;
  overrides?: Partial<Omit<ImageProps, 'src'>>;
}

export const EngravingIcon: FC<EngravingIconProps> = ({ type, overrides }) => {
  const path = (icon: string) => `/assets/engravings/${icon}.webp`;
  const src = path(type);

  return (
    <Image
      layout="fixed"
      src={src}
      width={55}
      height={55}
      className="rounded-full"
      alt={`${type} icon`}
      {...overrides}
    />
  );
};
