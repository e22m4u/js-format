import {format} from './format.js';

/**
 * Errorf.
 */
export class Errorf extends Error {
  /**
   * Constructor.
   *
   * @param {string|undefined} pattern
   * @param {*} args
   */
  constructor(pattern = undefined, ...args) {
    const message = pattern != null ? format(pattern, ...args) : undefined;
    super(message);
  }
}
