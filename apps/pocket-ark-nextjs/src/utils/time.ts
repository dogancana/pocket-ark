import { addSeconds, format, formatRelative } from 'date-fns';

export function readableSeconds(seconds: number) {
  const helperDate = addSeconds(new Date(0), seconds);
  return format(helperDate, seconds >= 3600 ? 'HH:mm:ss' : 'mm:ss');
}

export function relativeDate(date?: string) {
  return date ? formatRelative(new Date(date), new Date()) : undefined;
}
