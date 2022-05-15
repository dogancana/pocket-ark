import { materials } from '@pocket-ark/lost-ark-data';
import { setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIES } from '../../src/constants/cookies';
import { generateSourceMeta, getPricingSource } from '../../src/srr-utils';

const controller = (req: NextApiRequest, res: NextApiResponse) => {
  const source = getPricingSource(req, res);
  const isComplete = materials.every((m) => !!source[m.type]?.price);

  if (!isComplete) return res.status(400).send('Source is incomplete');
  if (source.meta?.reference && !source.meta?.key)
    return res.status(400).send('Already using other reference');

  if (!(source.meta?.key && source.meta?.reference)) {
    const meta = generateSourceMeta();
    const newSource = { ...source, meta };
    setCookies(COOKIES.pricingSourceJSON, newSource, { req, res });
  }

  return res.status(302).redirect('/price-index');
};

export default controller;
