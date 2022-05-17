import { PricingSource } from '@pocket-ark/lost-ark-data';
import { client, MongoDbCollections, MongoDbNames } from './mongo-db';

export async function upsertPricingSource(pricingSource: PricingSource) {
  if (!pricingSource.meta?.key || !pricingSource.meta.reference) {
    throw new Error('Cannot update');
  }

  try {
    await client.connect();
    const meta = pricingSource.meta;
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);

    console.log('s', pricingSource);

    const r = await collection.updateOne(
      {
        'meta.reference': meta?.reference,
        'meta.key': meta?.key,
      },
      {
        $set: {
          ...pricingSource,
          meta: {
            ...meta,
            lastUpdatedAtISO: new Date().toISOString(),
          },
        },
      },
      { upsert: true }
    );
    return r;
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
  return undefined;
}

export async function getSourcebyReferece(reference: string) {
  try {
    await client.connect();
    const collection = await client
      .db(MongoDbNames.Public)
      .collection(MongoDbCollections.PricingSource);
    const res = await collection.findOne<PricingSource>({
      'meta.reference': reference,
    });
    if (res) delete (res as any)['_id']; // remove non serializable mongo id
    return res ? stripKey(res) : res;
  } finally {
    client.close();
  }
}

function stripKey(source: PricingSource) {
  return {
    ...source,
    meta: {
      ...source.meta,
      key: null,
    },
  };
}
