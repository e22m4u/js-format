import {expect} from 'chai';
import {arrayToString} from './array-to-string.js';

describe('arrayToString', function () {
  describe('non-array values', function () {
    it('returns a string representation of the given string', function () {
      const res = arrayToString('foo');
      expect(res).to.be.eq('"foo"');
    });

    it('returns a string representation of the given empty string', function () {
      const res = arrayToString('');
      expect(res).to.be.eq('""');
    });

    it('returns a string representation of the given number', function () {
      const res = arrayToString(10);
      expect(res).to.be.eq('10');
    });

    it('returns a string representation of the given zero', function () {
      const res = arrayToString(0);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given NaN', function () {
      const res = arrayToString(NaN);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given Infinity', function () {
      const res = arrayToString(Infinity);
      expect(res).to.be.eq('Infinity');
    });

    it('returns a string representation of the given true', function () {
      const res = arrayToString(true);
      expect(res).to.be.eq('true');
    });

    it('returns a string representation of the given false', function () {
      const res = arrayToString(false);
      expect(res).to.be.eq('false');
    });

    it('returns a string representation of the given key-value object', function () {
      const res = arrayToString({foo: 'bar'});
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given object without keys', function () {
      const res = arrayToString({});
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given object without prototype', function () {
      const res = arrayToString(Object.create(null));
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given date instance', function () {
      const res = arrayToString(new Date());
      expect(res).to.be.eq('Date');
    });

    it('returns a string representation of the given map instance', function () {
      const res = arrayToString(new Map());
      expect(res).to.be.eq('Map');
    });

    it('returns a string representation of the given class instance', function () {
      class MyClass {}
      const res = arrayToString(new MyClass());
      expect(res).to.be.eq('MyClass (instance)');
    });

    it('returns a string representation of the given function', function () {
      const res = arrayToString(function () {});
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given anonymous function', function () {
      const res = arrayToString(() => undefined);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given named function', function () {
      function foo() {}
      const res = arrayToString(foo);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given anonymous class', function () {
      const res = arrayToString(class {});
      expect(res).to.be.eq('Class');
    });

    it('returns a string representation of the given named class', function () {
      class MyClass {}
      const res = arrayToString(MyClass);
      expect(res).to.be.eq('MyClass');
    });

    it('returns a string representation of the given class constructor', function () {
      class MyClass {}
      const res = arrayToString(MyClass.constructor);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given symbol', function () {
      const res = arrayToString(Symbol());
      expect(res).to.be.eq('Symbol');
    });

    it('returns a string representation of the given named symbol', function () {
      const res = arrayToString(Symbol('foo'));
      expect(res).to.be.eq('Symbol');
    });

    it('returns a string representation of the given undefined', function () {
      const res = arrayToString(undefined);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given null', function () {
      const res = arrayToString(null);
      expect(res).to.be.eq('null');
    });
  });

  describe('array values', function () {
    it('adds a separator between the given elements', function () {
      const res = arrayToString(['foo', 1, true]);
      expect(res).to.be.eq('"foo", 1, true');
    });

    it('returns a string representation of the given empty array', function () {
      const res = arrayToString([]);
      expect(res).to.be.eq('Array');
    });

    it('returns an element representation of the given string', function () {
      const res = arrayToString(['foo']);
      expect(res).to.be.eq('"foo"');
    });

    it('returns an element representation of the given empty string', function () {
      const res = arrayToString(['']);
      expect(res).to.be.eq('""');
    });

    it('returns an element representation of the given number', function () {
      const res = arrayToString([10]);
      expect(res).to.be.eq('10');
    });

    it('returns an element representation of the given zero', function () {
      const res = arrayToString([0]);
      expect(res).to.be.eq('0');
    });

    it('returns an element representation of the given NaN', function () {
      const res = arrayToString([NaN]);
      expect(res).to.be.eq('NaN');
    });

    it('returns an element representation of the given Infinity', function () {
      const res = arrayToString([Infinity]);
      expect(res).to.be.eq('Infinity');
    });

    it('returns an element representation of the given true', function () {
      const res = arrayToString([true]);
      expect(res).to.be.eq('true');
    });

    it('returns an element representation of the given false', function () {
      const res = arrayToString([false]);
      expect(res).to.be.eq('false');
    });

    it('returns an element representation of the given key-value object', function () {
      const res = arrayToString([{foo: 'bar'}]);
      expect(res).to.be.eq('Object');
    });

    it('returns an element representation of the given object without keys', function () {
      const res = arrayToString([{}]);
      expect(res).to.be.eq('Object');
    });

    it('returns an element representation of the given object without prototype', function () {
      const res = arrayToString([Object.create(null)]);
      expect(res).to.be.eq('Object');
    });

    it('returns an element representation of the given date instance', function () {
      const res = arrayToString([new Date()]);
      expect(res).to.be.eq('Date');
    });

    it('returns an element representation of the given map instance', function () {
      const res = arrayToString([new Map()]);
      expect(res).to.be.eq('Map');
    });

    it('returns an element representation of the given class instance', function () {
      class MyClass {}
      const res = arrayToString([new MyClass()]);
      expect(res).to.be.eq('MyClass (instance)');
    });

    it('returns an element representation of the given function', function () {
      const res = arrayToString([function () {}]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given anonymous function', function () {
      const res = arrayToString([() => undefined]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given named function', function () {
      function foo() {}
      const res = arrayToString([foo]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given anonymous class', function () {
      const res = arrayToString([class {}]);
      expect(res).to.be.eq('Class');
    });

    it('returns an element representation of the given named class', function () {
      class MyClass {}
      const res = arrayToString([MyClass]);
      expect(res).to.be.eq('MyClass');
    });

    it('returns an element representation of the given class constructor', function () {
      class MyClass {}
      const res = arrayToString([MyClass.constructor]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given symbol', function () {
      const res = arrayToString([Symbol()]);
      expect(res).to.be.eq('Symbol');
    });

    it('returns an element representation of the given named symbol', function () {
      const res = arrayToString([Symbol('foo')]);
      expect(res).to.be.eq('Symbol');
    });

    it('returns an element representation of the given undefined', function () {
      const res = arrayToString([undefined]);
      expect(res).to.be.eq('undefined');
    });

    it('returns an element representation of the given null', function () {
      const res = arrayToString([null]);
      expect(res).to.be.eq('null');
    });
  });
});
