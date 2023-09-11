import {valueToString} from './value-to-string.js';

/**
 * Separator.
 *
 * @type {string}
 */
const SEPARATOR = ', ';

/**
 * Array to list.
 *
 * @param {any} input
 * @return {string}
 */
export function arrayToList(input) {
  if (Array.isArray(input) && input.length)
    return input.map(valueToString).join(SEPARATOR);
  return valueToString(input);
}
