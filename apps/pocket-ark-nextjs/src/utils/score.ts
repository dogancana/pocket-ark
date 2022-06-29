export function mapScoreColor(number: number) {
  switch (true) {
    case number > 1.5:
      return 'text-green-700';
    case number > 1.25:
      return 'text-green-500';
    case number > 1:
      return 'text-green-400';
    case number === 0:
      return '';
    case number < 1:
      return 'text-red-300';
    case number < 0.75:
      return 'text-red-400';
    case number < 0.5:
      return 'text-red-500';
    default:
      return '';
  }
}
