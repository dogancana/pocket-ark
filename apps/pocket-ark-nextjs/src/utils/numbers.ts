export function readableNumber(num: number, maximumFractionDigits = 0) {
  if (isNaN(num)) return '?';
  return num?.toLocaleString([], { maximumFractionDigits });
}
