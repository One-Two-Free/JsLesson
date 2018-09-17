/*Основным инструментом работы и динамических изменений на странице 
является DOM (Document Object Model) – объектная модель, используемая для XML/HTML-документов.
Согласно DOM-модели, документ является иерархией, деревом. Каждый HTML-тег образует узел дерева 
с типом «элемент». Вложенные в него теги становятся дочерними узлами. Для представления текста 
создаются узлы с типом «текст».
DOM – это представление документа в виде дерева объектов, доступное для изменения через JavaScript.*/

/*Теги образуют узлы-элементы (element node). 
Естественным образом одни узлы вложены в другие. Структура дерева образована исключительно за счет них.
Текст внутри элементов образует текстовые узлы (text node), обозначенные как #text. 
Текстовый узел содержит исключительно строку текста и не может иметь потомков, 
то есть он всегда на самом нижнем уровне.

Пробелы и переводы строки – это тоже текст, полноправные символы, которые учитываются в DOM.

пробелы до <head> по стандарту игнорируются, а любое содержимое 
после </body> не создаёт узла, браузер переносит его внутрь, в конец body.

В остальных случаях всё честно – если пробелы есть в документе, 
то они есть и в DOM, а если их убрать, то и в DOM их не будет

Таблицы всегда содержат <tbody>
Важный «особый случай» при работе с DOM – таблицы. 
По стандарту DOM они обязаны иметь <tbody>, однако в HTML их можно написать без него. 
В этом случае браузер добавляет <tbody> самостоятельно.
Важно знать об этом, иначе при работе с таблицами возможны сюрпризы.

Всё, что есть в HTML, находится и в DOM.
Даже директива <!DOCTYPE...>, которую мы ставим в начале HTML, тоже является DOM-узлом, 
и находится в дереве DOM непосредственно перед <html>. На иллюстрациях выше этот факт скрыт, 
поскольку мы с этим узлом работать не будем, он никогда не нужен.

Даже сам объект document, формально, является DOM-узлом, самым-самым корневым.

Всего различают 12 типов узлов, но на практике мы работаем с четырьмя из них:

Документ – точка входа в DOM.
Элементы – основные строительные блоки.
Текстовые узлы – содержат, собственно, текст.
Комментарии – иногда в них можно включить информацию, которая не будет показана, но доступна из JS.*/



/*DOM нужен для того, чтобы манипулировать страницей – читать информацию 
из HTML, создавать и изменять элементы.
Узел HTML можно получить как document.documentElement, а BODY – как document.body.
Получив узел, мы можем что-то сделать с ним.
DOM предоставляет возможность делать со страницей всё, что угодно.*/

/*Итого
DOM-модель – это внутреннее представление HTML-страницы в виде дерева.
Все элементы страницы, включая теги, текст, комментарии, являются узлами DOM.
У элементов DOM есть свойства и методы, которые позволяют изменять их.
IE8- не генерирует пробельные узлы.*/



/*Работа с DOM из консоли

DOM в Elements не совсем соответствует реальному
Отображение DOM во вкладке Elements не совсем соответствует реальному. 
В частности, там не отображаются пробельные узлы. Это сделано для удобства просмотра. 
Но мы-то знаем, что они есть.
С другой стороны, в Elements можно увидеть CSS-псевдоэлементы, 
такие как ::before, ::after. Это также сделано для удобства, в DOM их не существует.
Ещё методы консоли
Для поиска элементов в консоли есть два специальных метода:
$$("div.my") – ищет все элементы в DOM по данному CSS-селектору.
$("div.my") – ищет первый элемент в DOM по данному CSS-селектору.*/



















