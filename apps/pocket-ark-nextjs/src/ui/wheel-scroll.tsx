import { useEffect, useRef } from 'react';

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        const isScrollable = el.parentElement.clientWidth < el.scrollWidth;
        if (e.deltaY == 0 || !isScrollable) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 2,
        });
      };
      el.addEventListener('wheel', onWheel as any);
      return () => el.removeEventListener('wheel', onWheel as any);
    }
  }, []);
  return elRef;
}
