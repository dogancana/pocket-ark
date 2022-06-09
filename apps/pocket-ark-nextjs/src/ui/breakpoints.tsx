import { useEffect, useState } from 'react';

const size = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

export const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};

export const media = {
  xs: `@media ${device.xs}`,
  sm: `@media ${device.sm}`,
  md: `@media ${device.md}`,
  lg: `@media ${device.lg}`,
  xl: `@media ${device.xl}`,
};

export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    try {
      const m = window.matchMedia(query);
      if (m.matches !== matches) setMatches(m.matches);

      const listener = () => setMatches(m.matches);
      // eslint-disable-next-line no-unused-expressions
      m.addEventListener
        ? m.addEventListener('change', listener)
        : m.addListener(listener);

      return () =>
        m.removeEventListener
          ? m.removeEventListener('change', listener)
          : m.removeListener(listener);
    } catch (e) {
      setMatches(matches ?? true);
      return () => null;
    }
  }, [matches, query]);

  return matches;
}

export const useMediaXS = () => useMediaQuery(device.xs);
export const useMediaSM = () => useMediaQuery(device.sm);
export const useMediaMD = () => useMediaQuery(device.md);
export const useMediaLG = () => useMediaQuery(device.lg);
export const useMediaXL = () => useMediaQuery(device.xl);
