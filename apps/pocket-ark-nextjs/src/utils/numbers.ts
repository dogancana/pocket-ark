export function readableNumber(num: number, maximumFractionDigits = 0) {
  return num?.toLocaleString([], { maximumFractionDigits });
}
