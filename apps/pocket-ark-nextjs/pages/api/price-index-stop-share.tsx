import { setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIES } from '../../src/constants/cookies';
import { getPricingSource } from '../../src/srr-utils';

const controller = (req: NextApiRequest, res: NextApiResponse) => {
  const source = getPricingSource(req, res);

  if (!source?.meta?.reference || !source?.meta?.key)
    return res.status(400).send('Source is not shared');

  const newSource = { ...source, meta: undefined };
  setCookies(COOKIES.pricingSourceJSON, newSource, { req, res });

  return res.status(200).send('OK');
};

export default controller;
