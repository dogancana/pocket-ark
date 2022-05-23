import { COOKIES, PricingSource } from '@pocket-ark/lost-ark-data';
import {
  getPricingSourcebyReferece,
  getPricingSourceFromCookies
} from '@pocket-ark/ssr-utils';
import { getCookie, removeCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { PriceIndexPage } from '../src/features/price-index';
import { FC } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => {
  return (
    <PricingProvider source={source || {}}>
      <PriceIndexPage />
    </PricingProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const result = (s?: PricingSource) => ({ props: { source: s || {} } });
  try {
    const reference = getCookie(COOKIES.reference, { req, res }) as
      | string
      | undefined;
    if (reference) {
      const source = await getPricingSourcebyReferece(reference);
      if (source) return result(source);
      else removeCookies(COOKIES.reference, { req, res });
    }

    return result(getPricingSourceFromCookies(req, res) || {});
  } catch (e) {
    console.error(e);
    return result({});
  }
};

export default Page;
