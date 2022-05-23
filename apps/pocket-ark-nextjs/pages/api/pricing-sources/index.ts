import {
  getPricingSourceFromCookies,
  updatePricingSource,
} from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const cookieSource = getPricingSourceFromCookies(req, res);

      if (!cookieSource.meta?.key) {
        return res.status(403).json({ error: 'Cannot update' });
      }
      const r = await updatePricingSource(cookieSource);
      return res.status(200).json(r);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({ error: 'Unhandled error' });
  }

  res.status(400).send('Not implemented');
};

export default controller;
