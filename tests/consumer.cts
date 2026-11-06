import { validateVin } from '@lp-labs/vin-checksum';
if (!validateVin('1HGCM82633A004352')) throw new Error('VIN');
// @ts-expect-error invalid argument must be rejected by declarations
validateVin(123);
