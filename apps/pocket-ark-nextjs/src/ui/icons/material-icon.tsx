import { MaterialType } from '@pocket-ark/lost-ark-data';
import Image, { ImageProps } from 'next/image';

export interface MaterialIconProps {
  type: MaterialType;
  overrides?: Partial<Omit<ImageProps, 'src'>>;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  type,
  overrides,
}) => {
  const path = (icon: string) => `/assets/materials/${icon}.webp`;
  let src = path(type);
  if (type === MaterialType.HonorShardPouchLarge) src = path('HonorShardPouch');

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
