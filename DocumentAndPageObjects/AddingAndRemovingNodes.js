/*Добавление и удаление узлов

	Создание элемента
Для создания элементов используются следующие методы: document.createElement(tag)
Создает новый элемент с указанным тегом:*/
var div = document.createElement('div');

/*document.createTextNode(text)
Создает новый *текстовый* узел с данным текстом:*/
var textElem = document.createTextNode('Тут был я');

	/*Добавление элемента: appendChild, insertBefore
Чтобы DOM-узел был показан на странице, его необходимо вставить в document.
Для этого первым делом нужно решить, куда мы будем его вставлять. 
Предположим, что мы решили, что вставлять будем в некий элемент parentElem, например var parentElem = document.body.
Для вставки внутрь parentElem есть следующие методы:
parentElem.appendChild(elem)
Добавляет elem в конец дочерних элементов parentElem.

parentElem.insertBefore(elem, nextSibling)
Вставляет elem в коллекцию детей parentElem, перед элементом nextSibling.
Следующий код вставляет новый элемент перед вторым <li>:

Для вставки элемента в начало достаточно указать, что вставлять будем перед первым потомком:
list.insertBefore(newLi, list.firstChild);

Если вторым аргументом указать null, то insertBefore сработает как appendChild. insertBefore универсален.

На заметку:
Все методы вставки возвращают вставленный узел.

Например, parentElem.appendChild(elem) возвращает elem.*/


	/*Клонирование узлов: cloneNode
Вызов elem.cloneNode(true) создаст «глубокую» копию элемента – вместе с атрибутами, включая подэлементы. 
Если же вызвать с аргументом false, то копия будет сделана без дочерних элементов. Это нужно гораздо реже.

div.parentNode.insertBefore(div2, div.nextSibling);
	Для вставки нам нужен будущий родитель. Мы, возможно, не знаем, где точно находится div (или не хотим зависеть от того, где он), но если нужно вставить рядом с div, то родителем определённо будет div.parentNode.
	Мы хотели бы вставить после div, но метода insertAfter нет, есть только insertBefore, поэтому вставляем перед его правым соседом div.nextSibling.*/

/*Удаление узлов: removeChild
Для удаления узла есть два метода:
	parentElem.removeChild(elem)
Удаляет elem из списка детей parentElem.
	parentElem.replaceChild(newElem, elem)
Среди детей parentElem удаляет elem и вставляет на его место newElem.

Оба этих метода возвращают удаленный узел, то есть elem. 
Если нужно, его можно вставить в другое место DOM тут же или в будущем.

	На заметку:
Если вы хотите переместить элемент на новое место – не нужно его удалять со старого.
Все методы вставки автоматически удаляют вставляемый элемент со старого места. Конечно же, это очень удобно.

	Метод remove
В современном стандарте есть также метод elem.remove(), который удаляет элемент напрямую, 
не требуя ссылки на родителя. Это зачастую удобнее, чем removeChild. 
Он поддерживается во всех современных браузерах, кроме IE11-. 
Впрочем, легко подключить или даже сделать полифилл.*/

	/*Текстовые узлы для вставки текста
Если текст для сообщения нужно показать именно как текст, а не как HTML, 
то можно обернуть его в текстовый узел.*/
<style> .alert {  padding: 15px;  border: 1px solid #d6e9c6;  border-radius: 4px;  color: #3c763d;  background-color: #dff0d8;}
</style>
<script>
  var div = document.createElement('div');
  div.className = "alert alert-success";
  document.body.appendChild(div);
  var text = prompt("Введите текст для сообщения", "Жили были <a> и <b>!");
  // вставится именно как текст, без HTML-обработки
  div.appendChild(document.createTextNode(text));
</script>
/*В современных браузерах (кроме IE8-) в качестве альтернативы можно использовать присвоение textContent.*/

/*Итого
	Методы для создания узлов:
document.createElement(tag) – создает элемент
document.createTextNode(value) – создает текстовый узел
elem.cloneNode(deep) – клонирует элемент, если deep == true, то со всеми потомками, если false – без потомков.
	
	Вставка и удаление узлов:
parent.appendChild(elem)
parent.insertBefore(elem, nextSibling)
parent.removeChild(elem)
parent.replaceChild(newElem, elem)
Все эти методы возвращают elem.*/





















