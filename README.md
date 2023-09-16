## @e22m4u/format

Расширенная версия `format` из Node.js модуля `util`

- стандартные спецификаторы `%s`, `%d` и `%j`
- добавлен `%v` для вывода простых значений или имени конструктора
- добавлен `%l` для вывода списка через запятую `1, 2, 3`

дополнительно:
- встроенный класс `Errorf` с интерполяцией сообщения об ошибке

## Установка

```bash
npm install @e22m4u/format
```

## Примеры

Es-импорт

```js
import {format} from '@e22m4u/format';
```

### Спецификатор `%v`

Строки оборачиваются в кавычки, остальные примитивы приводятся
к строке, а для более сложных типов выводится имя конструктора.

```js
format('> %v', 'foo');        // > "foo"
format('> %v', '');           // > ""
format('> %v', 10);           // > 10
format('> %v', 0);            // > 0
format('> %v', NaN);          // > NaN
format('> %v', Infinity);     // > Infinity
format('> %v', true);         // > true
format('> %v', false);        // > false
format('> %v', {foo: 'bar'}); // > Object
format('> %v', new Date());   // > Date
format('> %v', new Map());    // > Map
format('> %v', () => 10);     // > Function
format('> %v', undefined);    // > undefined
format('> %v', null);         // > null
```

Спецификатор `%v` проектировался для вывода значений в сообщениях
об ошибке, когда важно иметь представление об их типах. При этом,
вывод содержимого объекта может быть избыточен для такой задачи.
По этой причине, объекты приводятся к имени конструктора, что
позволяет относительно точно определить тип выводимого значения.

```js
class MyClass {}

format('> %v', new MyClass()); // > MyClass
format('> %v', 'MyClass');     // > "MyClass"
format('> %v', MyClass);       // > Function
```

### Спецификатор `%l`

Вывод элементов массива через запятую.

```js
format('> %l', ['foo', 10, true]); // > "foo", 10, true
```

Элементы массива приводятся к строке по логике спецификатора `%v`

```js
format('> %l', ['foo']);        // > "foo"
format('> %l', ['']);           // > ""
format('> %l', [10]);           // > 10
format('> %l', [0]);            // > 0
format('> %l', [NaN]);          // > NaN
format('> %l', [Infinity]);     // > Infinity
format('> %l', [true]);         // > true
format('> %l', [false]);        // > false
format('> %l', [{foo: 'bar'}]); // > Object
format('> %l', [new Date()]);   // > Date
format('> %l', [new Map()]);    // > Map
format('> %l', [() => 10]);     // > Function
format('> %l', [undefined]);    // > undefined
format('> %l', [null]);         // > null
```

## Errorf

Конструктор класса `Errorf` передает аргументы функции `format`
для формирования сообщения об ошибке.

Пример:

```js
import {Errorf} from '@e22m4u/format';

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
