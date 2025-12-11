import {format} from './format.js';

/**
 * Errorf.
 */
export class Errorf extends Error {
  /**
   * Constructor.
   *
   * @param {string} [pattern]
   * @param {...*} args
   */
  constructor(pattern, ...args) {
    const message = pattern != null ? format(pattern, ...args) : undefined;
    super(message);
  }
}
