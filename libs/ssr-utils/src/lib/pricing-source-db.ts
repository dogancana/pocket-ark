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
    return meta;
  } catch (e) {
    client.close();
    throw e;
  }
}

export async function getPricingSourcebyReference(
  reference: string
): Promise<PricingSource | null> {
  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);
    const res = await collection.findOne<PricingSource>(
      { 'meta.reference': reference },
      { projection: { 'meta.key': 0, _id: 0 } }
    );
    return res;
  } finally {
    client.close();
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
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          'meta.key': 0,
        },
      },
    ]);

    return await res.toArray();
  } finally {
    client.close();
  }
}

export async function removeSource(key: string, reference: string) {
  if (!key || !reference) throw new Error('Cannot remove');

  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);

    return collection.deleteOne({
      'meta.reference': reference,
      'meta.key': key,
    });
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
  return undefined;
}
