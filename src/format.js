import {arrayToString} from './array-to-string.js';
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
 * l - list (arrayToString.js)
 *
 * @param {*} pattern
 * @param {...*} args
 * @returns {string}
 */
export function format(pattern, ...args) {
  if (pattern instanceof Date) {
    pattern = pattern.toISOString();
  } else if (typeof pattern !== 'string') {
    pattern = String(pattern);
  }
  const re = /(%?)(%([sdjvl]))/g;
  const argsQueue = [...args];
  if (argsQueue.length) {
    pattern = pattern.replace(re, function (match, escaped, ptn, flag) {
      let arg = argsQueue.shift();
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
          arg = arrayToString(arg);
          break;
      }
      if (!escaped) {
        return arg;
      }
      argsQueue.unshift(arg);
      return match;
    });
  }
  // has arguments after interpolation
  if (argsQueue.length) {
    pattern += ' ' + argsQueue.join(' ');
  }
  // update escaped %% values
  pattern = pattern.replace(/%{2}/g, '%');
  return '' + pattern;
}
