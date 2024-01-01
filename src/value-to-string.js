import {isClass} from './utils/index.js';

/**
 * Value to string.
 *
 * @param {any} input
 * @return {string}
 */
export function valueToString(input) {
  if (input == null) return String(input);
  if (typeof input === 'string') return `"${input}"`;
  if (typeof input === 'number' || typeof input === 'boolean')
    return String(input);
  if (isClass(input)) return input.name ? input.name : 'Class';
  if (input.constructor && input.constructor.name)
    return input.constructor.name;
  if (typeof input === 'object' && input.constructor == null) return 'Object';
  return String(input);
}
