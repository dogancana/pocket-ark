import Image from 'next/image';
import Link from 'next/link';
import { Container, Icon } from 'semantic-ui-react';
import { FC } from '../../utils/react';

export const Footer: FC = () => {
  return (
    <div className="bg-stone-200 p-4 border-t-2 border-stone-300">
      <Container>
        <div className="w-full flex items-center text-gray-400">
          <div className="flex items-center ml-auto">
            <span>Prices by</span>
            <Link href="https://www.lostarkmarket.online" passHref>
              <a className="ml-2 mt-2 opacity-50" target="_blank">
                <Image
                  src="/assets/loamarket.png"
                  width={20}
                  height={20}
                  alt="Lost Ark Market"
                />
              </a>
            </Link>
          </div>
          <Link href="https://discord.gg/ZkSMGXn2Ee" passHref>
            <a className=" text-stone-400 ml-2">
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
      </Container>
    </div>
  );
};
