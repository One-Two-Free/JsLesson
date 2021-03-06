/*В этой главе мы рассмотрим работу с форматом JSON, который используется для представления объектов в виде строки.
Это один из наиболее удобных форматов данных при взаимодействии с JavaScript. Если нужно с сервера взять объект с данными и передать его клиенту, то в качестве промежуточного формата – для передачи по сети, почти всегда используют именно его.
В современных браузерах есть замечательные методы, знание тонкостей которых делает операции с JSON простыми и комфортными.*/

/*Формат JSON
Данные в формате JSON (RFC 4627) представляют собой:
	JavaScript-объекты { ... } или
	Массивы [ ... ] или
Значения одного из типов:
	строки в двойных кавычках,
	число,
	логическое значение true/false,
	null.*/

/*Почти все языки программирования имеют библиотеки для преобразования объектов в формат JSON.
Основные методы для работы с JSON в JavaScript – это:
	JSON.parse – читает объекты из строки в формате JSON.
	JSON.stringify – превращает объекты в строку в формате JSON, 
	используется, когда нужно из JavaScript передать данные по сети.*/

/*Метод JSON.parse
Вызов JSON.parse(str) превратит строку с данными в формате JSON 
в JavaScript-объект/массив/значение.*/
var numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);
alert( numbers[1] ); // 1
var user = '{ "name": "Вася", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
user = JSON.parse(user);
alert( user.friends[1] ); // 1

/*Данные могут быть сколь угодно сложными, объекты и массивы могут 
включать в себя другие объекты и массивы. Главное, чтобы они соответствовали формату.*/

/*JSON-объекты ≠ JavaScript-объекты
Объекты в формате JSON похожи на обычные JavaScript-объекты, 
но отличаются от них более строгими требованиями к строкам – они должны быть именно в двойных кавычках.

В частности, первые два свойства объекта ниже – некорректны:



                     
      {
  name: "Вася",       // ошибка: ключ name без кавычек!
  "surname": 'Петров',// ошибка: одинарные кавычки у значения 'Петров'!
  "age": 35,           // .. а тут всё в порядке.
  "isAdmin": false    // и тут тоже всё ок
}
Кроме того, в формате JSON не поддерживаются комментарии. Он предназначен только для передачи данных.

Есть нестандартное расширение формата JSON, которое называется JSON5 и как раз разрешает ключи без кавычек, комментарии и т.п, как в обычном JavaScript. На данном этапе это отдельная библиотека.*/



/*Для интеллектуального восстановления из строки у JSON.parse(str, reviver)
есть второй параметр reviver, который является функцией function(key, value).
Если она указана, то в процессе чтения объекта из строки JSON.parse передаёт 
ей по очереди все создаваемые пары ключ-значение и может возвратить либо 
преобразованное значение, либо undefined, если его нужно пропустить.

В данном случае мы можем создать правило, что ключ date всегда означает дату:*/
// дата в строке - в формате UTC
var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';

var event = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( event.date.getDate() ); // теперь сработает!










