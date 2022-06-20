import { mergePricingSource } from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const { reference, key } = req.query;
      await mergePricingSource(
        reference as string,
        key as string,
        JSON.parse(req.body)
      );
      return res.status(200).json({ message: 'Pricing source updated' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({ error: 'Unhandled error' });
  }

  res.status(400).send('Not implemented');
};

export default controller;
