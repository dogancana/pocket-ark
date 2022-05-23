import { getPricingSourceFromCookies, updatePricingSource } from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  const source = getPricingSourceFromCookies(req, res);
  if (!source.meta.key || !source.meta.reference) {
    return res.status(403).send('Cannot update');
  }
  try {
    await updatePricingSource(source);
    return res.send('OK');
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

export default controller;
