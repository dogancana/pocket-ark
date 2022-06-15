import Image, { ImageProps } from 'next/image';
import { FC } from '../../utils/react';

export interface LogoProps {
  overrides?: Partial<Omit<ImageProps, 'src'>>;
}

export const Logo: FC<LogoProps> = ({ overrides }) => {
  return (
    <Image
      src="/android-chrome-256x256.png"
      width={40}
      height={40}
      layout="fixed"
      alt={`Pocket Ark Logo`}
      {...overrides}
    />
  );
};
