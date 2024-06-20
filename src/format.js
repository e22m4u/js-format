import {arrayToList} from './array-to-list.js';
import {valueToString} from './value-to-string.js';

/**
 * Format - extended version of https://github.com/tmpfs/format-util
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
 * @param {string} pattern
 * @return {string}
 */
export function format(pattern) {
  if (pattern instanceof Date) {
    pattern = pattern.toISOString();
  } else if (typeof pattern !== 'string') {
    pattern = String(pattern);
  }
  const re = /(%?)(%([sdjvl]))/g;
  const args = Array.prototype.slice.call(arguments, 1);
  if (args.length) {
    pattern = pattern.replace(re, function (match, escaped, ptn, flag) {
      let arg = args.shift();
      switch (flag) {
        case 's':
          arg = String(arg);
          break;
        case 'd':
          arg = Number(arg);
          break;
        case 'j':
          arg = JSON.stringify(arg);
          break;
        case 'v':
          arg = valueToString(arg);
          break;
        case 'l':
          arg = arrayToList(arg);
          break;
      }
      if (!escaped) return arg;
      args.unshift(arg);
      return match;
    });
  }
  // arguments remain after formatting
  if (args.length) pattern += ' ' + args.join(' ');
  // update escaped %% values
  pattern = pattern.replace(/%{2}/g, '%');
  return '' + pattern;
}
