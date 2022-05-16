import { PricingSource } from '@pocket-ark/lost-ark-data';

export function mapToNonEditable(source: PricingSource) {
  return {
    ...source,
    meta: {
      ...source.meta,
      key: undefined,
    },
  };
}
