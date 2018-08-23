/*
Степень pow(x, n) через рекурсию
*/

function pow(x, n) {
  if (n != 1) { // пока n != 1, сводить вычисление pow(x,n) к pow(x,n-1)
    return x * pow(x, n - 1);
  } else {
    return x;
  }
}

alert( pow(2, 3) ); // 8