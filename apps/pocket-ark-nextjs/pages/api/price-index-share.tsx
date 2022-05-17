import { isSourceComplete } from '@pocket-ark/lost-ark-data';
import {
  generateSourceMeta,
  getPricingSource,
  setPricingSource
} from '@pocket-ark/ssr-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = (req: NextApiRequest, res: NextApiResponse) => {
  const source = getPricingSource(req, res);
  const isComplete = isSourceComplete(source);

  if (!isComplete) return res.status(400).send('Source is incomplete');
  if (source.meta?.reference && !source.meta?.key)
    return res.status(400).send('Already using other reference');

  if (!(source.meta?.key && source.meta?.reference)) {
    const meta = generateSourceMeta();
    const newSource = { ...source, meta };
    setPricingSource(newSource, req, res);
  }

  return res.status(302).redirect('/price-index');
};

export default controller;
