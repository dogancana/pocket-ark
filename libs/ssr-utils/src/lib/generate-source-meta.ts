import { randomBytes, randomUUID } from 'crypto';

export function generateSourceMeta() {
  return {
    reference: randomUUID(),
    key: randomBytes(32).toString('hex'),
    lastUpdatedAtISO: new Date().toISOString(),
  };
}
