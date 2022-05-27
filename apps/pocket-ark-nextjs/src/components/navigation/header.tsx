import Link from 'next/link';
import { Container } from 'semantic-ui-react';
import { FC } from '../../utils';
import { SiteSearch } from './site-search';

export const Header: FC = () => (
  <header
    role="banner"
    className="shadow-md sticky top-0 bg-stone-200 z-50 border-b-2 border-b-gray-300"
  >
    <Container>
      <nav className="flex items-center py-2">
        <Link href="/" passHref>
          <a className="px-3 text-stone-800 text-xl font-bold">POCKET ARK</a>
        </Link>
        <div className="flex ml-auto">
          <SiteSearch />
        </div>
      </nav>
    </Container>
  </header>
);
