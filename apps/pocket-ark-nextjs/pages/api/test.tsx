import { NextApiRequest, NextApiResponse } from 'next';
import { getPricingSource, upsertPricingSource } from '../../src/srr-utils';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  const source = getPricingSource(req, res);
  if (!source.meta.key || !source.meta.reference) {
    return res.status(403).send('Cannot update');
  }
  try {
    await upsertPricingSource(source);
    return res.send('OK');
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

export default controller;
