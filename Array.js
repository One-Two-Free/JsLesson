/*Массив – разновидность объекта, которая предназначена для хранения 
пронумерованных значений и предлагает дополнительные методы для удобного манипулирования такой коллекцией.
Элементы нумеруются, начиная с нуля.
Чтобы получить нужный элемент из массива – указывается его номер в квадратных скобках:*/

//Конец массива
//pop удаляет последний элемент из массива и возвращает его
//push добавляет элемент в конец массива (допускается число аргументов больше одного)

/*Начало массива
shift удаляет из массива первый элемент и возвращает его:
unshift добавляет элемент в начало массива(допускается число аргументов больше одного)*/

//Длина length – не количество элементов массива, а последний индекс + 1.
//При уменьшении length массив укорачивается.

/* метод split(s), который позволяет превратить строку в массив, разбив ее по разделителю s
У метода split есть необязательный второй аргумент – ограничение на количество элементов в массиве. 
Если их больше, чем указано – остаток массива будет отброшен
Вызов split с пустой строкой разобьёт по буквам:*/
var names = 'Маша, Петя, Марина, Василий';
var arr = names.split(', ');

var str = "тест";
alert( str.split('') ); // т,е,с,т

/*arr.join(str) делает в точности противоположное split. 
Он берет массив и склеивает его в строку, используя str как разделитель.*/

/*splice
Вырезает и возвращает указанное количество элементов, начиная со стартовой позиции
Если количество элементов не передается, 
вырезается все элементы до конца массива, начиная со стартовой позиции
Его синтаксис:
arr.splice(index[, deleteCount, elem1, ..., elemN])
Удалить deleteCount элементов, начиная с номера index, 
а затем вставить elem1, ..., elemN на их место. Возвращает массив из удалённых элементов.*/

var arr = ["Я", "сейчас", "изучаю", "JavaScript"];
// удалить 3 первых элемента и добавить другие вместо них
arr.splice(0, 3, "Мы", "изучаем");
alert( arr ) // теперь ["Мы", "изучаем", "JavaScript"]

//Метод splice также может вставлять элементы 
//без удаления, для этого достаточно установить deleteCount в 0:
//Допускается использование отрицательного номера позиции, которая в этом случае отсчитывается с конца:

//Метод slice(begin, end) копирует участок массива от begin до end, не включая end. Исходный массив при этом не меняется.
//Если не указать end – копирование будет до конца массива:
//Можно использовать отрицательные индексы, они отсчитываются с конца:
//Если вообще не указать аргументов – скопируется весь массив:
var fullCopy = arr.slice();

//Сортировка, метод sort(fn)
//fn –функция для сортировки function(a, b){ //код функции return n;}
/*Сортирует массив посимвольно (в алфавитном порядке).
Если передаем функцию, то она принимает 2 аргумента, 
для сравнения которых можно использовать свои правила
1-й элемент будет стоять первым, 
	если вернется положительное число,
вторым,
	если отрицательное
Если не хотим сортировать, нужно вернуть 0
Исходный массив меняется*/
vararr = [14, 51, 7, 2];
functionmySort(a,b) { return a–b; }
arr.sort(mySort); // [2, 7, 14, 51]

//Метод arr.reverse() меняет порядок элементов в массиве на обратный.

/*concat
Метод arr.concat(value1, value2, … valueN) создаёт новый массив, 
в который копируются элементы из arr, а также value1, value2, ... valueN.*/

/*indexOf/lastIndexOf
Эти методы не поддерживаются в IE8-. Для их поддержки подключите библиотеку ES5-shim.
Метод «arr.indexOf(searchElement[, fromIndex])» 
возвращает номер элемента searchElement в массиве arr или -1, если его нет.
Поиск начинается с номера fromIndex, если он указан. Если нет – с начала массива.
Для поиска используется строгое сравнение ===.*/
var arr = [1, 0, false];
alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1
//Метод «arr.lastIndexOf(searchElement[, fromIndex])» ищет справа-налево: 
//с конца массива или с номера fromIndex, если он указан.


/*
Итого
Методы массивов:
push/pop, shift/unshift, splice – для добавления и удаления элементов.
join/split – для преобразования строки в массив и обратно.
slice – копирует участок массива.
sort – для сортировки массива. Если не передать функцию сравнения – сортирует элементы как строки.
reverse – меняет порядок элементов на обратный.
concat – объединяет массивы.
indexOf/lastIndexOf – возвращают позицию элемента в массиве (не поддерживается в IE8-).*/


/*
Задачи
Добавить класс в строку*/
function addClass(obj, cls) {
  var classes = obj.className ? obj.className.split(' ') : [];

  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) return; // класс уже есть
  }

  classes.push(cls); // добавить

  obj.className = classes.join(' '); // и обновить свойство
}
var obj = {className: 'open menu'};
addClass(obj, 'new');
addClass(obj, 'open');
addClass(obj, 'me');
alert(obj.className); 
/*P.S. «Альтернативный» подход к проверке наличия класса вызовом obj.className.indexOf(cls)
был бы неверным. В частности, он найдёт cls = "menu"
в строке классов obj.className = "open mymenu".*/

/*Сортировка объектов
важность: 5
Напишите код, который отсортирует массив объектов people по полю age.*/
// Наша функция сравнения
function compareAge(personA, personB) {
  return personA.age - personB.age;
}
// проверка
var vasya = { name: "Вася", age: 23 };
var masha = { name: "Маша", age: 18 };
var vovochka = { name: "Вовочка", age: 6 };
var people = [ vasya , masha , vovochka ];
people.sort(compareAge);
// вывести
for(var i = 0; i < people.length; i++) {
  alert(people[i].name); // Вовочка Маша Вася
}



//Массив: перебирающие методы

/*forEach
Метод «arr.forEach(callback[, thisArg])» используется для перебора массива.
Он для каждого элемента массива вызывает функцию callback.
Этой функции он передаёт три параметра callback(item, i, arr):
item – очередной элемент массива.
i – его номер.
arr – массив, который перебирается.

Второй, необязательный аргумент forEach позволяет указать контекст this для callback.
Метод forEach ничего не возвращает, его используют только для перебора, 
как более «элегантный» вариант, чем обычный цикл for.*/

/*
filter
Метод «arr.filter(callback[, thisArg])» используется для фильтрации массива через функцию.
Он создаёт новый массив, в который войдут только те элементы arr, 
для которых вызов callback(item, i, arr) возвратит true.*/

/*
map(callback(item, i, arr)[, thisArg])
Метод вызывает функцию fn по одному разу для каждого элемента массива в порядке возрастания индекса.
Возвращает новый массив содержащий значения, которые возвращаются функцией callback.*/
var names = ['HTML', 'CSS', 'JavaScript'];
var nameLengths = names.map(function(name) {
  return name.length;
});
// получили массив с длинами
alert( nameLengths ); // 4,3,10

/*every/some
Эти методы используются для проверки массива.
Метод «arr.every(callback[, thisArg])» возвращает true, если вызов callback вернёт true для каждого элемента arr.
Метод «arr.some(callback[, thisArg])» возвращает true, если вызов callback вернёт true для какого-нибудь элемента arr.*/

/*
reduce/reduceRight
Метод «arr.reduce(callback[, initialValue])» используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
Метод reduce используется для вычисления на основе массива какого-либо единого значения, иначе говорят «для свёртки массива».
Он применяет функцию callback по очереди к каждому элементу массива слева направо, сохраняя при этом промежуточный результат.
Аргументы функции callback(previousValue, currentItem, index, arr):
 - previousValue – последний результат вызова функции, он же «промежуточный результат».
 - currentItem – текущий элемент массива, элементы перебираются по очереди слева-направо.
 - index – номер текущего элемента.
 - arr – обрабатываемый массив.
 
 Кроме callback, методу можно передать «начальное значение» – аргумент initialValue. 
 Если он есть, то на первом вызове значение previousValue будет равно initialValue, 
 а если у reduce нет второго аргумента, то оно равно первому элементу массива, 
 а перебор начинается со второго.
*/

/*
Итого
Мы рассмотрели методы:
forEach – для перебора массива.
filter – для фильтрации массива.
every/some – для проверки массива.
map – для трансформации массива в массив.
reduce/reduceRight – для прохода по массиву с вычислением значения.
Во многих ситуациях их использование позволяет написать код короче и понятнее, чем обычный перебор через for.*/










































