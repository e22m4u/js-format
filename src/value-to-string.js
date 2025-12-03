import {isClass} from './utils/index.js';

const BASE_CTOR_NAMES = [
  'String',
  'Number',
  'Boolean',
  'Object',
  'Array',
  'Function',
  'Symbol',
  'Map',
  'Set',
  'Date',
];

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
    return BASE_CTOR_NAMES.includes(input.constructor.name)
      ? input.constructor.name
      : `${input.constructor.name} (instance)`;
  if (typeof input === 'object' && input.constructor == null) return 'Object';
  return String(input);
}
