import { getPricingSourceFromCookies, setPricingSourceToCookies } from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = (req: NextApiRequest, res: NextApiResponse) => {
  const source = getPricingSourceFromCookies(req, res);

  if (!source?.meta?.reference || !source?.meta?.key)
    return res.status(400).send('Source is not shared');

  const newSource = { ...source, meta: undefined };
  setPricingSourceToCookies(newSource, req, res);

  return res.status(200).send('OK');
};

export default controller;
