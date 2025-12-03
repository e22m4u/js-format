import {expect} from 'chai';
import {valueToString} from './value-to-string.js';

describe('valueToString', function () {
  it('returns a string representation of the given string', function () {
    const res = valueToString('foo');
    expect(res).to.be.eq('"foo"');
  });

  it('returns a string representation of the given empty string', function () {
    const res = valueToString('');
    expect(res).to.be.eq('""');
  });

  it('returns a string representation of the given number', function () {
    const res = valueToString(10);
    expect(res).to.be.eq('10');
  });

  it('returns a string representation of the given zero', function () {
    const res = valueToString(0);
    expect(res).to.be.eq('0');
  });

  it('returns a string representation of the given NaN', function () {
    const res = valueToString(NaN);
    expect(res).to.be.eq('NaN');
  });

  it('returns a string representation of the given Infinity', function () {
    const res = valueToString(Infinity);
    expect(res).to.be.eq('Infinity');
  });

  it('returns a string representation of the given true', function () {
    const res = valueToString(true);
    expect(res).to.be.eq('true');
  });

  it('returns a string representation of the given false', function () {
    const res = valueToString(false);
    expect(res).to.be.eq('false');
  });

  it('returns a string representation of the given array', function () {
    const res = valueToString([1, 2, 3]);
    expect(res).to.be.eq('Array');
  });

  it('returns a string representation of the given empty array', function () {
    const res = valueToString([]);
    expect(res).to.be.eq('Array');
  });

  it('returns a string representation of the given key-value object', function () {
    const res = valueToString({foo: 'bar'});
    expect(res).to.be.eq('Object');
  });

  it('returns a string representation of the given object without keys', function () {
    const res = valueToString({});
    expect(res).to.be.eq('Object');
  });

  it('returns a string representation of the given object without prototype', function () {
    const res = valueToString(Object.create(null));
    expect(res).to.be.eq('Object');
  });

  it('returns a string representation of the given date instance', function () {
    const res = valueToString(new Date());
    expect(res).to.be.eq('Date');
  });

  it('returns a string representation of the given map instance', function () {
    const res = valueToString(new Map());
    expect(res).to.be.eq('Map');
  });

  it('returns a string representation of the given class instance', function () {
    class MyClass {}
    const res = valueToString(new MyClass());
    expect(res).to.be.eq('MyClass (instance)');
  });

  it('returns a string representation of the given function', function () {
    const res = valueToString(function () {});
    expect(res).to.be.eq('Function');
  });

  it('returns a string representation of the given anonymous function', function () {
    const res = valueToString(() => undefined);
    expect(res).to.be.eq('Function');
  });

  it('returns a string representation of the given named function', function () {
    function foo() {}
    const res = valueToString(foo);
    expect(res).to.be.eq('Function');
  });

  it('returns a string representation of the given anonymous class', function () {
    const res = valueToString(class {});
    expect(res).to.be.eq('Class');
  });

  it('returns a string representation of the given named class', function () {
    class MyClass {}
    const res = valueToString(MyClass);
    expect(res).to.be.eq('MyClass');
  });

  it('returns a string representation of the given class constructor', function () {
    class MyClass {}
    const res = valueToString(MyClass.constructor);
    expect(res).to.be.eq('Function');
  });

  it('returns a string representation of the given symbol', function () {
    const res = valueToString(Symbol());
    expect(res).to.be.eq('Symbol');
  });

  it('returns a string representation of the given named symbol', function () {
    const res = valueToString(Symbol('foo'));
    expect(res).to.be.eq('Symbol');
  });

  it('returns a string representation of the given undefined', function () {
    const res = valueToString(undefined);
    expect(res).to.be.eq('undefined');
  });

  it('returns a string representation of the given null', function () {
    const res = valueToString(null);
    expect(res).to.be.eq('null');
  });
});
