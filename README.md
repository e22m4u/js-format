## @e22m4u/js-format

*English | [Русский](README-ru.md)*

The string interpolation utility for JavaScript.

- standard specifiers `%s`, `%d`, and `%j` (see [`util.format`](https://nodejs.org/api/util.html#utilformatformat-args))
- `%v` outputs primitive value or constructor name
- `%l` outputs an array as a comma-separated list `"foo", 10, true`

Additionally:
- built-in `Errorf` class with error message interpolation

## Motivation

Аn error message may need to interpolate certain values
in the message string. In this case, a problem is accurately
determine the type of the output value, because the standard
specifier `%s` treats strings, numbers, and other types
in the same way.

```js
import {format} from 'util';

console.log(format(`A boolean required, but %s given.`, 8));
console.log(format(`A boolean required, but %s given.`, '8'));
// > A boolean required, but 8 given.
// > A boolean required, but 8 given.
```

In the example above, the string `'8'` and the number `8`
are output identically. A similar problem occurs with objects.

```js
import {format} from 'util';

console.log(format(`A boolean required, but %s given.`, new Date()));
console.log(format(`A boolean required, but %s given.`, 'Oct 18 2024 13:04:30'));
// > A boolean required, but Oct 18 2024 13:04:30 given.
// > A boolean required, but Oct 18 2024 13:04:30 given.
```

The module extends standard specifiers with additional
`%v` and `%l`, which wrap strings in quotes and output
a constructor name for objects.

```js
// import {format} from 'util';
import {format} from '@e22m4u/js-format'; // replace "util" package

console.log(format(`A boolean required, but %v given.`, 8));
console.log(format(`A boolean required, but %v given.`, '8'));
// > A boolean required, but 8 given.
// > A boolean required, but "8" given.

console.log(format(`A boolean required, but %v given.`, new Date()));
console.log(format(`A boolean required, but %v given.`, 'Oct 18 2024 13:04:30'));
// > A boolean required, but Date (instance) given.
// > A boolean required, but "Oct 18 2024 13:04:30" given.
```

For more details about the new specifiers,
see the [Specifiers](#Specifiers) section.

## Installation

```bash
npm install @e22m4u/js-format
```

The module supports ESM and CommonJS standards.

*ESM*

```js
import {format} from '@e22m4u/js-format';
```

*CommonJS*

```js
const {format} = require('@e22m4u/js-format');
```

## Specifiers

The `format` method returns a formatted string using
the first argument as a printf-like template which can
contain zero or more format specifiers. Each specifier
is replaced with the converted value from the corresponding
argument.

| specifier | description                              |
|-----------|------------------------------------------|
| `%s`      | `String` will be used to convert a value |
| `%d`      | `Number` will be used to convert a value |
| `%j`      | JSON representation                      |
| `%v`      | see below                                |
| `%l`      | see below                                |

### %v

Strings are wrapped in quotes, other primitives are converted
to strings, and for more complex types the constructor name
is output.

```js
format('It is %v', 'foo');        // It is "foo"
format('It is %v', '');           // It is ""
format('It is %v', 10);           // It is 10
format('It is %v', 0);            // It is 0
format('It is %v', NaN);          // It is NaN
format('It is %v', Infinity);     // It is Infinity
format('It is %v', true);         // It is true
format('It is %v', false);        // It is false
format('It is %v', {foo: 'bar'}); // It is Object
format('It is %v', new Date());   // It is Date
format('It is %v', new Map());    // It is Map
format('It is %v', () => 10);     // It is Function
format('It is %v', undefined);    // It is undefined
format('It is %v', null);         // It is null
```

The `%v` specifier was designed to output values in error messages
when it's important to have an idea of their types. However, outputting
the contents of an object may be excessive for such a task. For this reason,
objects are converted to the constructor name, which allows for a relatively
accurate determination of the output value's type.

```js
class MyClass {}

format('It is %v', 'MyClass');     // It is "MyClass"
format('It is %v', MyClass);       // It is MyClass
format('It is %v', new MyClass()); // It is MyClass (instance)
```

### %l

Outputs array elements separated by commas.

```js
format('An array of %l', ['foo', 10, true]);
// An array of "foo", 10, true
```

Array elements are converted to strings following the logic
of the `%v` specifier.

## `Errorf` class

The class constructor passes arguments to the `format`
function to form an error message.

Example:

```js
import {Errorf} from '@e22m4u/js-format';

throw new Errorf(
  'It requires one of %l, but %v given.',
  [true, false, 'y', 'n'],
  new Map(),
);
// Error: It requires one of true, false, "y", "n", but Map given.
```

## Tests

```bash
npm run test
```

## License

MIT
