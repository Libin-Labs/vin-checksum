# @lp-labs/vin-checksum

North American VIN check digit computation and validation.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/vin-checksum
```

## Working example

```js
import { validateVin } from '@lp-labs/vin-checksum';
if (!validateVin('1HGCM82633A004352')) throw new Error('VIN');
```

CommonJS: `const api = require('@lp-labs/vin-checksum')`.

## Behavior, customization and limits

vinCheckDigit requires17 uppercase ASCII letters/digits excluding I/O/Q, existing ninth check position must0..9/X but its value ignored during computation. validateVin compares ninth character, false checksum mismatch only; malformed VIN throws. Uses transliteration and weights per standard checksum. Does not establish WMI/model/year/vehicle authenticity, and not every jurisdiction mandates check digit. O(17).

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function vinCheckDigit(vin: string): string;
export declare function validateVin(vin: string): boolean;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
