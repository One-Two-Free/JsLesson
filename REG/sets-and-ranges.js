/*Наборы и диапазоны [...]
Если в регулярном выражении несколько символов или символьных классов заключены 
в квадратные скобки […], то это означает "искать любой символ из указанных в […]".

Набор
Например, [еао] означает любой символ из этих трёх: 'а', 'е', или 'о'.
Такое обозначение называют набором. Наборы используются в регулярном 
выражении наравне с обычными символами:*/
// найти [г или т], а затем "оп"
alert( "Гоп-стоп".match(/[гт]оп/gi) ); // "Гоп", "топ"
/*Обратим внимание: несмотря на то, что в наборе указано несколько символов, 
в совпадении должен присутствовать ровно один из них.*/


/*Диапазоны
Квадратные скобки могут также содержать диапазоны символов.
Например, [a-z] – произвольный символ от a до z, [0-5] – цифра от 0 до 5.


Символьные классы – всего лишь более короткие записи для диапазонов, в частности:
\d – то же самое, что [0-9],
\w – то же самое, что [a-zA-Z0-9_],
\s – то же самое, что [\t\n\v\f\r ] плюс несколько юникодных пробельных символов.


Диапазоны «кроме»
Кроме обычных, существуют также исключающие диапазоны: [^…].
Квадратные скобки, начинающиеся со знака каретки: [^…] находят любой символ, кроме указанных.
[^аеуо] – любой символ, кроме 'a', 'e', 'y', 'o'.
[^0-9] – любой символ, кроме цифры, то же что \D.
[^\s] – любой не-пробельный символ, то же что \S.
Пример ниже ищет любые символы, кроме букв, цифр и пробелов:*/
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // "@", "."

/*Не нужно экранирование
Обычно, если мы хотим искать именно точку, а не любой символ, или именно символ \, то мы используем экранирование: указываем \. или \\.
В квадратных скобках большинство специальных символов можно использовать без экранирования, если конечно они не имеют какой-то особый смысл именно внутри квадратных скобок.
То есть, «как есть», без экранирования можно использовать символы:
Точка '.'.
Плюс '+'.
Круглые скобки '( )'.
Дефис '-', если он находится в начале или конце квадратных скобок, то есть не выделяет диапазон.
Символ каретки '^', если не находится в начале квадратных скобок.
А также открывающая квадратная скобка '['.
То есть, точка "." в квадратных скобках означает не «любой символ», а обычную точку.
Регэксп [.,] ищет один из символов «точка» или «запятая».*/









