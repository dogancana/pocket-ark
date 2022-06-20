import { COOKIES } from '@pocket-ark/lost-ark-data';
import { getCookie, removeCookies } from 'cookies-next';
import { merge } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { getPricingSourceFromCookies } from './get-priced-materials';
import { getPricingSourcebyReference } from './pricing-source-db';

export const getPricingPropsSSR = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const reference = getCookie(COOKIES.reference, { req, res }) as
      | string
      | undefined;
    if (reference) {
      const source = await getPricingSourcebyReference(reference);
      if (source) return source;
      else removeCookies(COOKIES.reference, { req, res });
    }

    const fromCookies = getPricingSourceFromCookies(req, res) || null;
    const fromDB = fromCookies.meta?.reference
      ? await getPricingSourcebyReference(
          fromCookies.meta?.reference,
          fromCookies.meta?.key
        )
      : {};
    const result = merge(fromCookies, fromDB);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};
