## @e22m4u/js-format

Утилита интерполяции строк для JavaScript.

- стандартные спецификаторы `%s`, `%d` и `%j` (см. [`util.format`](https://nodejs.org/api/util.html#utilformatformat-args))
- `%v` вывод примитивного значения или имени конструктора
- `%l` вывод элементов массива через запятую `"foo", 10, true`

Дополнительно:
- встроенный класс `Errorf` с интерполяцией сообщения об ошибке

## Мотивация

При выводе сообщения об ошибке может возникнуть потребность
включения некоторых значений в строку сообщения. В этом случае
возникает проблема, когда невозможно точно определить тип
выводимого значения, так как стандартный спецификатор `%s`
одинаково обрабатывает строки, числа и другие типы.

```js
import {format} from 'util';

console.log(format('Boolean is required, but %s was given.', 8));
console.log(format('Boolean is required, but %s was given.', '8'));
// > Boolean is required, but 8 was given.
// > Boolean is required, but 8 was given.
```

В примере выше строка `'8'` и число `8` выводятся одинаково.
Похожая проблема возникает при выводе объектов.

```js
import {format} from 'util';

console.log(format('Boolean is required, but %s was given.', new Date()));
console.log(format('Boolean is required, but %s was given.', 'Oct 18 2024 13:04:30'));
// > Boolean is required, but Oct 18 2024 13:04:30 was given.
// > Boolean is required, but Oct 18 2024 13:04:30 was given.
```

Данный модуль расширяет стандартные спецификаторы дополнительным
`%v` и `%l`, которые оборачивают строки в кавычки, а для объектов
выводят имя конструктора.

```js
// import {format} from 'util';
import {format} from '@e22m4u/js-format'; // заменяем пакет "util"

console.log(format('Boolean is required, but %v was given.', 8));
console.log(format('Boolean is required, but %v was given.', '8'));
// > Boolean is required, but 8 was given.
// > Boolean is required, but "8" was given.

console.log(format('Boolean is required, but %v was given.', new Date()));
console.log(format('Boolean is required, but %v was given.', 'Oct 18 2024 13:04:30'));
// > Boolean is required, but Date was given.
// > Boolean is required, but "Oct 18 2024 13:04:30" was given.
```

Подробнее о новых спецификаторах см. в разделе
[Спецификаторы](#Спецификаторы).

## Установка

```bash
npm install @e22m4u/js-format
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {format} from '@e22m4u/js-format';
```

*CommonJS*

```js
const {format} = require('@e22m4u/js-format');
```

## Спецификаторы

Метод `format` возвращает отформатированную строку, используя
первый аргумент как *printf*-подобный шаблон, который может
содержать ноль или более спецификаторов. Каждый спецификатор
заменяется преобразованным значением из соответствующего
аргумента.

| specifier | description                                  |
|-----------|----------------------------------------------|
| `%s`      | использует `String` для конвертации значения |
| `%d`      | использует `Number` для конвертации значения |
| `%j`      | представление значения в виде JSON           |
| `%v`      | см. ниже                                     |
| `%l`      | см. ниже                                     |

### %v

Строки оборачиваются в кавычки, остальные примитивы приводятся
к строке, а для более сложных типов выводится имя конструктора.

```js
format('Value is %v', 'foo');        // Value is "foo"
format('Value is %v', '');           // Value is ""
format('Value is %v', 10);           // Value is 10
format('Value is %v', 0);            // Value is 0
format('Value is %v', NaN);          // Value is NaN
format('Value is %v', Infinity);     // Value is Infinity
format('Value is %v', true);         // Value is true
format('Value is %v', false);        // Value is false
format('Value is %v', {foo: 'bar'}); // Value is Object
format('Value is %v', new Date());   // Value is Date
format('Value is %v', new Map());    // Value is Map
format('Value is %v', () => 10);     // Value is Function
format('Value is %v', undefined);    // Value is undefined
format('Value is %v', null);         // Value is null
```

Спецификатор `%v` проектировался для вывода значений в сообщениях
об ошибке, когда важно иметь представление об их типах. При этом,
вывод содержимого объекта может быть избыточен для такой задачи.
По этой причине, объекты приводятся к имени конструктора, что
позволяет относительно точно определить тип выводимого значения.

```js
class MyClass {}

format('Value is %v', 'MyClass');     // Value is "MyClass"
format('Value is %v', MyClass);       // Value is MyClass
format('Value is %v', new MyClass()); // Value is MyClass (instance)
```

### %l

Вывод элементов массива через запятую.

```js
format('Array contains %l', ['foo', 10, true]);
// Array contains "foo", 10, true
```

Элементы массива приводятся к строке по логике
спецификатора `%v`

## `Errorf`

Конструктор класса `Errorf` передает свои аргументы
функции `format` для формирования сообщения об ошибке.

Пример:

```js
import {Errorf} from '@e22m4u/js-format';

throw new Errorf(
  'Required values are %l, but %v was given.',
  ['str', 10, true, []],
  new Map(),
);
// Errorf:
// Required values are "str", 10, true, Array, but Map was given.
```

## `InvalidArgumentError`

Класс является псевдонимом для `Errorf`, полностью наследуя его поведение.
В некоторых ситуациях может быть более осмысленным, чем базовый класс.

```js
import {InvalidArgumentError} from '@e22m4u/js-format';

function capitalize(input) {
  if (typeof input !== 'string')
    throw new InvalidArgumentError(
      'Parameter "input" must be a String, but %v was given.',
      input,
    );
}
// capitalize(10);
//   InvalidArgumentError:
//   Parameter "input" must be a String, but 10 was given.
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
