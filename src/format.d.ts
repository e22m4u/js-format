/**
 * Format.
 *
 * native:
 * s - string
 * d - digits
 * j - json
 *
 * extras:
 * v - value (valueToString.js)
 * l - list (arrayToList.js)
 *
 * @param pattern
 * @param args
 */
declare function format(pattern: string, ...args: any[]): string;
