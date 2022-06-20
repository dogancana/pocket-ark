import {
  COOKIES,
  PartialPricingSource
} from '@pocket-ark/lost-ark-data';
import { getCookie, setCookie } from '@pocket-ark/utils';
import { removeCookies } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export function getPricingSourceFromCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
): PartialPricingSource {
  return getCookie(COOKIES.pricingSourceJSON, { req, res }) || {};
}

export function setPricingSourceToCookies(
  source: PartialPricingSource,
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  setCookie(COOKIES.pricingSourceJSON, source, { req, res });
}

export function removePricingSourceFromCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  removeCookies(COOKIES.pricingSourceJSON, { req, res });
}
