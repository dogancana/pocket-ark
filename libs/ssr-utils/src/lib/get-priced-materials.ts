import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { COOKIES, PricingSource } from '@pocket-ark/lost-ark-data';

export function getPricingSourceFromCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
): PricingSource {
  return getSourceFromCookies(req, res) || {};
}

export function setPricingSourceToCookies(
  source: PricingSource,
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  setCookies(COOKIES.pricingSourceJSON, source, { req, res });
}

export function removePricingSourceFromCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  removeCookies(COOKIES.pricingSourceJSON, { req, res });
}

function getSourceFromCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  const sourceString = getCookie(COOKIES.pricingSourceJSON, {
    req,
    res,
  });

  const source = sourceString
    ? (JSON.parse(sourceString.toString()) as PricingSource)
    : null;

  return source;
}
