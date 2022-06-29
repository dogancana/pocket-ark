import { LOAMarketRegion } from '@pocket-ark/loa-market-api';
import { COOKIES } from '@pocket-ark/lost-ark-data';
import { getCookie, setCookies } from 'cookies-next';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Dropdown, DropdownProps } from 'semantic-ui-react';
import { Logo, useMediaSM } from '../../ui';
import { FC } from '../../utils/react';
import { SiteSearch } from './site-search';

const regions = [
  {
    value: LOAMarketRegion.EUC,
    text: 'EUC',
    content: 'Europe Central',
  },
  {
    value: LOAMarketRegion.EUW,
    text: 'EUW',
    content: 'Europe West',
  },
  {
    value: LOAMarketRegion.NAE,
    text: 'NAE',
    content: 'North America East',
  },
  {
    value: LOAMarketRegion.NAW,
    text: 'NAW',
    content: 'Nort America West',
  },
  {
    value: LOAMarketRegion.SA,
    text: 'SA',
    content: 'South America',
  },
];

export const Header: FC = () => {
  const isSM = useMediaSM();
  const [region, setRegion] = useState<LOAMarketRegion>(
    (getCookie(COOKIES.region) as LOAMarketRegion | undefined) ||
      LOAMarketRegion.NAE
  );

  const onRegionChange: DropdownProps['onChange'] = (_, data) => {
    const r = data.value as LOAMarketRegion;
    setCookies(COOKIES.region, r);
    setRegion(r);
    window.location.reload();
  };

  return (
    <header
      role="banner"
      className="shadow-md sticky top-0 bg-stone-200 z-50 border-b-2 border-b-gray-300"
    >
      <Container>
        <nav className="flex items-center py-2">
          <Link href="/" passHref>
            <a className="px-3 text-stone-800 text-xl font-bold">
              {isSM === false ? (
                <Logo overrides={{ width: 25, height: 25 }} />
              ) : (
                'POCKET ARK'
              )}
            </a>
          </Link>
          <div className="flex ml-auto items-center">
            <SiteSearch />
          </div>
          <Dropdown
            inline
            value={region}
            direction="left"
            className="ml-4 text-gray-500"
            onChange={onRegionChange}
            options={regions.map((m) => ({
              ...m,
              key: m.text,
            }))}
          />
        </nav>
      </Container>
    </header>
  );
};
