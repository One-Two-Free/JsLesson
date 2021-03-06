/*Вёрстка графических компонентов

Семантическая вёрстка
HTML-разметка и названия CSS-классов должны отражать не оформление, а смысл.

При семантической вёрстке классы описывают смысл («что это?» – меню, кнопка…)
и состояние (открыто, закрыто, отключено…) компонента.

<div class="error">  Сообщение об ошибке (error), правильная вёрстка!</div>*/


/*Состояние виджета – класс на элементе
Зачастую компонент может иметь несколько состояний. Например, меню может быть открыто или закрыто.
	Состояние должно добавляться CSS-классом не на тот элемент, который нужно скрыть/показать/…,
	а на тот, к которому оно «по смыслу» относится, обычно – на корневой элемент.

Например, меню в закрытом состоянии скрывает свой список элементов. 
Класс open нужно добавлять не к списку опций <ul>, который скрывается-показывается, 
а к корневому элементу виджета, поскольку это состояние касается всего меню:
<div class="menu open">
  <span class="title">Заголовок меню</span>
  <ul>
    <li>Список элементов</li>
  </ul>
</div>
*/
/*Состояние индикатора может быть «в процессе» (loading) или «загрузка завершена» (complete). 
С точки зрения оформления оно может влиять только на показ внутреннего span, но ставить его нужно 
всё равно на внешний элемент, ведь это – состояние всего компонента.

Из примеров выше можно подумать, что классы, описывающие состояние, всегда ставятся на корневой элемент. Но это не так.
Возможно и такое, что состояние относится к внутреннему элементу. Например, для дерева состояние открыт/закрыт относится к узлу, соответственно, класс должен быть на узле.
<ul class="tree">
  <li class="closed">    Закрытый узел дерева  </li>
  <li class="open">    Открытый узел дерева  </li>
  ...
</ul>*/


/*Префиксы компонента у классов
Чтобы избежать возможных проблем, все классы внутри виджета начинают с его имени.
Здесь имя dialog, так что все, относящиеся к диалогу, будем начинать с dialog__
<div class="dialog">
  <h2 class="dialog__title">Заголовок</h2>
  <div class="dialog__content">    HTML-содержимое.  </div>
  <div class="dialog__close">Закрыть</div>
</div>
Здесь двойное подчёркивание __ служит «стандартным» разделителем. Можно выбрать и другой разделитель, 
но при этом стоит иметь в виду, что иногда имя класса может состоять из нескольких слов. 
Например title-picture. С двойным подчёркиванием: dialog__title-picture, очень наглядно видно где что.
Есть ещё одно полезное правило, которое заключается в том, что стили должны вешаться на класс, а не на тег.
То есть, не h2 { ... }, а .dialog__title { ... }, где .dialog__title – класс на соответствующем заголовке.*/


/*Итого
Вёрстка должна быть семантической, использовать соответствующие смыслу информации теги и классы.
Класс, описывающий состояние всего компонента, нужно ставить на его корневом элементе, а не на том, который нужно «украсить» в этом состоянии. Если состояние относится не ко всему компоненту, а к его части – то на соответствующем «по смыслу» DOM-узле.
Классы внутри компонента должны начинаться с префикса – имени компонента.
Это не всегда строго необходимо, но позволяет избежать проблем в случаях, когда компонент может содержать произвольный DOM, как например диалоговое окно с произвольным HTML-текстом.
Использование .dialog__title вместо .dialog .title гарантирует, что CSS не применится по ошибке к какому-нибудь другому .title внутри диалога.*/















































