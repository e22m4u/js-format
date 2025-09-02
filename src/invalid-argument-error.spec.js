import {expect} from 'chai';
import {Errorf} from './errorf.js';
import {InvalidArgumentError} from './invalid-argument-error.js';

describe('InvalidArgumentError', function () {
  it('should extend Errorf class and should not require arguments', function () {
    const error = new InvalidArgumentError();
    expect(error).to.be.instanceof(Errorf);
  });

  it('should interpolate the given message', function () {
    const error = new InvalidArgumentError(
      'It requires one of %l, but %v given.',
      [true, false, 'y', 'n'],
      new Map(),
    );
    expect(error.message).to.be.eq(
      'It requires one of true, false, "y", "n", but Map given.',
    );
  });
});
