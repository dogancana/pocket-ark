import { SecretMap } from '@pocket-ark/lost-ark-data';
import Image, { ImageProps } from 'next/image';
import { FC } from '../../utils/react';

export interface MapIconProps {
  secretMap: SecretMap;
  overrides?: Partial<Omit<ImageProps, 'src'>>;
}

export const MapIcon: FC<MapIconProps> = ({ secretMap: map, overrides }) => {
  return (
    <Image
      src="/assets/items/SecretMap.webp"
      width={40}
      height={40}
      layout="fixed"
      alt={`T${map.tier} ${map.rarity} Secret Map`}
      {...overrides}
    />
  );
};
