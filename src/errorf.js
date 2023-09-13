import {format} from './format.js';

/**
 * Errorf.
 */
export class Errorf extends Error {
  /**
   * Constructor.
   *
   * @param {string|undefined} pattern
   * @param {any} args
   */
  constructor(pattern = undefined, ...args) {
    const message = pattern != null ? format(pattern, ...args) : undefined;
    super(message);
  }
}
