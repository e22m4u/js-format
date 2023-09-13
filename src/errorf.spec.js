import {expect} from 'chai';
import {Errorf} from './errorf.js';

describe('Errorf', function () {
  it('does not require a message argument', function () {
    const error = new Errorf();
    expect(error).to.be.instanceof(Error);
  });

  it('interpolates the given message', function () {
    const error = new Errorf(
      'It requires one of %l, but %v given.',
      [true, false, 'y', 'n'],
      new Map(),
    );
    expect(error.message).to.be.eq(
      'It requires one of true, false, "y", "n", but Map given.',
    );
  });
});
