/**
 * Errorf.
 */
declare class Errorf extends Error {
  /**
   * Constructor.
   *
   * @param pattern
   * @param args
   */
  constructor(pattern: string, ...args: any[]);
}
