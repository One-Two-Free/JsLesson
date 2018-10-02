/*Графические компоненты
Первый и главный шаг в наведении порядка – это оформить код в объекты, каждый из которых будет решать свою задачу.
Здесь мы сосредоточимся на графических компонентах, которые также называют «виджетами».
В браузерах есть встроенные виджеты, например <select>, <input> и другие элементы, о которых мы даже и не
думаем, «как они работают». Они «просто работают»: показывают значение, вызывают события…

Наша задача – сделать то же самое на уровне выше. Мы будем создавать объекты, которые генерируют меню, 
диалог или другие компоненты интерфейса, и дают возможность удобно работать с ними.*/


/*Виджет Menu
Мы начнём работу с виджета, который предусматривает уже готовую разметку.
То есть, в нужном месте HTML находится DOM-структура для меню – заголовок и список опций:*/
<div class="menu" id="sweets-menu">
  <span class="title">Сладости</span>
  <ul>
    <li>Торт</li>
    <li>Пончик</li>
    <li>...</li>
  </ul>
</div>

/*Далее она может дополняться, изменяться, но в начале – она такая.
Обратим внимание на важные соглашения виджета:
	Вся разметка заключена в корневой элемент <div class="menu" id="sweets-menu">.
Это очень удобно: вынул этот элемент из DOM – нет меню, вставил в другое место – переместил меню. Кроме того, можно удобно искать подэлементы.
	Внутри корневого элемента – только классы, не id.
Документ вполне может содержать много различных меню. Они не должны конфликтовать между собой, поэтому для разметки везде используются классы.
Исключение – корневой элемент. В данном случае мы предполагаем, что данное конкретное «меню сладостей» в документе только одно, поэтому даём ему id.*/

/*Класс виджета
Для работы с разметкой будем создавать объект new Menu и передавать ему корневой элемент. 
В конструкторе он поставит необходимые обработчики:*/
function Menu(options) {
  var elem = options.elem;

  elem.onmousedown = function() {
    return false;
  }

  elem.onclick = function(event) {
    if (event.target.closest('.title')) {
      elem.classList.toggle('open');
    }
  };

}
// использование
var menu = new Menu({
  elem: document.getElementById('sweets-menu')
});

/*У конструктора только один аргумент – объект options.
Это удобно, так как у графических компонентов обычно много настроек, большинство из которых имеют разумные значения «по умолчанию». Если передавать аргументы через запятую – их будет слишком много.

Обработчики назначаются через делегирование.
Вместо того, чтобы найти элемент и поставить обработчик на него:
Мы ставим обработчик на корневой elem и используем делегирование:
Это ускоряет инициализацию, так как не надо искать элементы, и даёт возможность 
в любой момент менять DOM внутри, в том числе через innerHTML, без необходимости переставлять обработчик.*/


/*Генерация DOM-элемента
Для генерации DOM добавим меню три метода:
	render() – генерирует корневой DOM-элемент и заголовок меню.
	renderItems() – генерирует DOM для списка опций ul/li.
	getElem() – возвращает DOM-элемент меню, при необходимости запуская генерацию, публичный метод.

Функция генерации корневого элемента с заголовком render отделена от генерации списка renderItems. Почему – будет видно чуть далее.
Новый способ использования меню:*/
// создать объект меню с данным заголовком и опциями
var menu = new Menu({
  title: "Сладости",
  items: [
    "Торт",
    "Пончик",
    "Пирожное",
    "Шоколадка",
    "Мороженое"
  ]
});
// получить сгенерированный DOM-элемент меню
var elem = menu.getElem();
// вставить меню в нужное место страницы
document.body.appendChild(elem);

/*Код Menu с новыми методами:*/
function Menu(options) {
  var elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    elem = document.createElement('div');
    elem.className = "menu";

    var titleElem = document.createElement('span');
    elem.appendChild(titleElem);
    titleElem.className = "title";
    titleElem.textContent = options.title;

    elem.onmousedown = function() {
      return false;
    };

    elem.onclick = function(event) {
      if (event.target.closest('.title')) {
        toggle();
      }
    }

  }

  function renderItems() {
    var items = options.items || [];
    var list = document.createElement('ul');
    items.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    elem.appendChild(list);
  }

  function open() {
    if (!elem.querySelector('ul')) {
      renderItems();
    }
    elem.classList.add('open');
  };

  function close() {
    elem.classList.remove('open');
  };

  function toggle() {
    if (elem.classList.contains('open')) close();
    else open();
  };

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}

/*Отметим некоторые особенности этого кода.

Обработчики отделяются от реальных действий.
В обработчике onclick мы «ловим» событие и выясняем, что именно произошло. Возможно, нужно проверить event.target, координаты, клавиши-модификаторы, и т.п. Это всё можно делать здесь же.

Выяснив, что нужно сделать, обработчик onclick не делает это сам, а вызывает для этого соответствующий метод. Этот метод уже не знает ничего о событии, он просто делает что-то с виджетом. Его можно вызвать и отдельно, не из обработчика.

Здесь есть ряд важных плюсов:
	Обработчик onclick не «распухает» чрезмерно.
	Код гораздо лучше читается.
	Метод можно повторно использовать, в том числе и сделать публичным, как в коде выше.
	
Генерация DOM, по возможности, должна быть «ленивой».
Мы стараемся откладывать работу до момента, когда она реально нужна. Например, когда new Menu создаётся, 
то переменная elem лишь объявляется. DOM-дерево будет сгенерировано только при вызове getElem() функцией render().

Более того! Пока меню закрыто – достаточно заголовка. Кроме того, возможно, посетитель вообще никогда 
не раскроет это меню, так зачем генерировать список раньше времени? А при первом открытии open() 
вызовет функцию renderItems(), которая специально для этого выделена отдельно от render().

Фаза инициализации очень чувствительна к производительности, так как обычно в сложном интерфейсе создаётся много всего.
Если изначально подходить к оптимизации на этой фазе «спустя рукава», то потом поправить долгий старт может быть сложно. */

/*Итого
Мы начали создавать компонент «с чистого листа», пока без дополнительных библиотек.

Основные принципы:

- Виджет – это объект, который либо контролирует готовое дерево DOM, либо создаёт своё.
- В конструктор виджета передаётся объект аргументов options.
- Виджет при необходимости создаёт элемент или «оживляет» готовый. Внутри в разметке не используются id.
- Обработчики назначаются через делегирование – для производительности и упрощения виджета.
- Обработчики событий вызывают соответствующий метод, не пытаются делать всё сами.
- При инициализации, если существенный участок работы можно отложить до реального задействования виджета – откладываем его.*/



































