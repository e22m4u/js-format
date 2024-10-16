## @e22m4u/js-format

*[English](README.md) | Русский*

Утилита интерполяции строк для JavaScript.

- стандартные спецификаторы `%s`, `%d` и `%j` (см. [`util.format`](https://nodejs.org/api/util.html#utilformatformat-args))
- `%v` вывод примитивного значения или имени конструктора
- `%l` вывод элементов массива через запятую `"foo", 10, true`

Дополнительно:
- встроенный класс `Errorf` с интерполяцией сообщения об ошибке

## Установка

```bash
npm install @e22m4u/js-format
```

## Примеры

ESM

```js
import {format} from '@e22m4u/js-format';
```

CommonJS

```js
const {format} = require('@e22m4u/js-format');
```

### %v

Строки оборачиваются в кавычки, остальные примитивы приводятся
к строке, а для более сложных типов выводится имя конструктора.

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

Спецификатор `%v` проектировался для вывода значений в сообщениях
об ошибке, когда важно иметь представление об их типах. При этом,
вывод содержимого объекта может быть избыточен для такой задачи.
По этой причине, объекты приводятся к имени конструктора, что
позволяет относительно точно определить тип выводимого значения.

```js
class MyClass {}

format('It is %v', 'MyClass');     // It is "MyClass"
format('It is %v', MyClass);       // It is MyClass
format('It is %v', new MyClass()); // It is MyClass (instance)
```

### %l

Вывод элементов массива через запятую.

```js
format('An array of %l', ['foo', 10, true]);
// An array of "foo", 10, true
```

Элементы массива приводятся к строке по логике спецификатора `%v`

## Errorf

Конструктор класса `Errorf` передает аргументы функции `format`
для формирования сообщения об ошибке.

Пример:

```js
import {Errorf} from '@e22m4u/js-format';

throw new Errorf(
  'It requires one of %l, but %v given.',
  [true, false, 'y', 'n'],
  new Map(),
);
// Error: It requires one of true, false, "y", "n", but Map given.
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
