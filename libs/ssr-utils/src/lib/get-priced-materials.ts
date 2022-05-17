import { getCookie, setCookies } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { COOKIES, PricingSource } from '@pocket-ark/lost-ark-data';

export function getPricingSource(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
): PricingSource {
  return getSourceFromCookies(req, res) || {};
}

export function setPricingSource(
  source: PricingSource,
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  setCookies(COOKIES.pricingSourceJSON, source, { req, res });
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
