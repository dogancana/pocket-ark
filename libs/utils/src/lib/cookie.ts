import { PricingSource } from '@pocket-ark/lost-ark-data';
import { getCookies, removeCookies, setCookies } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

export function setCookie(key: string, value: unknown, opts?: OptionsType) {
  const str = JSON.stringify(value);
  const groups = str.match(/.{1,2000}/g) as string[];

  const existing = getCookieArr(key, opts);
  for (let i = groups.length; i < existing.length && !!existing[i]; i++) {
    removeCookies(existing[i][0], opts);
  }

  groups.forEach((s, i) => {
    const name = i !== 0 ? `${key}__${i}` : key;
    setCookies(name, s, opts);
  });
}

export function getCookie(key: string, opts?: OptionsType) {
  const cookiesArr = getCookieArr(key, opts);
  if (!cookiesArr?.length) return null;

  cookiesArr.sort((a, b) => (b[0] < a[0] ? 1 : -1));
  const sourceString = cookiesArr.map(([, value]) => value).join('');

  const source = sourceString
    ? (JSON.parse(sourceString.toString()) as PricingSource)
    : null;

  return source;
}

export function removeCookie(key: string, opts?: OptionsType) {
  const cookiesArr = getCookieArr(key, opts);
  cookiesArr.forEach(([key]) => removeCookies(key, opts));
}

function getCookieArr(key: string, opts?: OptionsType) {
  const cookies = getCookies(opts);
  const reg = new RegExp(`${key}(__[0-9])?`);
  return Object.entries(cookies).filter(([key]) => reg.test(key));
}
