import { PricingSource } from '@pocket-ark/lost-ark-data';
import { searchPricingSource } from '@pocket-ark/ssr-utils';
import { differenceInCalendarDays } from 'date-fns';
import { filter } from 'fuzzy';
import { isFinite, sortBy } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const params = new URLSearchParams(req.url?.split('?')[1] || '');
      const description = params.get('description');

      const sources = await searchPricingSource(description);
      const sortedSources = sortSourcesByQuery(sources, description);
      return res.status(200).json(sortedSources.map((s) => s.meta));
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unhandled error' });
  }

  res.status(400).send('Not implemented');
};

export default controller;

const regions = ['euc', 'euw', 'nae', 'naw', 'sa'];

function sortSourcesByQuery(sources: PricingSource[], description: string) {
  const isRegionSearch =
    description && regions.includes(description.toLowerCase());
  const results = filter(description || '', Object.values(sources), {
    extract: (f) =>
      isRegionSearch
        ? f.meta.region
        : `${f.meta?.description} ${f.meta?.region}`,
  }).filter((v) => !!v);
  return sortBy(results, (r) => {
    const diff = differenceInCalendarDays(
      new Date(r.original.meta.lastUpdatedAtISO),
      new Date()
    );
    const keys = Object.keys(r.original).length;
    const scoreMultiplier = isFinite(r.score) ? r.score * 9999 : 99999;

    return -(scoreMultiplier + keys * keys + diff * 1000);
  }).map((s) => s.original);
}
