import { searchPricingSource } from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const params = new URLSearchParams(req.url?.split('?')[1] || '');
      const description = params.get('description');

      const sources = await searchPricingSource(description);
      return res.status(200).json(sources.map((s) => s.meta));
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unhandled error' });
  }

  res.status(400).send('Not implemented');
};

export default controller;
