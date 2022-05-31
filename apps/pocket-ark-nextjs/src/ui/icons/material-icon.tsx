import { materials, MaterialType } from '@pocket-ark/lost-ark-data';
import Image, { ImageProps } from 'next/image';
import { FC } from '../../utils';
import { AbosoluteRarityBackground } from '../rarity';

export interface MaterialIconProps {
  type: MaterialType;
  overrides?: Partial<Omit<ImageProps, 'src'>>;
  hideBackgroud?: boolean;
}

export const MaterialIcon: FC<MaterialIconProps> = ({
  type,
  overrides,
  hideBackgroud,
}) => {
  const rarity = materials.find((m) => m.type === type)?.rarity;
  const path = (icon: string) => `/assets/materials/${icon}.webp`;
  let src = path(type);

  if ((type as string)?.startsWith('HonorShardPouch')) {
    src = path('HonorShardPouch');
  } else if ((type as string)?.startsWith('HarmonyShardPouch')) {
    src = path('HarmonyShardPouch');
  } else if ((type as string)?.startsWith('LifeShardPouch')) {
    src = path('LifeShardPouch');
  }

  return (
    <div
      className="relative inline-flex rounded-lg overflow-hidden z-0"
      style={{ width: overrides?.width || 40, height: overrides?.height || 40 }}
    >
      {!hideBackgroud && (
        <AbosoluteRarityBackground rarity={rarity} opacity={0.75} />
      )}
      <Image
        src={src}
        width={40}
        height={40}
        layout="fixed"
        alt={`${type} Icon`}
        {...overrides}
      />
    </div>
  );
};
