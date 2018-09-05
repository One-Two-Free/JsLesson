//В JavaScript любые текстовые данные являются строками.

/*Специальные символы
Символ	Описание
\b		Backspace
\f		Form feed
\n		New line
\r		Carriage return
\t		Tab
\uNNNN	Символ в кодировке Юникод с шестнадцатеричным кодом `NNNN`. Например, `\u00A9` -- юникодное представление символа копирайт ©*/


/*Экранирование специальных символов
Если строка в одинарных кавычках, то внутренние одинарные кавычки внутри должны быть экранированы, 
то есть снабжены обратным слешем \':*/


//Методы и свойства

var str = "My\n"; // 3 символа. Третий - перевод строки
alert( str.length ); // 3

//Чтобы получить символ, используйте вызов charAt(позиция)
var str = "jQuery";
alert( str.charAt(0) ); // "j"
//Также для доступа к символу можно использовать квадратные скобки:
var str = "Я - современный браузер!";
alert( str[0] ); // "Я"
/*Разница между этим способом и charAt заключается в том, 
что если символа нет – charAt выдает пустую строку, а скобки – undefined:*/
alert( "".charAt(0) ); // пустая строка
alert( "" [0] ); // undefined

//Смена регистра
//Методы toLowerCase() и toUpperCase() меняют регистр строки на нижний/верхний:
alert( "Интерфейс" [0].toLowerCase() ); // 'и'

/*Поиск подстроки
Для поиска подстроки есть метод indexOf(подстрока[, начальная_позиция]).
Он возвращает позицию, на которой находится подстрока или -1, если ничего не найдено. 
Необязательный второй аргумент позволяет искать, начиная с указанной позиции*/
var str = "Widget with id";
alert( str.indexOf("id") ); // 1, т.к. "id" найден, начиная с позиции 1
alert( str.indexOf("widget") ); // -1, не найдено, так как поиск учитывает регистр
//Также существует аналогичный метод lastIndexOf, который ищет не с начала, а с конца строки.
/*Поиск всех вхождений
Чтобы найти все вхождения подстроки, нужно запустить indexOf в цикле. Как только получаем очередную позицию – начинаем следующий поиск со следующей.*/
var str = "Ослик Иа-Иа посмотрел на виадук"; // ищем в этой строке
var target = "Иа"; // цель поиска

var pos = 0;
while (true) {
  var foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( foundPos ); // нашли на этой позиции
  pos = foundPos + 1; // продолжить поиск со следующей
}

//Взятие подстроки: substring, substr, slice
//Метод substring(start, end) возвращает подстроку с позиции start до, но не включая end.
//Если аргумент end отсутствует, то идет до конца строки
var str = "stringify";
alert(str.substring(0,1)); // "s", символы с позиции 0 по 1 не включая 1.

//substr(start [, length])
//Первый аргумент имеет такой же смысл, как и в substring, 
//а второй содержит не конечную позицию, а количество символов.
var str = "stringify";
str = str.substr(2,4); // ring, со 2-й позиции 4 символа
alert(str)

/*slice(start [, end]) Возвращает часть строки от позиции start до, 
но не включая, позиции end. Смысл параметров – такой же как в substring.*/

/*Различие между substring и slice – в том, 
как они работают с отрицательными и выходящими за границу строки аргументами:
substring(start, end)
Отрицательные аргументы интерпретируются как равные нулю. Слишком большие значения усекаются до длины строки:*/
alert( "testme".substring(4, -1) ); // "test"
// -1 становится 0 -> получили substring(4, 0)
// 4 > 0, так что аргументы меняются местами -> substring(0, 4) = "test"

//slice Отрицательные значения отсчитываются от конца строки
//Это гораздо более удобно, чем странная логика substring
alert( "testme".slice(-2) ); // "me", от 2 позиции с конца
alert( "testme".slice(1, -1) ); // "estm", от 1 позиции до первой с конца.
/*Если выбирать из этих трёх методов один, для использования в большинстве
ситуаций – то это будет slice: он и отрицательные аргументы поддерживает и работает наиболее очевидно.*/

//String.fromCharCode(code) Возвращает символ по коду code
alert( String.fromCharCode(1072) ); // 'а'
alert(String.fromCharCode(1051, 1091, 1085, 1072);// "Луна"
//str.charCodeAt(pos) Возвращает код символа на позиции pos. Отсчет позиции начинается с нуля
alert( "абрикос".charCodeAt(0) ); // 1072, код 'а'

//replace(text1, text2)
//Возвращает строку, в которой произведена замена первого аргумента на второй.
//Если первым аргументом передается строка, первое ее вхождение заменяется вторым аргументом
varstr = 'Это просто пример';
// Заменяется только первое вхождение!
print(str.replace('просто', 'сложный'); // "Это сложный пример"


//split(text[, length])  
/*text –разделитель(строкаилирегулярноевыражение), по которому производится разбиение length –максимальноеколичествоэлементов
Разбивает исходную строку на отдельные строки согласно разделителю
Возвращает массив полученных элементов
Если указано максимальное количество элементов, длина массива не превышает этого числа*/
varstr = 'Это просто пример';
vararr =str.split(' ');print(arr ); // [Это, просто, пример]
// Ограничение количества элементов
vararr =str.split(' ', 2);print(arr ); // [Это, просто]

//Важно –ни один из методов экземпляров String не меняет исходную строку. 
//Все методы возвращают новую строку, которую можно присвоить новой переменной.

/*Юникод в HTML
Кстати, если мы знаем код символа в кодировке юникод, то можем добавить его в HTML, используя «числовую ссылку» (numeric character reference).

Для этого нужно написать сначала &#, затем код, и завершить точкой с запятой ';'. Например, символ 'а' в виде числовой ссылки: &#1072;.

Если код хотят дать в 16-ричной системе счисления, то начинают с &#x.

В юникоде есть много забавных и полезных символов, например, символ ножниц: ✂ (&#x2702;), дроби: ½ (&#xBD;) ¾ (&#xBE;) и другие. Их можно использовать вместо картинок в дизайне.*/


/*Итого
Строки в JavaScript имеют внутреннюю кодировку Юникод. 
При написании строки можно использовать специальные символы, например \n и вставлять юникодные символы по коду.
Мы познакомились со свойством length и методами charAt, toLowerCase/toUpperCase, 
substring/substr/slice (предпочтителен slice). Есть и другие методы, например trim обрезает пробелы с начала и конца строки.
Строки сравниваются побуквенно. Поэтому если число получено в виде строки, 
то такие числа могут сравниваться некорректно, нужно преобразовать его к типу number.
При сравнении строк следует иметь в виду, что буквы сравниваются по их кодам. 
Поэтому большая буква меньше маленькой, а буква ё вообще вне основного алфавита.
Для правильного сравнения существует целый стандарт ECMA 402. Это не такое простое дело, 
много языков и много правил. Он поддерживается во всех современных браузерах, кроме IE10-, 
в которых нужна библиотека https://github.com/andyearnshaw/Intl.js/. Такое сравнение работает через вызов str1.localeCompare(str2).*/





















