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
 * @param {any} fmt
 * @return {string}
 */
export function format(fmt) {
  if (fmt instanceof Date) {
    fmt = fmt.toISOString();
  } else if (typeof fmt !== 'string') {
    fmt = String(fmt);
  }
  const re = /(%?)(%([sdjvl]))/g;
  const args = Array.prototype.slice.call(arguments, 1);
  if (args.length) {
    fmt = fmt.replace(re, function (match, escaped, ptn, flag) {
      let arg = args.shift();
      switch (flag) {
        // eslint-disable-next-line no-fallthrough
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
  if (args.length) fmt += ' ' + args.join(' ');
  // update escaped %% values
  fmt = fmt.replace(/%{2,2}/g, '%');
  return '' + fmt;
}
