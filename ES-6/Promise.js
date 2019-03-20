/*Promise – это специальный объект, который содержит своё состояние. 
Вначале pending («ожидание»), затем – одно из: fulfilled («выполнено успешно»)
или rejected («выполнено с ошибкой»).

На promise можно навешивать коллбэки двух типов:
  onFulfilled – срабатывают, когда promise в состоянии «выполнен успешно».
  onRejected – срабатывают, когда promise в состоянии «выполнен с ошибкой».

Способ использования, в общих чертах, такой:
1  Код, которому надо сделать что-то асинхронно, создаёт объект promise и возвращает его.
2  Внешний код, получив promise, навешивает на него обработчики.
3  По завершении процесса асинхронный код переводит promise в состояние fulfilled (с результатом) или rejected (с ошибкой). При этом автоматически вызываются соответствующие обработчики во внешнем коде.*/

var promise = new Promise(function(resolve, reject) {
  // Эта функция будет вызвана автоматически
  // В ней можно делать любые асинхронные операции,
  // А когда они завершатся — нужно вызвать одно из:
  // resolve(результат) при успешном выполнении
  // reject(ошибка) при ошибке
});

// Универсальный метод для навешивания обработчиков:
promise.then(onFulfilled, onRejected);
//  onFulfilled – функция, которая будет вызвана с результатом при resolve.
//  onRejected – функция, которая будет вызвана с ошибкой при reject.

//  С его помощью можно назначить как оба обработчика сразу, так и только один:
// onFulfilled сработает при успешном выполнении
promise.then(onFulfilled);
// onRejected сработает при ошибке
promise.then(null, onRejected);

/*  .catch
Для того, чтобы поставить обработчик только на ошибку, вместо .then(null, onRejected) можно написать .catch(onRejected) – это то же самое.*/


/*Синхронный throw – то же самое, что reject
Если в функции промиса происходит синхронный throw (или иная ошибка), то вызывается reject:*/
'use strict';
let p = new Promise((resolve, reject) => {
  // то же что reject(new Error("o_O"))
  throw new Error("o_O");
})
p.catch(alert); // Error: o_O


//  Пример
'use strict';
// Создаётся объект promise
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // переведёт промис в состояние fulfilled с результатом "result"
    resolve("result");
  }, 1000);
});
// promise.then навешивает обработчики на успешный результат или ошибку
promise
  .then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
      alert("Fulfilled: " + result); // result - аргумент resolve
    },
    error => {
      // вторая функция - запустится при вызове reject
      alert("Rejected: " + error); // error - аргумент reject
    }
  );

/*В результате запуска кода выше – через 1 секунду выведется «Fulfilled: result».
А если бы вместо resolve("result") был вызов reject("error"), то вывелось бы «Rejected:
error». Впрочем, как правило, если при выполнении возникла проблема, то reject вызывают
не со строкой, а с объектом ошибки типа new Error:*/
// Этот promise завершится с ошибкой через 1 секунду
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("время вышло!"));
  }, 1000);
});
promise
  .then(
    result => alert("Fulfilled: " + result),
    error => alert("Rejected: " + error.message) // Rejected: время вышло!
  );
/*Конечно, вместо setTimeout внутри функции промиса может быть и запрос к серверу и 
ожидание ввода пользователя, или другой асинхронный процесс. Главное, чтобы по 
своему завершению он вызвал resolve или reject, которые передадут результат обработчикам.*/

/*Только один аргумент
Функции resolve/reject принимают ровно один аргумент – результат/ошибку.
Именно он передаётся обработчикам в .then, как можно видеть в примерах выше.*/



/*Promise после reject/resolve – неизменны
Заметим, что после вызова resolve/reject промис уже не может «передумать».
Когда промис переходит в состояние «выполнен» – с результатом (resolve) или ошибкой (reject) – это навсегда.*/
'use strict';
let promise = new Promise((resolve, reject) => {
  // через 1 секунду готов результат: result
  setTimeout(() => resolve("result"), 1000);
  // через 2 секунды — reject с ошибкой, он будет проигнорирован
  setTimeout(() => reject(new Error("ignored")), 2000);
});
promise
  .then(
    result => alert("Fulfilled: " + result), // сработает
    error => alert("Rejected: " + error) // не сработает
  );
/*В результате вызова этого кода сработает только первый обработчик then, 
так как после вызова resolve промис уже получил состояние (с результатом), 
и в дальнейшем его уже ничто не изменит.
Последующие вызовы resolve/reject будут просто проигнорированы.*/



/*Промисификация
Промисификация – это когда берут асинхронный функционал и делают для него обёртку, возвращающую промис.
После промисификации использование функционала зачастую становится гораздо удобнее.
В качестве примера сделаем такую обёртку для запросов при помощи XMLHttpRequest.
Функция httpGet(url) будет возвращать промис, который при успешной загрузке данных с url 
будет переходить в fulfilled с этими данными, а при ошибке – в rejected с информацией об ошибке:*/
function httpGet(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
    xhr.send();
  });
}
/*Как видно, внутри функции объект XMLHttpRequest создаётся и отсылается как обычно, при onload/onerror вызываются, соответственно, resolve (при статусе 200) или reject.
Применение*/
httpGet("/article/promise/user.json")
  .then(
    response => alert(`Fulfilled: ${response}`),
    error => alert(`Rejected: ${error}`)
  );


/*Цепочки промисов
«Чейнинг» (chaining), то есть возможность строить асинхронные цепочки из промисов – пожалуй, основная причина, из-за которой существуют и активно используются промисы.

Например, мы хотим по очереди:
1 Загрузить данные посетителя с сервера (асинхронно).
2 Затем отправить запрос о нём на github (асинхронно).
3 Когда это будет готово, вывести его github-аватар на экран (асинхронно).
4 …И сделать код расширяемым, чтобы цепочку можно было легко продолжить.
Вот код для этого, использующий функцию httpGet, описанную выше:*/
'use strict';
// сделать запрос
httpGet('/article/promise/user.json')
  // 1. Получить данные о пользователе в JSON и передать дальше
  .then(response => {
    console.log(response);
    let user = JSON.parse(response);
    return user;
  })
  // 2. Получить информацию с github
  .then(user => {
    console.log(user);
    return httpGet(`https://api.github.com/users/${user.name}`);
  })
  // 3. Вывести аватар на 3 секунды (можно с анимацией)
  .then(githubUser => {
    console.log(githubUser);
    githubUser = JSON.parse(githubUser);
    let img = new Image();
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 3000); // (*)
  });

/*При чейнинге, то есть последовательных вызовах .then…then…then, в каждый следующий then переходит результат от предыдущего. Вызовы console.log оставлены, чтобы при запуске можно было посмотреть конкретные значения, хотя они здесь и не очень важны.

Если очередной then вернул промис, то далее по цепочке будет передан не сам этот промис, а его результат.

  1 Функция в первом then возвращает «обычное» значение user. Это значит, что then возвратит промис в состоянии «выполнен» с user в качестве результата. Он станет аргументом в следующем then.
  2 Функция во втором then возвращает промис (результат нового вызова httpGet). Когда он будет завершён (может пройти какое-то время), то будет вызван следующий then с его результатом.
  3 Третий then ничего не возвращает.*/


/*Общее правило: если внутри then стартует новый асинхронный процесс, то для того, 
чтобы оставшаяся часть цепочки выполнилась после его окончания, мы должны вернуть промис.

Если then возвращает промис, то до его выполнения может пройти некоторое время, оставшаяся часть цепочки будет ждать.

То есть, логика довольно проста:
  В каждом then мы получаем текущий результат работы.
  Можно его обработать синхронно и вернуть результат (например, применить JSON.parse). Или же, если нужна асинхронная обработка – инициировать её и вернуть промис.*/


/*Перехват ошибок
Выше мы рассмотрели «идеальный случай» выполнения, когда ошибок нет.
А что, если github не отвечает? Или JSON.parse бросил синтаксическую ошибку при обработке данных?
Да мало ли, где ошибка… Правило здесь очень простое.
При возникновении ошибки – она отправляется в ближайший обработчик onRejected.
Такой обработчик нужно поставить через второй аргумент .then(..., onRejected) или, 
что то же самое, через .catch(onRejected).
Чтобы поймать всевозможные ошибки, которые возникнут при загрузке и обработке данных, 
добавим catch в конец нашей цепочки:*/
'use strict';
// в httpGet обратимся к несуществующей странице
httpGet('/page-not-exists')
  .then(response => JSON.parse(response))
  .then(user => httpGet(`https://api.github.com/users/${user.name}`))
  .then(githubUser => {
    githubUser = JSON.parse(githubUser);
    let img = new Image();
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.appendChild(img);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        img.remove();
        resolve();
      }, 3000);
    });
  })
  .catch(error => {
    alert(error); // Error: Not Found
  });

/*В примере выше ошибка возникает в первом же httpGet, но catch с тем же успехом 
поймал бы ошибку во втором httpGet или в JSON.parse.
Принцип очень похож на обычный try..catch: мы делаем асинхронную цепочку из .then, 
а затем, в том месте кода, где нужно перехватить ошибки, вызываем .catch(onRejected).

А что после catch?
Обработчик .catch(onRejected) получает ошибку и должен обработать её.

Есть два варианта развития событий:
  1 Если ошибка не критичная, то onRejected возвращает значение через return, и управление переходит в ближайший .then(onFulfilled).
  2 Если продолжить выполнение с такой ошибкой нельзя, то он делает throw, и тогда ошибка переходит в следующий ближайший .catch(onRejected).
Это также похоже на обычный try..catch – в блоке catch ошибка либо обрабатывается, и тогда выполнение кода продолжается как обычно, либо он делает throw. Существенное отличие – в том, что промисы асинхронные, поэтому при отсутствии внешнего .catch ошибка не «вываливается» в консоль и не «убивает» скрипт.

Ведь возможно, что новый обработчик .catch будет добавлен в цепочку позже*/




/*Промисы в деталях
Согласно стандарту, у объекта new Promise(executor) при создании есть четыре внутренних свойства:
  PromiseState – состояние, вначале «pending».
  PromiseResult – результат, при создании значения нет.
  PromiseFulfillReactions – список функций-обработчиков успешного выполнения.
  PromiseRejectReactions – список функций-обработчиков ошибки.

Когда функция-executor вызывает reject или resolve, то PromiseState становится "resolved" или "rejected", а все функции-обработчики из соответствующего списка перемещаются в специальную системную очередь "PromiseJobs".

Эта очередь автоматически выполняется, когда интерпретатору «нечего делать». Иначе говоря, все функции-обработчики выполнятся асинхронно, одна за другой, по завершении текущего кода, примерно как setTimeout(..,0).

Исключение из этого правила – если resolve возвращает другой Promise. Тогда дальнейшее выполнение ожидает его результата (в очередь помещается специальная задача), и функции-обработчики выполняются уже с ним.

Добавляет обработчики в списки один метод: .then(onResolved, onRejected). Метод .catch(onRejected) – всего лишь сокращённая запись .then(null, onRejected).

Он делает следующее:
Если PromiseState == "pending", то есть промис ещё не выполнен, то обработчики добавляются в соответствующие списки.
Иначе обработчики сразу помещаются в очередь на выполнение.


*/




/*Параллельное выполнение

Promise.all(iterable)
Вызов Promise.all(iterable) получает массив (или другой итерируемый объект) промисов и возвращает промис, который ждёт, пока все переданные промисы завершатся, и переходит в состояние «выполнено» с массивом их результатов.*/
Promise.all([
  httpGet('/article/promise/user.json'),
  httpGet('/article/promise/guest.json')
]).then(results => {
  alert(results);
});

/*Допустим, у нас есть массив с URL. Чтобы загрузить их параллельно, нужно:
1 Создать для каждого URL соответствующий промис.
2 Обернуть массив таких промисов в Promise.all.*/
let urls = [
  '/article/promise/user.json',
  '/article/promise/guest.json'
];
Promise.all( urls.map(httpGet) )
  .then(results => { alert(results); });
/*Заметим, что если какой-то из промисов завершился с ошибкой, то результатом Promise.all будет эта ошибка. При этом остальные промисы игнорируются.*/
Promise.all([
  httpGet('/article/promise/user.json'),
  httpGet('/article/promise/guest.json'),
  httpGet('/article/promise/no-such-page.json') // (нет такой страницы)
]).then(
  result => alert("не сработает"),
  error => alert("Ошибка: " + error.message) // Ошибка: Not Found
)

/*Promise.race(iterable)
Вызов Promise.race, как и Promise.all, получает итерируемый объект с промисами, которые нужно выполнить, и возвращает новый промис.
Но, в отличие от Promise.all, результатом будет только первый успешно выполнившийся промис из списка. Остальные игнорируются.*/
Promise.race([
  httpGet('/article/promise/user.json'),
  httpGet('/article/promise/guest.json')
]).then(firstResult => {
  firstResult = JSON.parse(firstResult);
  alert( firstResult.name ); // iliakan или guest, смотря что загрузится раньше
});


/*Promise.resolve(value)
Вызов Promise.resolve(value) создаёт успешно выполнившийся промис с результатом value.*/
new Promise((resolve) => resolve(value))
/*Promise.resolve используют, когда хотят построить асинхронную цепочку, и начальный результат уже есть.*/
Promise.resolve(window.location) // начать с этого значения
  .then(httpGet) // вызвать для него httpGet
  .then(alert) // и вывести результат

/*Promise.reject(error)
Аналогично Promise.reject(error) создаёт уже выполнившийся промис, но не с успешным результатом, а с ошибкой error.*/
Promise.reject(new Error("..."))
  .catch(alert) // Error: ...


/*Итого
Промис – это специальный объект, который хранит своё состояние, текущий результат (если есть) и коллбэки.
При создании new Promise((resolve, reject) => ...) автоматически запускается функция-аргумент, которая должна вызвать resolve(result) при успешном выполнении и reject(error) – при ошибке.
Аргумент resolve/reject (только первый, остальные игнорируются) передаётся обработчикам на этом промисе.
Обработчики назначаются вызовом .then/catch.
Для передачи результата от одного обработчика к другому используется чейнинг.*/
