import {valueToString} from './value-to-string.js';

/**
 * Separator.
 *
 * @type {string}
 */
const SEPARATOR = ', ';

/**
 * Array to string.
 *
 * @param {any} input
 * @return {string}
 */
export function arrayToString(input) {
  if (Array.isArray(input) && input.length)
    return input.map(valueToString).join(SEPARATOR);
  return valueToString(input);
}
