import { PriceSourceMeta, PricingSource } from '@pocket-ark/lost-ark-data';
import { client, MongoDbCollections, MongoDbNames } from './mongo-db';

export async function insertPricingSource(
  pricingSource: PricingSource
): Promise<PriceSourceMeta> {
  return _upsertPricingSource(pricingSource, true);
}

export async function updatePricingSource(
  pricingSource: PricingSource
): Promise<PriceSourceMeta> {
  return _upsertPricingSource(pricingSource, false);
}

async function _upsertPricingSource(
  pricingSource: PricingSource,
  upsert: boolean
): Promise<PriceSourceMeta> {
  if (!pricingSource.meta?.key || !pricingSource.meta.reference) {
    throw new Error('Cannot update');
  }

  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);
    const meta = {
      ...pricingSource.meta,
      lastUpdatedAtISO: new Date().toISOString(),
    };

    await collection.updateOne(
      {
        'meta.reference': meta?.reference,
        'meta.key': meta?.key,
      },
      {
        $set: { ...pricingSource, meta },
      },
      { upsert }
    );
    client.close();
    return meta;
  } catch (e) {
    console.error(e);
    client.close();
    throw e;
  }
}

export async function getPricingSourcebyReference(
  reference: string,
  key?: string
): Promise<PricingSource | null> {
  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);
    const projection: Record<string, unknown> = { _id: 0 };
    if (!key) projection['meta.key'] = 0;
    const res = await collection.findOne<PricingSource>(
      { 'meta.reference': reference },
      { projection }
    );
    client.close();
    return res;
  } catch (e) {
    console.error(e);
    client.close();
    throw e;
  }
}

export async function searchPricingSource(query: string) {
  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);

    const res = await collection.aggregate<PricingSource>([
      {
        $search: {
          compound: {
            should: [
              {
                text: {
                  path: 'meta.region',
                  query,
                },
              },
              {
                autocomplete: {
                  path: 'meta.description',
                  query,
                  tokenOrder: 'any',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 2,
                    maxExpansions: 32,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          'meta.key': 0,
        },
      },
      {
        $limit: 100,
      },
    ]);

    const result = await res.toArray();
    client.close();
    return result;
  } catch (e) {
    console.error(e);
    client.close();
    throw e;
  }
}

export async function removeSource(key: string, reference: string) {
  if (!key || !reference) throw new Error('Cannot remove');

  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);

    client.close();
    return collection.deleteOne({
      'meta.reference': reference,
      'meta.key': key,
    });
  } catch (e) {
    client.close();
    console.error(e);
    throw e;
  }
}
