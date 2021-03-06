/*Прототип объекта
Объекты в JavaScript можно организовать в цепочки так, чтобы свойство, 
не найденное в одном объекте, автоматически искалось бы в другом.
Связующим звеном выступает специальное свойство __proto__.

Прототип proto
Если один объект имеет специальную ссылку __proto__ на другой объект, 
то при чтении свойства из него, если свойство отсутствует в самом объекте, оно ищется в объекте __proto__.

Свойство __proto__ доступно во всех браузерах, кроме IE10-, а в более старых IE оно, 
конечно же, тоже есть, но напрямую к нему не обратиться, 
требуются чуть более сложные способы, которые мы рассмотрим позднее.

Объект, на который указывает ссылка __proto__, называется «прототипом». 
В данном случае получилось, что animal является прототипом для rabbit.
Также говорят, что объект rabbit «прототипно наследует» от animal.

Обратим внимание – прототип используется исключительно при чтении. 
Запись значения, например, rabbit.eats = value или 
удаление delete rabbit.eats – работает напрямую с объектом.

Другими словами, прототип – это «резервное хранилище свойств и методов» объекта, 
автоматически используемое при поиске.
У объекта, который является __proto__, может быть свой __proto__, у того – свой, 
и так далее. При этом свойства будут искаться по цепочке.
*/


/*Метод hasOwnProperty
Обычный цикл for..in не делает различия между свойствами объекта и его прототипа. Он перебирает всё
Иногда хочется посмотреть, что находится именно в самом объекте, а не в прототипе.
Вызов obj.hasOwnProperty(prop) возвращает true, если свойство prop 
принадлежит самому объекту obj, иначе false.*/


/*Object.create(null)
Объект, создаваемый при помощи Object.create(null) не имеет прототипа,
а значит в нём нет лишних свойств. Для коллекции – как раз то, что надо.*/



/*Методы для работы с proto
В современных браузерах есть два дополнительных метода для работы с __proto__. 
Зачем они нужны, если есть __proto__? В общем-то, не очень нужны, но по историческим причинам тоже существуют.

Чтение: Object.getPrototypeOf(obj)
	Возвращает obj.__proto__ (кроме IE8-)
Запись: Object.setPrototypeOf(obj, proto)
	Устанавливает obj.__proto__ = proto (кроме IE10-).
Кроме того, есть ещё один вспомогательный метод:
Создание объекта с прототипом: Object.create(proto, descriptors)
	Создаёт пустой объект с __proto__, равным первому аргументу (кроме IE8-), второй необязательный аргумент может содержать дескрипторы свойств.*/
	
	

/*Итого
В JavaScript есть встроенное «наследование» между объектами при помощи специального свойства __proto__.
При установке свойства rabbit.__proto__ = animal говорят, что объект animal будет «прототипом» rabbit.
При чтении свойства из объекта, если его в нём нет, оно ищется в __proto__. 
Прототип задействуется только при чтении свойства. 
Операции присвоения obj.prop = или удаления delete obj.prop 
совершаются всегда над самим объектом obj.*/


/*Свойство F.prototype и создание объектов через new
Чтобы новым объектам автоматически ставить прототип, конструктору ставится свойство prototype.
При создании объекта через new, в его прототип __proto__ записывается ссылка из prototype функции-конструктора.
Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее: 
"При создании объекта через new Rabbit запиши ему __proto__ = animal".*/
	
	
/*Свойство prototype имеет смысл только у конструктора
Свойство с именем prototype можно указать на любом объекте, но особый смысл оно имеет, 
лишь если назначено функции-конструктору.
Само по себе, без вызова оператора new, оно вообще ничего не делает, 
его единственное назначение – указывать __proto__ для новых объектов.*/

/*Значением prototype может быть только объект
Технически, в это свойство можно записать что угодно.

Однако, при работе new, свойство prototype будет использовано лишь в том случае, 
если это объект. Примитивное значение, такое как число или строка, будет проигнорировано.*/
	
	
/*Свойство constructor
У каждой функции по умолчанию уже есть свойство prototype.
Оно содержит объект такого вида:
function Rabbit() {}
Rabbit.prototype = {
  constructor: Rabbit
};
В коде выше я создал Rabbit.prototype вручную, но ровно такой же – генерируется автоматически.
Свойство constructor легко потерять
JavaScript никак не использует свойство constructor. То есть, оно создаётся автоматически, 
а что с ним происходит дальше – это уже наша забота. В стандарте прописано только его создание.
В частности, при перезаписи Rabbit.prototype = { jumps: true } свойства constructor больше не будет.
Сам интерпретатор JavaScript его в служебных целях не требует, поэтому в работе объектов ничего 
не «сломается». Но если мы хотим, чтобы возможность получить конструктор, всё же, была, 
то можно при перезаписи гарантировать наличие constructor вручную:*/
Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit};	
/*Либо можно поступить аккуратно и добавить свойства к встроенному prototype без его замены:*/
// сохранится встроенный constructor
Rabbit.prototype.jumps = true	

/*Итого
Для произвольной функции – назовём её Person, верно следующее:

Прототип __proto__ новых объектов, создаваемых через new Person, можно задавать при помощи свойства Person.prototype.
Значением Person.prototype по умолчанию является объект с единственным свойством constructor, 
содержащим ссылку на Person. Его можно использовать, чтобы из самого объекта получить функцию, 
которая его создала. Однако, JavaScript никак не поддерживает корректность этого свойства, 
поэтому программист может его изменить или удалить.
Современный метод Object.create(proto) можно эмулировать при помощи prototype, 
если хочется, чтобы он работал в IE8-.*/
	
	
/*Один из способов безопасно назначить значения по умолчанию – скопировать все свойства options 
в локальные переменные и затем уже менять. Другой способ – клонировать options 
путём копирования всех свойств из него в новый объект, который уже изменяется.

При помощи наследования и Object.create предложите третий способ, 
который позволяет избежать копирования объекта и не требует новых переменных.
Можно прототипно унаследовать от options и добавлять/менять опции в наследнике:*/	
function Menu(options) {
  options = Object.create(options);
  options.width = 300;

  alert("width: " + options.width); // возьмёт width из наследника
  alert("height: " + options.height); // возьмёт height из исходного объекта
}

var options = {
  width: 100,
  height: 200
};

var menu = new Menu(options);

alert("original width: " + options.width); // width исходного объекта
alert("original height: " + options.height); // height исходного объекта	
/*Все изменения будут происходить не в исходном options, а в его наследнике, при этом options останется незатронутым.*/
	
	
	
	
/*Аргументы по умолчанию
Есть функция Menu, которая получает аргументы в виде объекта options.
Можно прототипно унаследовать от options и добавлять/менять опции в наследнике.
Все изменения будут происходить не в исходном options, а в его наследнике, 
при этом options останется незатронутым.
*/
function Menu(options) {
  options = Object.create(options);
  options.width = 300;
  alert("width: " + options.width); // возьмёт width из наследника
  alert("height: " + options.height); // возьмёт height из исходного объекта
}
var options = {
  width: 100,
  height: 200
};
var menu = new Menu(options);
alert("original width: " + options.width); // width исходного объекта
alert("original height: " + options.height); // height исходного объекта





/*«Псевдоклассом» или, более коротко, «классом», называют функцию-конструктор вместе с её prototype. 
Такой способ объявления классов называют «прототипным стилем ООП».
При наследовании часть методов переопределяется, например, 
у массива Array есть свой toString, который выводит элементы массива через запятую:*/


/*Примитивы
Примитивы не являются объектами, но методы берут из соответствующих прототипов:
Number.prototype, Boolean.prototype, String.prototype.
По стандарту, если обратиться к свойству числа, строки или логического значения, 
то будет создан объект соответствующего типа, например new String для строки, 
new Number для чисел, new Boolean – для логических выражений.

Далее будет произведена операция со свойством или вызов метода по обычным правилам,
с поиском в прототипе, а затем этот объект будет уничтожен.*/

/*Конструкторы String/Number/Boolean – только для внутреннего использования
Технически, можно создавать объекты для примитивов и вручную, например new Number. 
Но в ряде случаев получится откровенно бредовое поведение.
Поэтому в явном виде new String, new Number и new Boolean никогда не вызываются.*/

/*Значения null и undefined не имеют свойств
Значения null и undefined стоят особняком. Вышесказанное к ним не относится.
Для них нет соответствующих классов, в них нельзя записать свойство (будет ошибка),
в общем, на конкурсе «самое примитивное значение» они точно разделили бы первое место.*/

/*Итого
Методы встроенных объектов хранятся в их прототипах.

Встроенные прототипы можно расширить или поменять.

Добавление методов в Object.prototype, если оно не
сопровождается Object.defineProperty с установкой enumerable (IE9+),
«сломает» циклы for..in, поэтому стараются в этот прототип методы не добавлять.

Другие прототипы изменять менее опасно, но все же не рекомендуется во избежание конфликтов.

Отдельно стоит изменение с целью добавления современных методов в старые браузеры,
таких как Object.create, Object.keys, Function.prototype.bind и т.п. 
Это допустимо и как раз делается es5-shim.*/


/*Свои классы на прототипах*/
/*Чтобы объявить свой класс, нужно:
	Объявить функцию-конструктор.
	Записать методы и свойства, нужные всем объектам класса, в prototype.
Опишем класс Animal:
В объекте animal будут храниться свойства конкретного экземпляра: name и speed, а общие методы – в прототипе.
Совершенно такой же подход, как и для встроенных классов в JavaScript.*/
// конструктор
function Animal(name) {
  this.name = name;
  this.speed = 0;
}
// методы в прототипе
Animal.prototype.run = function(speed) {
  this.speed += speed;
  alert( this.name + ' бежит, скорость ' + this.speed );
};
Animal.prototype.stop = function() {
  this.speed = 0;
  alert( this.name + ' стоит' );
};
var animal = new Animal('Зверь');
alert( animal.speed ); // 0, свойство взято из прототипа
animal.run(5); // Зверь бежит, скорость 5
animal.run(5); // Зверь бежит, скорость 10
animal.stop(); // Зверь стоит


/*При создании методов через прототип, мы теряем возможность использовать локальные 
переменные как приватные свойства, у них больше нет общей области видимости с конструктором.
При задании методов в прототипе мы не сможем её так оставить, 
ведь методы находятся вне конструктора, у них нет общей области видимости, 
поэтому приходится записывать name в сам объект, обозначив его как защищённое:*/
function Animal(name) {this._name = name;}
Animal.prototype.sayHi = function() {
  alert( this._name );
}
var animal = new Animal("Зверь");
animal.sayHi(); // Зверь


/*Наследование классов в JavaScript

Наследование на уровне объектов в JavaScript, как мы видели, реализуется через ссылку __proto__.
Теперь поговорим о наследовании на уровне классов, то есть когда объекты, создаваемые, 
к примеру, через new Admin, должны иметь все методы, которые есть у 
объектов, создаваемых через new User, и ещё какие-то свои.
*/
// 1. Конструктор Animal
function Animal(name) { this.name = name; this.speed = 0;}
// 1.1. Методы -- в прототип
Animal.prototype.stop = function() {
  this.speed = 0;
  alert( this.name + ' стоит' );
}
Animal.prototype.run = function(speed) {
  this.speed += speed;
  alert( this.name + ' бежит, скорость ' + this.speed );
};
// 2. Конструктор Rabbit
function Rabbit(name) {
  this.name = name;
  this.speed = 0;
}
// 2.1. Наследование
Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;
// 2.2. Методы Rabbit
Rabbit.prototype.jump = function() {
  this.speed++;
  alert( this.name + ' прыгает, скорость ' + this.speed );
}
/*Обратим внимание: Rabbit.prototype = Object.create(Animal.prototype) 
присваивается сразу после объявления конструктора, иначе он перезатрёт уже записанные в прототип методы.*/

/*Вызов конструктора родителя
Чтобы упростить поддержку кода, имеет смысл не дублировать код конструктора Animal, а напрямую вызвать его:
function Rabbit(name) {
  Animal.apply(this, arguments);
}
Такой вызов запустит функцию Animal в контексте текущего объекта, со всеми аргументами, 
она выполнится и запишет в this всё, что нужно.
Здесь можно было бы использовать и Animal.call(this, name), 
но apply надёжнее, так как работает с любым количеством аргументов.
*/

/*Переопределение метода
Rabbit наследует Animal. Теперь если какого-то метода нет в Rabbit.prototype – он будет взят из Animal.prototype.

В Rabbit может понадобиться задать какие-то методы, которые у родителя уже есть. 
Например, кролики бегают не так, как остальные животные, поэтому переопределим метод run():
Rabbit.prototype.run = function(speed) {
  this.speed++;
  this.jump();
};*/

/*Вызов метода родителя внутри своего
Более частая ситуация – когда мы хотим не просто заменить метод на свой, 
а взять метод родителя и расширить его. Скажем, кролик бежит так же, 
как и другие звери, но время от времени подпрыгивает.
Для вызова метода родителя можно обратиться к нему напрямую, взяв из прототипа:
Rabbit.prototype.run = function() {
   // вызвать метод родителя, передав ему текущие аргументы
   Animal.prototype.run.apply(this, arguments);
   this.jump();
 }
 Обратите внимание на вызов через apply и явное указание контекста.
Если вызвать просто Animal.prototype.run(), то в качестве this функция run 
получит Animal.prototype, а это неверно, нужен текущий объект.*/

/*Итого
	Для наследования нужно, чтобы «склад методов потомка» (Child.prototype) 
	наследовал от «склада метода родителей» (Parent.prototype).
	Это можно сделать при помощи Object.create:	Код:
	Rabbit.prototype = Object.create(Animal.prototype);
	
	Для того, чтобы наследник создавался так же, как и родитель, 
	он вызывает конструктор родителя в своём контексте, 
	используя apply(this, arguments), вот так:
	function Rabbit(...) {
	Animal.apply(this, arguments);
	}
	
	При переопределении метода родителя в потомке, к исходному методу
	можно обратиться, взяв его напрямую из прототипа:
	Rabbit.prototype.run = function() {
	var result = Animal.prototype.run.apply(this, ...);
	// result -- результат вызова метода родителя
}

Структура наследования полностью:*/
// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
  this.name = name;
  this.speed = 0;
}
// Методы хранятся в прототипе
Animal.prototype.run = function() {
  alert(this.name + " бежит!");
}
// --------- Класс-потомок -----------
// Конструктор потомка
function Rabbit(name) {
  Animal.apply(this, arguments);
}
// Унаследовать
Rabbit.prototype = Object.create(Animal.prototype);
// Желательно и constructor сохранить
Rabbit.prototype.constructor = Rabbit;
// Методы потомка
Rabbit.prototype.run = function() {
  // Вызов метода родителя внутри своего
  Animal.prototype.run.apply(this);
  alert( this.name + " подпрыгивает!" );
};
// Готово, можно создавать объекты
var rabbit = new Rabbit('Кроль');
rabbit.run();

/*Такое наследование лучше функционального стиля, так как не дублирует методы в каждом объекте.
Кроме того, есть ещё неявное, но очень важное архитектурное отличие.
Зачастую вызов конструктора имеет какие-то побочные эффекты, например влияет на документ. 
Если конструктор родителя имеет какое-то поведение, которое нужно переопределить в потомке, 
то в функциональном стиле это невозможно.
Иначе говоря, в функциональном стиле в процессе создания Rabbit нужно обязательно 
вызывать Animal.apply(this, arguments), чтобы получить методы родителя – и если этот 
Animal.apply кроме добавления методов говорит: «Му-у-у!», то это проблема:
…Которой нет в прототипном подходе, потому что в процессе создания new Rabbit мы вовсе не обязаны вызывать конструктор родителя. Ведь методы находятся в прототипе.

Поэтому прототипный подход стоит предпочитать функциональному как более быстрый и универсальный. 
А что касается красоты синтаксиса – она сильно лучше в новом стандарте ES6, 
которым можно пользоваться уже сейчас, если взять транслятор babeljs.*/



/*Проверка класса: "instanceof"
Оператор instanceof позволяет проверить, какому классу принадлежит объект, 
с учетом прототипного наследования.

Алгоритм работы instanceof
Вызов obj instanceof Constructor возвращает true, если объект принадлежит 
классу Constructor или классу, наследующему от него.
Пример использования:*/
function Rabbit() {}
// создаём объект
var rabbit = new Rabbit();
// проверяем -- этот объект создан Rabbit?
alert( rabbit instanceof Rabbit ); // true, верно

/*Массив arr принадлежит классу Array, но также и является объектом Object. 
Это верно, так как массивы наследуют от объектов:*/
var arr = [];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
/*Как это часто бывает в JavaScript, здесь есть ряд тонкостей. 
Проверка происходит через сравнение прототипов, поэтому в некоторых ситуациях может даже ошибаться!

Алгоритм проверки obj instanceof Constructor:
	1. Получить obj.__proto__
	2. Сравнить obj.__proto__ с Constructor.prototype
	3. Если не совпадает, тогда заменить obj на obj.__proto__ и повторить проверку на шаге 2 до тех пор, 
	пока либо не найдется совпадение (результат true), либо цепочка прототипов не закончится (результат false).

В проверке rabbit instanceof Rabbit совпадение происходит на первом же шаге этого алгоритма, 
так как: rabbit.__proto__ == Rabbit.prototype.
А если рассмотреть arr instanceof Object, то совпадение будет найдено на следующем шаге, 
так как arr.__proto__.__proto__ == Object.prototype.
Забавно, что сама функция-конструктор не участвует в процессе проверки! 
Важна только цепочка прототипов для проверяемого объекта.

Это может приводить к забавному результату и даже ошибкам в проверке при изменении prototype, например:*/
// Создаём объект rabbit, как обычно
function Rabbit() {}
var rabbit = new Rabbit();
// изменили prototype...
Rabbit.prototype = {};
// ...instanceof перестал работать!
alert( rabbit instanceof Rabbit ); // false

/*Стоит ли говорить, что это один из доводов для того, чтобы никогда не менять prototype? Так сказать, во избежание.

Не друзья: instanceof и фреймы
Оператор instanceof не срабатывает, когда значение приходит из другого окна или фрейма.
Например, массив, который создан в ифрейме и передан родительскому окну – будет массивом в том ифрейме, но не в родительском окне. Проверка instanceof Array в родительском окне вернёт false.
Вообще, у каждого окна и фрейма – своя иерархия объектов и свой window .
Как правило, эта проблема возникает со встроенными объектами, в этом случае используется проверка внутреннего свойства [[Class]], которое подробнее описано в главе Типы данных: [[Class]], instanceof и утки.*/

/*Итого
Оператор obj instanceof Func проверяет тот факт, что obj является результатом вызова new Func. 
Он учитывает цепочку __proto__, поэтому наследование поддерживается.
Оператор instanceof не сможет проверить тип значения, если объект создан в одном окне/фрейме, а проверяется в другом. Это потому, что в каждом окне – своя иерархия объектов. Для точной проверки типов встроенных объектов можно использовать свойство [[Class]].
Оператор instanceof особенно востребован в случаях, когда мы работаем с иерархиями классов. Это наилучший способ проверить принадлежность тому или иному классу с учётом наследования.*/






































