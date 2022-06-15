import Link from 'next/link';
import { Container, Icon } from 'semantic-ui-react';
import { Logo, useMediaSM } from '../../ui';
import { FC } from '../../utils/react';
import { SiteSearch } from './site-search';

export const Header: FC = () => {
  const isSM = useMediaSM();

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
            <Link href="https://discord.gg/j8bAsPux" passHref>
              <a className="ml-2 text-stone-400">
                <Icon name="discord" size="large" />
              </a>
            </Link>
            <Link
              href="https://www.paypal.com/donate/?hosted_button_id=6JUF8K7EM4E9J"
              passHref
            >
              <a className="text-stone-400">
                <Icon name="paypal" size="large" />
              </a>
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
};
