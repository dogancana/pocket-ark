import Link from 'next/link';
import { FC } from '../utils';

export const Header: FC = () => (
  <header
    role="banner"
    className="py-4 shadow-md sticky top-0 bg-stone-200 z-50"
  >
    <nav className="container mx-auto">
      <Link href="/" passHref>
        <a className="px-3">POCKET ARK</a>
      </Link>
    </nav>
  </header>
);
