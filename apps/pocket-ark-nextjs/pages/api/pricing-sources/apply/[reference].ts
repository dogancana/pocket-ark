import { COOKIES } from '@pocket-ark/lost-ark-data';
import {
  getPricingSourcebyReference,
  removePricingSourceFromCookies,
} from '@pocket-ark/ssr-utils';
import { setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  const reference = req.query.reference as string;
  if (!reference) return res.status(400).send('No reference provided');

  const apply = async () => {
    const source = await getPricingSourcebyReference(reference);
    removePricingSourceFromCookies(req, res);
    setCookies(COOKIES.reference, reference, { req, res });
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
