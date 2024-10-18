## @e22m4u/js-format

*[English](README.md) | Русский*

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

console.log(format(`A boolean required, but %s given.`, 8));
console.log(format(`A boolean required, but %s given.`, '8'));
// > A boolean required, but 8 given.
// > A boolean required, but 8 given.
```

В примере выше строка `'8'` и число `8` выводятся одинаково.
Похожая проблема возникает при выводе объектов.

```js
import {format} from 'util';

console.log(format(`A boolean required, but %s given.`, new Date()));
console.log(format(`A boolean required, but %s given.`, 'Oct 18 2024 13:04:30'));
// > A boolean required, but Oct 18 2024 13:04:30 given.
// > A boolean required, but Oct 18 2024 13:04:30 given.
```

Модуль `@e22m4u/js-format` расширяет стандартные спецификаторы
дополнительным `%v` и `%l`, которые оборачивают строки в кавычки,
а для объектов выводят имя конструктора.

```js
// import {format} from 'util';
import {format} from '@e22m4u/js-format'; // заменяем пакет "util"

console.log(format(`A boolean required, but %v given.`, 8));
console.log(format(`A boolean required, but %v given.`, '8'));
// > A boolean required, but 8 given.
// > A boolean required, but "8" given.

console.log(format(`A boolean required, but %v given.`, new Date()));
console.log(format(`A boolean required, but %v given.`, 'Oct 18 2024 13:04:30'));
// > A boolean required, but Date (instance) given.
// > A boolean required, but "Oct 18 2024 13:04:30" given.
```

Подробнее о новых спецификаторах см. в разделе
[Спецификаторы](#Спецификаторы).

## Установка

```bash
npm install @e22m4u/js-format
```

## Обзор

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {format} from '@e22m4u/js-format';
```

*CommonJS*

```js
const {format} = require('@e22m4u/js-format');
```

### Спецификаторы

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
