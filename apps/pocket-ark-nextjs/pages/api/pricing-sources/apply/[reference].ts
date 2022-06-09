import { COOKIES } from '@pocket-ark/lost-ark-data';
import {
  getPricingSourcebyReference,
  removePricingSourceFromCookies,
  setPricingSourceToCookies,
} from '@pocket-ark/ssr-utils';
import { setCookies, removeCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  const reference = req.query.reference as string;
  if (!reference) return res.status(400).send('No reference provided');

  const key = req.query.key as string | undefined;

  const apply = async () => {
    const source = await getPricingSourcebyReference(reference, key);
    removePricingSourceFromCookies(req, res);
    if (key) {
      setPricingSourceToCookies(source, req, res);
      removeCookies(COOKIES.reference, { req, res });
    } else {
      setCookies(COOKIES.reference, reference, { req, res });
    }
    return source;
  };

  try {
    if (req.method === 'POST') {
      return res.status(200).json(await apply());
    } else if (req.method === 'GET') {
      await apply();
      return res.redirect('/price-index');
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({ error: 'Unhandled error' });
  }

  res.status(400).send('Not implemented');
};

export default controller;
