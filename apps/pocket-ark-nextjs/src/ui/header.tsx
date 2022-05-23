import Link from 'next/link';
import { FC } from '../utils';
import { Container } from 'semantic-ui-react';

export const Header: FC = () => (
  <header
    role="banner"
    className="py-4 shadow-md sticky top-0 bg-stone-200 z-50"
  >
    <nav>
      <Container>
        <Link href="/" passHref>
          <a className="px-3 text-zinc-800 text-xl font-bold">POCKET ARK</a>
        </Link>
      </Container>
    </nav>
  </header>
);
