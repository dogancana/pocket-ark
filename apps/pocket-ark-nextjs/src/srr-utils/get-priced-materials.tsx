import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export function getPricingSource(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getSourceFromCookies(req, res);
}

function getSourceFromCookies(req: NextApiRequest, res: NextApiResponse) {
  const sourceString = getCookie('pricingSourceJSON', { req, res }) as
    | string
    | undefined;

  const source = sourceString
    ? (JSON.parse(sourceString) as PricingSource)
    : null;

  return source;
}
