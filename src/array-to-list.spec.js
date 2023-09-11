import {expect} from 'chai';
import {arrayToList} from './array-to-list.js';

describe('arrayToList', function () {
  describe('non-array values', function () {
    it('returns a string representation of the given string', function () {
      const res = arrayToList('foo');
      expect(res).to.be.eq('"foo"');
    });

    it('returns a string representation of the given empty string', function () {
      const res = arrayToList('');
      expect(res).to.be.eq('""');
    });

    it('returns a string representation of the given number', function () {
      const res = arrayToList(10);
      expect(res).to.be.eq('10');
    });

    it('returns a string representation of the given zero', function () {
      const res = arrayToList(0);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given NaN', function () {
      const res = arrayToList(NaN);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given Infinity', function () {
      const res = arrayToList(Infinity);
      expect(res).to.be.eq('Infinity');
    });

    it('returns a string representation of the given true', function () {
      const res = arrayToList(true);
      expect(res).to.be.eq('true');
    });

    it('returns a string representation of the given false', function () {
      const res = arrayToList(false);
      expect(res).to.be.eq('false');
    });

    it('returns a string representation of the given key-value object', function () {
      const res = arrayToList({foo: 'bar'});
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given object without keys', function () {
      const res = arrayToList({});
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given object without prototype', function () {
      const res = arrayToList(Object.create(null));
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given date instance', function () {
      const res = arrayToList(new Date());
      expect(res).to.be.eq('Date');
    });

    it('returns a string representation of the given map instance', function () {
      const res = arrayToList(new Map());
      expect(res).to.be.eq('Map');
    });

    it('returns a string representation of the given class instance', function () {
      class MyClass {}
      const res = arrayToList(new MyClass());
      expect(res).to.be.eq('MyClass');
    });

    it('returns a string representation of the given function', function () {
      const res = arrayToList(function () {});
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given shorthand function', function () {
      const res = arrayToList(() => undefined);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given named function', function () {
      function foo() {}
      const res = arrayToList(foo);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given class', function () {
      class MyClass {}
      const res = arrayToList(MyClass);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given class constructor', function () {
      class MyClass {}
      const res = arrayToList(MyClass.constructor);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given symbol', function () {
      const res = arrayToList(Symbol());
      expect(res).to.be.eq('Symbol');
    });

    it('returns a string representation of the given named symbol', function () {
      const res = arrayToList(Symbol('foo'));
      expect(res).to.be.eq('Symbol');
    });

    it('returns a string representation of the given undefined', function () {
      const res = arrayToList(undefined);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given null', function () {
      const res = arrayToList(null);
      expect(res).to.be.eq('null');
    });
  });

  describe('array values', function () {
    it('adds a separator between the given elements', function () {
      const res = arrayToList(['foo', 1, true]);
      expect(res).to.be.eq('"foo", 1, true');
    });

    it('returns a string representation of the given empty array', function () {
      const res = arrayToList([]);
      expect(res).to.be.eq('Array');
    });

    it('returns an element representation of the given string', function () {
      const res = arrayToList(['foo']);
      expect(res).to.be.eq('"foo"');
    });

    it('returns an element representation of the given empty string', function () {
      const res = arrayToList(['']);
      expect(res).to.be.eq('""');
    });

    it('returns an element representation of the given number', function () {
      const res = arrayToList([10]);
      expect(res).to.be.eq('10');
    });

    it('returns an element representation of the given zero', function () {
      const res = arrayToList([0]);
      expect(res).to.be.eq('0');
    });

    it('returns an element representation of the given NaN', function () {
      const res = arrayToList([NaN]);
      expect(res).to.be.eq('NaN');
    });

    it('returns an element representation of the given Infinity', function () {
      const res = arrayToList([Infinity]);
      expect(res).to.be.eq('Infinity');
    });

    it('returns an element representation of the given true', function () {
      const res = arrayToList([true]);
      expect(res).to.be.eq('true');
    });

    it('returns an element representation of the given false', function () {
      const res = arrayToList([false]);
      expect(res).to.be.eq('false');
    });

    it('returns an element representation of the given key-value object', function () {
      const res = arrayToList([{foo: 'bar'}]);
      expect(res).to.be.eq('Object');
    });

    it('returns an element representation of the given object without keys', function () {
      const res = arrayToList([{}]);
      expect(res).to.be.eq('Object');
    });

    it('returns an element representation of the given object without prototype', function () {
      const res = arrayToList([Object.create(null)]);
      expect(res).to.be.eq('Object');
    });

    it('returns an element representation of the given date instance', function () {
      const res = arrayToList([new Date()]);
      expect(res).to.be.eq('Date');
    });

    it('returns an element representation of the given map instance', function () {
      const res = arrayToList([new Map()]);
      expect(res).to.be.eq('Map');
    });

    it('returns an element representation of the given class instance', function () {
      class MyClass {}
      const res = arrayToList([new MyClass()]);
      expect(res).to.be.eq('MyClass');
    });

    it('returns an element representation of the given function', function () {
      const res = arrayToList([function () {}]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given shorthand function', function () {
      const res = arrayToList([() => undefined]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given named function', function () {
      function foo() {}
      const res = arrayToList([foo]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given class', function () {
      class MyClass {}
      const res = arrayToList([MyClass]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given class constructor', function () {
      class MyClass {}
      const res = arrayToList([MyClass.constructor]);
      expect(res).to.be.eq('Function');
    });

    it('returns an element representation of the given symbol', function () {
      const res = arrayToList([Symbol()]);
      expect(res).to.be.eq('Symbol');
    });

    it('returns an element representation of the given named symbol', function () {
      const res = arrayToList([Symbol('foo')]);
      expect(res).to.be.eq('Symbol');
    });

    it('returns an element representation of the given undefined', function () {
      const res = arrayToList([undefined]);
      expect(res).to.be.eq('undefined');
    });

    it('returns an element representation of the given null', function () {
      const res = arrayToList([null]);
      expect(res).to.be.eq('null');
    });
  });
});
