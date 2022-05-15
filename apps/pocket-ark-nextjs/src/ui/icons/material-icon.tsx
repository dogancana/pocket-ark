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
  if ((type as string)?.startsWith('HonorShardPouch'))
    src = path('HonorShardPouch');

  return (
    <Image
      src={src}
      width={40}
      height={40}
      layout="fixed"
      alt={`${type} Icon`}
      {...overrides}
    />
  );
};
