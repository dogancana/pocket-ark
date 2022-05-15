import { addSeconds, format } from 'date-fns';

export function readableSeconds(seconds: number) {
  const helperDate = addSeconds(new Date(0), seconds);
  return format(helperDate, seconds >= 3600 ? 'HH:mm:ss' : 'mm:ss');
}
