import { Rarity } from '@pocket-ark/lost-ark-data';
import { CSSProperties } from 'react';
import { FC } from '../utils/react';

const rarityColors: { [key in Rarity]?: string } = {
  [Rarity.Common]: '#a9a9a9',
  [Rarity.Uncommon]: '#4c8204',
  [Rarity.Rare]: '#0479a9',
  [Rarity.Epic]: '#8004a9',
  [Rarity.Legendary]: '#a16305',
  [Rarity.Relic]: '#a94204',
};

const rarityMap: { [key in Rarity]?: CSSProperties['background'] } = {
  [Rarity.Common]:
    'linear-gradient(to right bottom, #3b3b3b 0%, #a9a9a9 40%, #a9a9a9 70%, rgba(0, 0, 0, 0.3) 100%)',
  [Rarity.Uncommon]:
    'linear-gradient(to right bottom, #1e2f08 0%, #4c8204 40%, #4c8204 70%, rgba(0, 0, 0, 0.3) 100%)',
  [Rarity.Rare]:
    'linear-gradient(to right bottom, #082c3b 0%, #0479a9 40%, #0479a9 70%, rgba(0, 0, 0, 0.3) 100%)',
  [Rarity.Epic]:
    'linear-gradient(to right bottom, #2e083b 0%, #8004a9 40%, #8004a9 70%, rgba(0, 0, 0, 0.3) 100%)',
  [Rarity.Legendary]:
    'linear-gradient(to right bottom, #392509 0%, #a16305 40%, #a16305 70%, rgba(0, 0, 0, 0.3) 100%)',
  [Rarity.Relic]:
    'linear-gradient(to right bottom, #3b1b08 0%, #a94204 40%, #a94204 70%, rgba(0, 0, 0, 0.3) 100%)',
};

export const rarityBackground = (rarity: Rarity): CSSProperties => ({
  background: rarityMap[rarity],
});

export const AbosoluteRarityBackground: FC<{
  rarity: Rarity;
  opacity?: number;
}> = ({ rarity, opacity }) => (
  <div
    className="absolute top-0 left-0 h-full w-full -z-10"
    style={{ ...rarityBackground(rarity), opacity }}
  />
);

export const RarityLine: FC<{ rarity: Rarity; className?: string }> = ({
  rarity,
  className,
}) => (
  <div
    className={`w-full ${className || ''}`}
    style={{ background: rarityColors[rarity] }}
  />
);

export const RarityTriangle: FC<{
  rarity: Rarity;
  className?: string;
}> = ({ rarity, className }) => (
  <div
    className={`w-full ${className || ''}`}
    style={{ background: rarityColors[rarity], opacity: 0.8 }}
  />
);
