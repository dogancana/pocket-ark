import {
  generateSourceMeta,
  getPricingSourceFromCookies,
  insertPricingSource,
  setPricingSourceToCookies,
} from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const cookieSource = getPricingSourceFromCookies(req, res);
      const { description, region } = JSON.parse(req.body);

      if (!description || !region) {
        return res.status(400).send('No description or region provided');
      }

      const generatedMeta = generateSourceMeta();
      const meta = await insertPricingSource({
        ...cookieSource,
        meta: {
          ...generatedMeta,
          description,
          region,
        },
      });
      const newSource = { ...cookieSource, meta };
      setPricingSourceToCookies(newSource, req, res);

      return res.status(200).json(newSource);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      error: 'Cannot create source. Try creating with a different description.',
    });
  }

  res.status(400).send('Not implemented');
};

export default controller;
