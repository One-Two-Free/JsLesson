/*Время от времени бывает удобно создавать так называемые «полиморфные» функции, 
то есть такие, которые по-разному обрабатывают аргументы, в зависимости от их типа. 

Для реализации такой возможности нужен способ определить тип переменной.*/

/*Оператор typeof
У него есть два синтаксиса: со скобками и без:
Синтаксис оператора: typeof x.
Синтаксис функции: typeof(x).
Работают они одинаково, но первый синтаксис короче.
Результатом typeof является строка, содержащая тип:
Оператор typeof надежно работает с примитивными типами, кроме null, 
а также с функциями. Он возвращает для них тип в виде строки:
*/
alert( typeof 1 );         // 'number'
alert( typeof true );      // 'boolean'
alert( typeof "Текст" );   // 'string'
alert( typeof undefined ); // 'undefined'
alert( typeof null );      // 'object' (ошибка в языке)
alert( typeof alert );     // 'function'
/*Но все объекты, включая массивы и даты для typeof – на одно лицо, они имеют один тип 'object':*/
alert( typeof {} ); // 'object'
alert( typeof [] ); // 'object'
alert( typeof new Date ); // 'object'
//Поэтому различить их при помощи typeof нельзя, и в этом его основной недостаток.




/*Секретное свойство [[Class]]
Для встроенных объектов есть одна «секретная» возможность узнать их тип, 
которая связана с методом toString. Во всех встроенных объектах есть 
специальное свойство [[Class]], в котором хранится информация о его типе или конструкторе.
Оно взято в квадратные скобки, так как это свойство – внутреннее. 
Явно получить его нельзя, но можно прочитать его «в обход», воспользовавшись 
методом toString стандартного объекта Object.
Его внутренняя реализация выводит [[Class]] в небольшом обрамлении, как "[object значение]".*/
var toString = {}.toString;
var arr = [1, 2];
alert( toString.call(arr) ); // [object Array]
var date = new Date;
alert( toString.call(date) ); // [object Date]
var user = { name: "Вася" };
alert( toString.call(user) ); // [object Object]
/*В первой строке мы взяли метод toString, принадлежащий именно стандартному объекту {}.
Нам пришлось это сделать, так как у Date и Array – свои собственные методы toString, 
которые работают иначе. Затем мы вызываем этот toString в контексте нужного объекта obj, 
и он возвращает его внутреннее, невидимое другими способами, свойство [[Class]].
Для получения [[Class]] нужна именно внутренняя реализация toString стандартного 
объекта Object, другая не подойдёт.

Метод также можно использовать с примитивами:*/
alert( {}.toString.call(123) ); // [object Number]
alert( {}.toString.call("строка") ); // [object String]

//Для большего удобства можно сделать функцию getClass, которая будет возвращать только сам [[Class]]:
function getClass(obj) {
  return {}.toString.call(obj).slice(8, -1);
}
alert( getClass(new Date) ); // Date
alert( getClass([1, 2, 3]) ); // Array

/*Заметим, что свойство [[Class]] есть и доступно для чтения указанным 
способом – у всех встроенных объектов. Но его нет у объектов, 
которые создают наши функции. Точнее, оно есть, но равно всегда "Object".*/



/*Метод Array.isArray()
Для проверки типа на массив есть специальный метод: Array.isArray(arr). 
Он возвращает true только если arr – массив:*/
alert( Array.isArray([1,2,3]) ); // true
alert( Array.isArray("not array")); // false



/*Оператор instanceof
Оператор instanceof позволяет проверить, создан ли объект данной функцией, 
причём работает для любых функций – как встроенных, так и наших.*/
function User() {}
var user = new User();
alert( user instanceof User ); // true
/*Таким образом, instanceof, в отличие от [[Class]] и typeof 
может помочь выяснить тип для новых объектов, созданных нашими конструкторами.*/



/*Итого
Для написания полиморфных (это удобно!) функций нам нужна проверка типов.

Для примитивов с ней отлично справляется оператор typeof.

У него две особенности:

Он считает null объектом, это внутренняя ошибка в языке.
Для функций он возвращает function, по стандарту функция не считается базовым типом, 
но на практике это удобно и полезно.
Для встроенных объектов мы можем получить тип из скрытого свойства [[Class]], 
при помощи вызова {}.toString.call(obj).slice(8, -1). 
Для конструкторов, которые объявлены нами, [[Class]] всегда равно "Object".

Оператор obj instanceof Func проверяет, создан ли объект obj функцией Func, 
работает для любых конструкторов. Более подробно мы разберём его в главе Проверка класса: "instanceof".

И, наконец, зачастую достаточно проверить не сам тип, а просто наличие нужных 
свойств или методов. Это называется «утиная типизация».*/













