export function generateSampleNumbers(
  from: number,
  to: number,
  sampleCount = 10
) {
  if (from >= to) throw new Error('from must be less than to');

  const samples = [];
  const diff = to - from;
  const step = diff / sampleCount;
  for (let i = 0; i < sampleCount + 1; i++) {
    samples.push(from + i * step);
  }
  return samples;
}
