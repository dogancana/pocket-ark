import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getCookie } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export function getPricingSource(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
): PricingSource {
  return getSourceFromCookies(req, res) || {};
}

function getSourceFromCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  res: ServerResponse
) {
  const sourceString = getCookie('pricingSourceJSON', {
    req,
    res,
  });

  const source = sourceString
    ? (JSON.parse(sourceString.toString()) as PricingSource)
    : null;

  return source;
}
