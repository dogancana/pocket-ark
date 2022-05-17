import { PriceSourceMeta } from '@pocket-ark/lost-ark-data';
import { randomBytes, randomUUID } from 'crypto';

export function generateSourceMeta(): PriceSourceMeta {
  return {
    reference: randomUUID(),
    key: randomBytes(32).toString('hex'),
    lastUpdatedAtISO: new Date().toISOString(),
  };
}
