/*
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...;
    [break]

  case 'value2':  // if (x === 'value2')
    ...;
    [break]

  default:
    ...;
    [break]
}

Если соответствие установлено – switch начинает выполняться 
от соответствующей директивы case и далее, до ближайшего break (или до конца switch).
Если ни один case не совпал – выполняется (если есть) вариант default.
*/

var a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Маловато' );
    break;
  case 4:
    alert( 'В точку!' );
    break;
  case 5:
    alert( 'Перебор' );
    break;
  default:
    alert( 'Я таких значений не знаю' );
}