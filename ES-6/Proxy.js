/*
Прокси (proxy) – особый объект, смысл которого – перехватывать обращения
к другому объекту и, при необходимости, модифицировать их.*/

let proxy = new Proxy(target, handler); 
/*target – объект, обращения к которому надо перехватывать.
  handler – объект с «ловушками»: функциями-перехватчиками для операций к target.

Почти любая операция может быть перехвачена и обработана прокси до или даже вместо 
доступа к объекту target, например: чтение и запись свойств, получение списка свойств, 
вызов функции (если target – функция) и т.п.

  Если ловушки нет – операция идёт над target
  Если для операции нет ловушки, то она выполняется напрямую над target.*/

get(target, property, receiver);
  /*Срабатывает при чтении свойства из прокси.
target – целевой объект, тот же который был передан первым аргументом в new Proxy.
property – имя свойства.
receiver – объект, к которому было применено присваивание. Обычно сам прокси, либо прототипно наследующий от него. Этот аргумент используется редко.*/

set(target, property, value, receiver);
/*Срабатывает при записи свойства в прокси.

target – целевой объект, тот же который был передан первым аргументом в new Proxy.
property – имя свойства.
value – значение свойства.
receiver – объект, к которому было применено присваивание, 
обычно сам прокси, либо прототипно наследующий от него.

Метод set должен вернуть true, если присвоение успешно обработано и false 
в случае ошибки (приведёт к генерации TypeError).



has
Ловушка has срабатывает в операторе in и некоторых других случаях, когда проверяется наличие свойства.



apply
Если аргумент target прокси – функция, то становится доступна ловушка apply для её вызова.
Метод apply(target, thisArgument, argumentsList) получает:
target – исходный объект.
thisArgument – контекст this вызова.
argumentsList – аргументы вызова в виде массива.

'use strict';
function sum(a, b) {
  return a + b;
}
let proxy = new Proxy(sum, {
  // передаст вызов в target, предварительно сообщив о нём
  apply: function(target, thisArg, argumentsList) {
    alert(`Буду вычислять сумму: ${argumentsList}`);
    return target.apply(thisArg, argumentsList);
  }
});
// Выведет сначала сообщение из прокси,
// а затем уже сумму
alert( proxy(1, 2) );*/

/*  construct
Ловушка construct(target, argumentsList) перехватывает вызовы при помощи new.
Она получает исходный объект target и список аргументов argumentsList.
Пример ниже передаёт операцию создания исходному классу или функции-конструктору, 
выводя сообщение об этом:
'use strict';
function User(name, surname) {
  this.name = name;
  this.surname = surname;
}
let UserProxy = new Proxy(User, {
  // передаст вызов new User, предварительно сообщив о нём
  construct: function(target, argumentsList) {
    alert(`Запуск new с аргументами: ${argumentsList}`);
    return new target(...argumentsList);
  }
});
let user = new UserProxy("Ilya", "Kantor");
alert( user.name ); // Ilya*/


/*
Полный список
Полный список возможных функций-перехватчиков, которые может задавать handler:

  getPrototypeOf – перехватывает обращение к методу getPrototypeOf.
  setPrototypeOf – перехватывает обращение к методу setPrototypeOf.
  isExtensible – перехватывает обращение к методу isExtensible.
  preventExtensions – перехватывает обращение к методу preventExtensions.
  getOwnPropertyDescriptor – перехватывает обращение к методу getOwnPropertyDescriptor.
  defineProperty – перехватывает обращение к методу defineProperty.
  has – перехватывает проверку существования свойства, которая используется в операторе in и в некоторых других методах встроенных объектов.
  get – перехватывает чтение свойства.
  set – перехватывает запись свойства.
  deleteProperty – перехватывает удаление свойства оператором delete.
  enumerate – срабатывает при вызове for..in или for..of, возвращает итератор для свойств объекта.
  ownKeys – перехватывает обращения к методу getOwnPropertyNames.
  apply – перехватывает вызовы target().
  construct – перехватывает вызовы new target().
Каждый перехватчик запускается с handler в качестве this. 
Это означает, что handler кроме ловушек может содержать и другие полезные свойства и методы.
Каждый перехватчик получает в аргументах target и дополнительные 
параметры в зависимости от типа.
Если перехватчик в handler не указан, то операция совершается, 
как если бы была вызвана прямо на target.*/































