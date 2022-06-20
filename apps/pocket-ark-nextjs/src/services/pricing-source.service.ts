import { PriceSourceMeta, PricingSource } from '@pocket-ark/lost-ark-data';

export function searchPricingSources(
  query: string
): Promise<PriceSourceMeta[]> {
  return fetch(`/api/pricing-sources/search?description=${query}`).then(
    fetchHandler
  );
}

export function applyPricingSourceReference(reference: string) {
  return fetch(`/api/pricing-sources/apply/${reference}`, {
    method: 'POST',
  }).then(fetchHandler);
}

export function sharePricingSource(region: string, description: string) {
  return fetch(`/api/pricing-sources/share`, {
    method: 'POST',
    body: JSON.stringify({ region, description }),
  }).then(fetchHandler);
}

export function putPricingSource(): Promise<PriceSourceMeta> {
  return fetch(`/api/pricing-sources`, {
    method: 'PUT',
  }).then(fetchHandler);
}

export function putPricingSourceReference(
  reference: string,
  key: string,
  prices: Partial<Omit<PricingSource, 'meta'>>
) {
  return fetch(`/api/pricing-sources/${reference}?key=${key}`, {
    method: 'PUT',
    body: JSON.stringify(prices),
  });
}

async function fetchHandler(res) {
  if (res.ok) return res.json();
  throw await res.json();
}
