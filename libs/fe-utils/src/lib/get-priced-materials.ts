import { COOKIES, PricingSource } from '@pocket-ark/lost-ark-data';
import { getCookie, setCookies } from 'cookies-next';

export function getPricingSourceFromCookies(): PricingSource {
  return getSourceFromCookies() || {};
}

export function setPricingSourceToCookies(source: PricingSource) {
  setCookies(COOKIES.pricingSourceJSON, source);
}

function getSourceFromCookies() {
  const sourceString = getCookie(COOKIES.pricingSourceJSON);

  const source = sourceString
    ? (JSON.parse(sourceString.toString()) as PricingSource)
    : null;

  return source;
}
