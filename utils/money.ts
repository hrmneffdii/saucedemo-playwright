// 'Item total: $39.98' -> 39.98
export function parseMoney(text: string): number {
  return Number(text.replace(/[^0-9.]/g, ''));
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}