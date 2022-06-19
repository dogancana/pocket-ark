import { COOKIES, PricingSource } from '@pocket-ark/lost-ark-data';
import { getCookie, setCookie } from '@pocket-ark/utils';

export function getPricingSourceFromCookies(): PricingSource {
  return getCookie(COOKIES.pricingSourceJSON) || {};
}

export function setPricingSourceToCookies(source: PricingSource) {
  setCookie(COOKIES.pricingSourceJSON, source);
}
