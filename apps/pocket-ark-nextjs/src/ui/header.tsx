import Link from 'next/link';

export const Header: React.FC = () => (
  <header
    role="banner"
    className="py-4 shadow-md sticky top-0 bg-stone-200 z-50"
  >
    <nav className="container mx-auto">
      <Link href="/" passHref>
        <span className="px-3">POCKET ARK</span>
      </Link>
    </nav>
  </header>
);
