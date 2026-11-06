function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
const letters: Readonly<Record<string, number>> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9,
};
export function vinCheckDigit(vin: string): string {
  strictText(vin, 17);
  if (vin.length !== 17 || /[^A-HJ-NPR-Z0-9]/.test(vin) || /[^0-9X]/.test(vin[8]!))
    throw new RangeError('VIN syntax');
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const c = vin[i]!,
      v = c >= '0' && c <= '9' ? Number(c) : letters[c]!;
    sum += v * weights[i]!;
  }
  const check = sum % 11;
  return check === 10 ? 'X' : String(check);
}
export function validateVin(vin: string): boolean {
  return vinCheckDigit(vin) === vin[8];
}
