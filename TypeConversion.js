// явное преобразование

String(455);
Boolean(455);
Number('455');

console.log(typeof String(455));
console.log(typeof Boolean(455));
console.log(typeof Number('455'));


console.log( 5 + '');  // быстро в строку
console.log( +'356');  // быстро в число
console.log( +'');
console.log( + true);
console.log( + false);
console.log( !!'535');  // быстро в буль


var num = 555;
console.log(num.toString());


parseInt('100 px', 10);
console.log( parseInt('100 px', 10) );


parseFloat('100.23 px', 10);
console.log( parseFloat('100.23 px') );