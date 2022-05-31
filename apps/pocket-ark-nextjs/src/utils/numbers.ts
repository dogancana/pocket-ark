export function readableNumber(num: number) {
  return num.toLocaleString([], { maximumFractionDigits: 0 });
}
