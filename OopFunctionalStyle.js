/*Класс в ООП
Классом в объектно-ориентированной разработке называют шаблон/программный код, предназначенный для создания объектов и методов.
В JavaScript классы можно организовать по-разному. Говорят, что класс User написан в «функциональном» стиле. Далее мы также увидим «прототипный» стиль.

Внутренний и внешний интерфейс
В программировании мы будем разделять методы и свойства объекта на две группы:
Внутренний интерфейс – это свойства и методы, доступ к которым может быть осуществлен только из других методов объекта, их также называют «приватными» (есть и другие термины, встретим их далее).
Внешний интерфейс – это свойства и методы, доступные снаружи объекта, их называют «публичными».

Локальные переменные, включая параметры конструктора, можно считать приватными свойствами.
К локальным переменным конструктора нельзя обратиться снаружи, но они доступны внутри самого конструктора.

Свойства, записанные в this, можно считать публичными.*/

/*Сохранение this в замыкании
предварительно скопировать this во вспомогательную переменную и обращаться из внутренних функций уже к ней.

Конечно, чтобы это работало, мы не должны изменять self, а все приватные методы, которые хотят иметь доступ к текущему объекту, должны использовать внутри себя self вместо this.
Вместо self можно использовать любое другое имя переменной, например var me = this.

Геттеры и сеттеры
Для лучшего контроля над свойством его делают приватным, 
а запись значения осуществляется через специальный метод, который называют «сеттер» (setter method).*/

/*Итого
Для большего контроля над присвоением и чтением значения вместо свойства 
делают «функцию-геттер» и «функцию-сеттер», геттер возвращает значение, сеттер – устанавливает.
Если свойство предназначено только для чтения, то может быть только геттер, 
только для записи – только сеттер.
В качестве альтернативы к паре геттер/сеттер применяют единую функцию, 
которая без аргументов ведёт себя как геттер, а с аргументом – как сеттер.
Также можно организовать геттеры/сеттеры для свойства, не меняя структуры кода, 
через дескрипторы свойств.

Функциональное наследование
Наследование – это создание новых «классов» на основе существующих.

В веб-разработке нам могут понадобиться классы Меню, Табы, 
Диалог и другие компоненты интерфейса. В них всех обычно есть что-то общее.
Можно выделить такой общий функционал в класс Компонент и наследовать их от него, чтобы не дублировать код.

Чтобы наследник имел доступ к свойству, оно должно быть записано в this.
При этом, чтобы обозначить, что свойство является внутренним, его имя начинают с подчёркивания _.

Подчёркивание в начале свойства – общепринятый знак, что свойство является внутренним, 
предназначенным лишь для доступа из самого объекта и его наследников. Такие свойства называют защищёнными.
Технически, залезть в него из внешнего кода, конечно, возможно, но приличный программист так делать не будет.*/