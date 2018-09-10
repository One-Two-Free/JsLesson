/*Функции в JavaScript никак не привязаны к своему контексту this, 
с одной стороны, здорово – это позволяет быть максимально гибкими, одалживать методы и так далее.
Но с другой стороны – в некоторых случаях контекст может быть потерян. 
То есть мы вроде как вызываем метод объекта, а на самом деле он получает this = undefined.
Такая ситуация является типичной для начинающих разработчиков, но бывает и у «зубров» тоже. 
Конечно, «зубры» при этом знают, что с ней делать.*/

/*Синтаксис встроенного bind:
var wrapper = func.bind(context[, arg1, arg2...])
func	Произвольная функция
context	Контекст, который привязывается к func
arg1, arg2, …	Если указаны аргументы arg1, arg2... – они будут прибавлены 
к каждому вызову новой функции, причем встанут перед теми, которые указаны при вызове.*/

/*bind не похож на call/apply
Методы bind и call/apply близки по синтаксису, но есть важнейшее отличие.
Методы call/apply вызывают функцию с заданным контекстом и аргументами.
А bind не вызывает функцию. Он только возвращает «обёртку», 
которую мы можем вызвать позже, и которая передаст вызов в исходную функцию, с привязанным контекстом.*/

/*Привязать всё: bindAll
Если у объекта много методов и мы планируем их активно передавать, 
то можно привязать контекст для них всех в цикле:
В некоторых JS-фреймворках есть даже встроенные функции для этого, например _.bindAll(obj).*/
for (var prop in user) {
  if (typeof user[prop] == 'function') {
    user[prop] = user[prop].bind(user);
  }
}

/*Карринг
Карринг (currying) или каррирование – термин функционального программирования, который означает создание новой функции путём фиксирования аргументов существующей.*/

/*Итого
Функция сама по себе не запоминает контекст выполнения.
Чтобы гарантировать правильный контекст для вызова obj.func(), нужно использовать функцию-обёртку, задать её через анонимную функцию:*/
setTimeout(function() {
  obj.func();
})
/*…Либо использовать bind:

setTimeout(obj.func.bind(obj));
Вызов bind часто используют для привязки функции к контексту, чтобы затем присвоить её в обычную переменную и вызывать уже без явного указания объекта.

Вызов bind также позволяет фиксировать первые аргументы функции («каррировать» её), и таким образом из общей функции получить её «частные» варианты – чтобы использовать их многократно без повтора одних и тех же аргументов каждый раз.*/