import {expect} from 'chai';
import {Errorf} from './errorf.js';

describe('Errorf', function () {
  it('interpolates the given arguments', function () {
    const throwable = () => {
      throw new Errorf(
        'It requires one of %l, but %v given.',
        [true, false, 'y', 'n'],
        new Map(),
      );
    };
    expect(throwable).to.throw(
      'It requires one of true, false, "y", "n", but Map given.',
    );
  });
});
