import {expect} from 'chai';
import {format} from './format.js';

describe('format', function () {
  describe('pattern', function () {
    it('uses the given pattern of a string as is', function () {
      const res = format('foo');
      expect(res).to.be.eq('foo');
    });

    it('uses the given pattern of an empty string as is', function () {
      const res = format('');
      expect(res).to.be.eq('');
    });

    it('converts the given pattern of a number to a string', function () {
      const res = format(10);
      expect(res).to.be.eq('10');
    });

    it('converts the given pattern of zero to a string', function () {
      const res = format(0);
      expect(res).to.be.eq('0');
    });

    it('converts the given pattern of NaN to a string', function () {
      const res = format(NaN);
      expect(res).to.be.eq('NaN');
    });

    it('converts the given pattern of Infinity to a string', function () {
      const res = format(Infinity);
      expect(res).to.be.eq('Infinity');
    });

    it('converts the given pattern of true to a string', function () {
      const res = format(true);
      expect(res).to.be.eq('true');
    });

    it('converts the given pattern of false to a string', function () {
      const res = format(false);
      expect(res).to.be.eq('false');
    });

    it('converts the given pattern of an array to a string', function () {
      const res = format([1, 2, 3]);
      expect(res).to.be.eq('1,2,3');
    });

    it('converts the given pattern of an empty array to a string', function () {
      const res = format([]);
      expect(res).to.be.eq('');
    });

    it('converts the given pattern of a key-value object to a string', function () {
      const res = format({foo: 'bar'});
      expect(res).to.be.eq('[object Object]');
    });

    it('converts the given pattern of an object without keys to a string', function () {
      const res = format({});
      expect(res).to.be.eq('[object Object]');
    });

    it('converts the given pattern of a date instance to a string', function () {
      const date = new Date();
      const res = format(date);
      expect(res).to.be.eq(date.toISOString());
    });

    it('converts the given pattern of a map instance to a string', function () {
      const res = format(new Map());
      expect(res).to.be.eq('[object Map]');
    });

    it('converts the given pattern of a class instance to a string', function () {
      class MyClass {}
      const res = format(MyClass);
      expect(res).to.be.eq('class MyClass {}');
    });

    it('converts the given pattern of a function to a string', function () {
      const res = format(function () {});
      expect(res).to.be.eq('function () {}');
    });

    it('converts the given pattern of an anonymous function to a string', function () {
      const res = format(() => undefined);
      expect(res).to.be.eq('() => undefined');
    });

    it('converts the given pattern of a named function to a string', function () {
      function foo() {}
      const res = format(foo);
      expect(res).to.be.eq('function foo() {}');
    });

    it('converts the given pattern of an anonymous class to a string', function () {
      const res = format(class {});
      expect(res).to.be.eq('class {}');
    });

    it('converts the given pattern of a named class to a string', function () {
      class MyClass {}
      const res = format(MyClass);
      expect(res).to.be.eq('class MyClass {}');
    });

    it('converts the given pattern of a class constructor to a string', function () {
      class MyClass {}
      const res = format(MyClass.constructor);
      expect(res).to.be.eq('function Function() { [native code] }');
    });

    it('converts the given pattern of a symbol to a string', function () {
      const res = format('%s', Symbol());
      expect(res).to.be.eq('Symbol()');
    });

    it('converts the given pattern of a named symbol to a string', function () {
      const res = format('%s', Symbol('foo'));
      expect(res).to.be.eq('Symbol(foo)');
    });

    it('converts undefined pattern to a string', function () {
      const res = format(undefined);
      expect(res).to.be.eq('undefined');
    });

    it('converts null pattern to a string', function () {
      const res = format(null);
      expect(res).to.be.eq('null');
    });
  });

  describe('%s', function () {
    it('returns a string representation of the non-pattern string', function () {
      const res = format('foo');
      expect(res).to.be.eq('foo');
    });

    it('returns a string representation of the escaped pattern', function () {
      const res = format('%%s', 'foo');
      expect(res).to.be.eq('%s foo');
    });

    it('returns a string representation of the multiple strings', function () {
      const res = format('%s:%s', 'foo', 'bar');
      expect(res).to.be.eq('foo:bar');
    });

    it('returns a string representation of the given string', function () {
      const res = format('%s', 'foo');
      expect(res).to.be.eq('foo');
    });

    it('returns a string representation of the given empty string', function () {
      const res = format('%s', '');
      expect(res).to.be.eq('');
    });

    it('returns a string representation of the given number', function () {
      const res = format('%s', 10);
      expect(res).to.be.eq('10');
    });

    it('returns a string representation of the given zero', function () {
      const res = format('%s', 0);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given NaN', function () {
      const res = format('%s', NaN);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given Infinity', function () {
      const res = format('%s', Infinity);
      expect(res).to.be.eq('Infinity');
    });

    it('returns a string representation of the given true', function () {
      const res = format('%s', true);
      expect(res).to.be.eq('true');
    });

    it('returns a string representation of the given false', function () {
      const res = format('%s', false);
      expect(res).to.be.eq('false');
    });

    it('returns a string representation of the given array', function () {
      const res = format('%s', [1, 2, 3]);
      expect(res).to.be.eq('1,2,3');
    });

    it('returns a string representation of the given empty array', function () {
      const res = format('%s', []);
      expect(res).to.be.eq('');
    });

    it('returns a string representation of the given key-value object', function () {
      const res = format('%s', {foo: 'bar'});
      expect(res).to.be.eq('[object Object]');
    });

    it('returns a string representation of the given object without keys', function () {
      const res = format('%s', {});
      expect(res).to.be.eq('[object Object]');
    });

    it('returns a string representation of the given date instance', function () {
      const date = new Date();
      const res = format('%s', date);
      expect(res).to.be.eq(date.toString());
    });

    it('returns a string representation of the given map instance', function () {
      const res = format('%s', new Map());
      expect(res).to.be.eq('[object Map]');
    });

    it('returns a string representation of the given class instance', function () {
      class MyClass {}
      const res = format('%s', new MyClass());
      expect(res).to.be.eq('[object Object]');
    });

    it('returns a string representation of the given function', function () {
      const res = format('%s', function () {});
      expect(res).to.be.eq('function () {}');
    });

    it('returns a string representation of the given anonymous function', function () {
      const res = format('%s', () => undefined);
      expect(res).to.be.eq('() => undefined');
    });

    it('returns a string representation of the given named function', function () {
      function foo() {}
      const res = format('%s', foo);
      expect(res).to.be.eq('function foo() {}');
    });

    it('returns a string representation of the given anonymous class', function () {
      const res = format('%s', class {});
      expect(res).to.be.eq('class {}');
    });

    it('returns a string representation of the given named class', function () {
      class MyClass {}
      const res = format('%s', MyClass);
      expect(res).to.be.eq('class MyClass {}');
    });

    it('returns a string representation of the given class constructor', function () {
      class MyClass {}
      const res = format('%s', MyClass.constructor);
      expect(res).to.be.eq('function Function() { [native code] }');
    });

    it('returns a string representation of the given symbol', function () {
      const res = format('%s', Symbol());
      expect(res).to.be.eq('Symbol()');
    });

    it('returns a string representation of the given named symbol', function () {
      const res = format('%s', Symbol('foo'));
      expect(res).to.be.eq('Symbol(foo)');
    });

    it('returns a string representation of the given undefined', function () {
      const res = format('%s', undefined);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given null', function () {
      const res = format('%s', null);
      expect(res).to.be.eq('null');
    });
  });

  describe('%d', function () {
    it('returns a string representation of the given string', function () {
      const res = format('%d', 'foo');
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given empty string', function () {
      const res = format('%d', '');
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given number', function () {
      const res = format('%d', 10);
      expect(res).to.be.eq('10');
    });

    it('returns a string representation of the given zero', function () {
      const res = format('%d', 0);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given NaN', function () {
      const res = format('%d', NaN);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given Infinity', function () {
      const res = format('%d', Infinity);
      expect(res).to.be.eq('Infinity');
    });

    it('returns a string representation of the given true', function () {
      const res = format('%d', true);
      expect(res).to.be.eq('1');
    });

    it('returns a string representation of the given false', function () {
      const res = format('%d', false);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given array', function () {
      const res = format('%d', [1, 2, 3]);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given empty array', function () {
      const res = format('%d', []);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given key-value object', function () {
      const res = format('%d', {foo: 'bar'});
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given object without keys', function () {
      const res = format('%d', {});
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given date instance', function () {
      const date = new Date();
      const res = format('%d', date);
      expect(res).to.be.eq(String(date.getTime()));
    });

    it('returns a string representation of the given map instance', function () {
      const res = format('%d', new Map());
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given class instance', function () {
      class MyClass {}
      const res = format('%d', new MyClass());
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given function', function () {
      const res = format('%d', function () {});
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given anonymous function', function () {
      const res = format('%d', () => undefined);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given named function', function () {
      function foo() {}
      const res = format('%d', foo);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given anonymous class', function () {
      const res = format('%d', class {});
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given named class', function () {
      class MyClass {}
      const res = format('%d', MyClass);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given class constructor', function () {
      class MyClass {}
      const res = format('%d', MyClass.constructor);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given undefined', function () {
      const res = format('%d', undefined);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given null', function () {
      const res = format('%d', null);
      expect(res).to.be.eq('0');
    });
  });

  describe('%j', function () {
    it('returns a string representation of the given string', function () {
      const res = format('%j', 'foo');
      expect(res).to.be.eq('"foo"');
    });

    it('returns a string representation of the given empty string', function () {
      const res = format('%j', '');
      expect(res).to.be.eq('""');
    });

    it('returns a string representation of the given number', function () {
      const res = format('%j', 10);
      expect(res).to.be.eq('10');
    });

    it('returns a string representation of the given zero', function () {
      const res = format('%j', 0);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given NaN', function () {
      const res = format('%j', NaN);
      expect(res).to.be.eq('null');
    });

    it('returns a string representation of the given Infinity', function () {
      const res = format('%j', Infinity);
      expect(res).to.be.eq('null');
    });

    it('returns a string representation of the given true', function () {
      const res = format('%j', true);
      expect(res).to.be.eq('true');
    });

    it('returns a string representation of the given false', function () {
      const res = format('%j', false);
      expect(res).to.be.eq('false');
    });

    it('returns a string representation of the given array', function () {
      const res = format('%j', [1, 2, 3]);
      expect(res).to.be.eq('[1,2,3]');
    });

    it('returns a string representation of the given empty array', function () {
      const res = format('%j', []);
      expect(res).to.be.eq('[]');
    });

    it('returns a string representation of the given key-value object', function () {
      const res = format('%j', {foo: 'bar'});
      expect(res).to.be.eq('{"foo":"bar"}');
    });

    it('returns a string representation of the given object without keys', function () {
      const res = format('%j', {});
      expect(res).to.be.eq('{}');
    });

    it('returns a string representation of the given date instance', function () {
      const date = new Date();
      const res = format('%j', date);
      expect(res).to.be.eq(`"${date.toISOString()}"`);
    });

    it('returns a string representation of the given map instance', function () {
      const res = format('%j', new Map());
      expect(res).to.be.eq('{}');
    });

    it('returns a string representation of the given class instance', function () {
      class MyClass {}
      const res = format('%j', new MyClass());
      expect(res).to.be.eq('{}');
    });

    it('returns a string representation of the given function', function () {
      const res = format('%j', function () {});
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given anonymous function', function () {
      const res = format('%j', () => undefined);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given named function', function () {
      function foo() {}
      const res = format('%j', foo);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given anonymous class', function () {
      const res = format('%j', class {});
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given named class', function () {
      class MyClass {}
      const res = format('%j', MyClass);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given class constructor', function () {
      class MyClass {}
      const res = format('%j', MyClass.constructor);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given symbol', function () {
      const res = format('%j', Symbol());
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given named symbol', function () {
      const res = format('%j', Symbol('foo'));
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given undefined', function () {
      const res = format('%j', undefined);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given null', function () {
      const res = format('%j', null);
      expect(res).to.be.eq('null');
    });
  });

  describe('%v', function () {
    it('returns a string representation of the given string', function () {
      const res = format('%v', 'foo');
      expect(res).to.be.eq('"foo"');
    });

    it('returns a string representation of the given empty string', function () {
      const res = format('%v', '');
      expect(res).to.be.eq('""');
    });

    it('returns a string representation of the given number', function () {
      const res = format('%v', 10);
      expect(res).to.be.eq('10');
    });

    it('returns a string representation of the given zero', function () {
      const res = format('%v', 0);
      expect(res).to.be.eq('0');
    });

    it('returns a string representation of the given NaN', function () {
      const res = format('%v', NaN);
      expect(res).to.be.eq('NaN');
    });

    it('returns a string representation of the given Infinity', function () {
      const res = format('%v', Infinity);
      expect(res).to.be.eq('Infinity');
    });

    it('returns a string representation of the given true', function () {
      const res = format('%v', true);
      expect(res).to.be.eq('true');
    });

    it('returns a string representation of the given false', function () {
      const res = format('%v', false);
      expect(res).to.be.eq('false');
    });

    it('returns a string representation of the given array', function () {
      const res = format('%v', [1, 2, 3]);
      expect(res).to.be.eq('Array');
    });

    it('returns a string representation of the given empty array', function () {
      const res = format('%v', []);
      expect(res).to.be.eq('Array');
    });

    it('returns a string representation of the given key-value object', function () {
      const res = format('%v', {foo: 'bar'});
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given object without keys', function () {
      const res = format('%v', {});
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given object without prototype', function () {
      const res = format('%v', Object.create(null));
      expect(res).to.be.eq('Object');
    });

    it('returns a string representation of the given date instance', function () {
      const res = format('%v', new Date());
      expect(res).to.be.eq('Date');
    });

    it('returns a string representation of the given map instance', function () {
      const res = format('%v', new Map());
      expect(res).to.be.eq('Map');
    });

    it('returns a string representation of the given class instance', function () {
      class MyClass {}
      const res = format('%v', new MyClass());
      expect(res).to.be.eq('MyClass');
    });

    it('returns a string representation of the given function', function () {
      const res = format('%v', function () {});
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given anonymous function', function () {
      const res = format('%v', () => undefined);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given named function', function () {
      function foo() {}
      const res = format('%v', foo);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given anonymous class', function () {
      const res = format('%v', class {});
      expect(res).to.be.eq('Class');
    });

    it('returns a string representation of the given named class', function () {
      class MyClass {}
      const res = format('%v', MyClass);
      expect(res).to.be.eq('MyClass');
    });

    it('returns a string representation of the given class constructor', function () {
      class MyClass {}
      const res = format('%v', MyClass.constructor);
      expect(res).to.be.eq('Function');
    });

    it('returns a string representation of the given symbol', function () {
      const res = format('%v', Symbol());
      expect(res).to.be.eq('Symbol');
    });

    it('returns a string representation of the given named symbol', function () {
      const res = format('%v', Symbol('foo'));
      expect(res).to.be.eq('Symbol');
    });

    it('returns a string representation of the given undefined', function () {
      const res = format('%v', undefined);
      expect(res).to.be.eq('undefined');
    });

    it('returns a string representation of the given null', function () {
      const res = format('%v', null);
      expect(res).to.be.eq('null');
    });
  });

  describe('%l', function () {
    describe('non-array values', function () {
      it('returns a string representation of the given string', function () {
        const res = format('%l', 'foo');
        expect(res).to.be.eq('"foo"');
      });

      it('returns a string representation of the given empty string', function () {
        const res = format('%l', '');
        expect(res).to.be.eq('""');
      });

      it('returns a string representation of the given number', function () {
        const res = format('%l', 10);
        expect(res).to.be.eq('10');
      });

      it('returns a string representation of the given zero', function () {
        const res = format('%l', 0);
        expect(res).to.be.eq('0');
      });

      it('returns a string representation of the given NaN', function () {
        const res = format('%l', NaN);
        expect(res).to.be.eq('NaN');
      });

      it('returns a string representation of the given Infinity', function () {
        const res = format('%l', Infinity);
        expect(res).to.be.eq('Infinity');
      });

      it('returns a string representation of the given true', function () {
        const res = format('%l', true);
        expect(res).to.be.eq('true');
      });

      it('returns a string representation of the given false', function () {
        const res = format('%l', false);
        expect(res).to.be.eq('false');
      });

      it('returns a string representation of the given key-value object', function () {
        const res = format('%l', {foo: 'bar'});
        expect(res).to.be.eq('Object');
      });

      it('returns a string representation of the given object without keys', function () {
        const res = format('%l', {});
        expect(res).to.be.eq('Object');
      });

      it('returns a string representation of the given object without prototype', function () {
        const res = format('%l', Object.create(null));
        expect(res).to.be.eq('Object');
      });

      it('returns a string representation of the given date instance', function () {
        const res = format('%l', new Date());
        expect(res).to.be.eq('Date');
      });

      it('returns a string representation of the given map instance', function () {
        const res = format('%l', new Map());
        expect(res).to.be.eq('Map');
      });

      it('returns a string representation of the given class instance', function () {
        class MyClass {}
        const res = format('%l', new MyClass());
        expect(res).to.be.eq('MyClass');
      });

      it('returns a string representation of the given function', function () {
        const res = format('%l', function () {});
        expect(res).to.be.eq('Function');
      });

      it('returns a string representation of the given anonymous function', function () {
        const res = format('%l', () => undefined);
        expect(res).to.be.eq('Function');
      });

      it('returns a string representation of the given named function', function () {
        function foo() {}
        const res = format('%l', foo);
        expect(res).to.be.eq('Function');
      });

      it('returns a string representation of the given anonymous class', function () {
        const res = format('%l', class {});
        expect(res).to.be.eq('Class');
      });

      it('returns a string representation of the given named class', function () {
        class MyClass {}
        const res = format('%l', MyClass);
        expect(res).to.be.eq('MyClass');
      });

      it('returns a string representation of the given class constructor', function () {
        class MyClass {}
        const res = format('%l', MyClass.constructor);
        expect(res).to.be.eq('Function');
      });

      it('returns a string representation of the given symbol', function () {
        const res = format('%l', Symbol());
        expect(res).to.be.eq('Symbol');
      });

      it('returns a string representation of the given named symbol', function () {
        const res = format('%l', Symbol('foo'));
        expect(res).to.be.eq('Symbol');
      });

      it('returns a string representation of the given undefined', function () {
        const res = format('%l', undefined);
        expect(res).to.be.eq('undefined');
      });

      it('returns a string representation of the given null', function () {
        const res = format('%l', null);
        expect(res).to.be.eq('null');
      });
    });

    describe('array values', function () {
      it('adds a separator between the given elements', function () {
        const res = format('%l', ['foo', 1, true]);
        expect(res).to.be.eq('"foo", 1, true');
      });

      it('returns a string representation of the given empty array', function () {
        const res = format('%l', []);
        expect(res).to.be.eq('Array');
      });

      it('returns an element representation of the given string', function () {
        const res = format('%l', ['foo']);
        expect(res).to.be.eq('"foo"');
      });

      it('returns an element representation of the given empty string', function () {
        const res = format('%l', ['']);
        expect(res).to.be.eq('""');
      });

      it('returns an element representation of the given number', function () {
        const res = format('%l', [10]);
        expect(res).to.be.eq('10');
      });

      it('returns an element representation of the given zero', function () {
        const res = format('%l', [0]);
        expect(res).to.be.eq('0');
      });

      it('returns an element representation of the given NaN', function () {
        const res = format('%l', [NaN]);
        expect(res).to.be.eq('NaN');
      });

      it('returns an element representation of the given Infinity', function () {
        const res = format('%l', [Infinity]);
        expect(res).to.be.eq('Infinity');
      });

      it('returns an element representation of the given true', function () {
        const res = format('%l', [true]);
        expect(res).to.be.eq('true');
      });

      it('returns an element representation of the given false', function () {
        const res = format('%l', [false]);
        expect(res).to.be.eq('false');
      });

      it('returns an element representation of the given key-value object', function () {
        const res = format('%l', [{foo: 'bar'}]);
        expect(res).to.be.eq('Object');
      });

      it('returns an element representation of the given object without keys', function () {
        const res = format('%l', [{}]);
        expect(res).to.be.eq('Object');
      });

      it('returns an element representation of the given object without prototype', function () {
        const res = format('%l', [Object.create(null)]);
        expect(res).to.be.eq('Object');
      });

      it('returns an element representation of the given date instance', function () {
        const res = format('%l', [new Date()]);
        expect(res).to.be.eq('Date');
      });

      it('returns an element representation of the given map instance', function () {
        const res = format('%l', [new Map()]);
        expect(res).to.be.eq('Map');
      });

      it('returns an element representation of the given class instance', function () {
        class MyClass {}
        const res = format('%l', [new MyClass()]);
        expect(res).to.be.eq('MyClass');
      });

      it('returns an element representation of the given function', function () {
        const res = format('%l', [function () {}]);
        expect(res).to.be.eq('Function');
      });

      it('returns an element representation of the given anonymous function', function () {
        const res = format('%l', [() => undefined]);
        expect(res).to.be.eq('Function');
      });

      it('returns an element representation of the given named function', function () {
        function foo() {}
        const res = format('%l', [foo]);
        expect(res).to.be.eq('Function');
      });

      it('returns an element representation of the given anonymous class', function () {
        const res = format('%l', [class {}]);
        expect(res).to.be.eq('Class');
      });

      it('returns an element representation of the given named class', function () {
        class MyClass {}
        const res = format('%l', [MyClass]);
        expect(res).to.be.eq('MyClass');
      });

      it('returns an element representation of the given class constructor', function () {
        class MyClass {}
        const res = format('%l', [MyClass.constructor]);
        expect(res).to.be.eq('Function');
      });

      it('returns an element representation of the given symbol', function () {
        const res = format('%l', [Symbol()]);
        expect(res).to.be.eq('Symbol');
      });

      it('returns an element representation of the given named symbol', function () {
        const res = format('%l', [Symbol('foo')]);
        expect(res).to.be.eq('Symbol');
      });

      it('returns an element representation of the given undefined', function () {
        const res = format('%l', [undefined]);
        expect(res).to.be.eq('undefined');
      });

      it('returns an element representation of the given null', function () {
        const res = format('%l', [null]);
        expect(res).to.be.eq('null');
      });
    });
  });
});
