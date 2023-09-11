import {format} from './format.js';

/**
 * Errorf.
 */
export class Errorf extends Error {
  /**
   * Constructor.
   *
   * @param {string} pattern
   * @param {any} args
   */
  constructor(pattern, ...args) {
    super(format(pattern, ...args));
  }
}
