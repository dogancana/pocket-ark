import { PricingSource } from '@pocket-ark/lost-ark-data';

export function isSourceOld(source: PricingSource) {
  if (!source.meta?.lastUpdatedAtISO) return true;

  const lastUpdatedAt = new Date(source.meta?.lastUpdatedAtISO);
  const now = new Date();
  const diff = now.getTime() - lastUpdatedAt.getTime();
  const diffMins = Math.ceil(diff / (1000 * 60));
  return diffMins > 15;
}

export function mapToNonEditable(source: PricingSource) {
  return {
    ...source,
    meta: {
      ...source.meta,
      key: undefined,
    },
  };
}
