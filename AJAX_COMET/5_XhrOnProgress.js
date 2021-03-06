/*XMLHttpRequest: индикация прогресса
Запрос XMLHttpRequest состоит из двух фаз:

	1 Стадия закачки (upload). На ней данные загружаются на сервер. Эта фаза может быть долгой для POST-запросов. Для отслеживания прогресса на стадии закачки существует объект типа XMLHttpRequestUpload, доступный как xhr.upload и события на нём.
	
	2 Стадия скачивания (download). После того, как данные загружены, браузер скачивает ответ с сервера. Если он большой, то это может занять существенное время. На этой стадии */


/*Стадия закачки
На стадии закачки для получения информации используем объект xhr.upload.
У этого объекта нет методов, он только генерирует события в процессе закачки. А они-то как раз и нужны.
Вот полный список событий:

	loadstart
	progress
	abort
	error
	load
	timeout
	loadend*/
xhr.upload.onprogress = function(event) {
  alert( 'Загружено на сервер ' + event.loaded + ' байт из ' + event.total );}

xhr.upload.onload = function() {
  alert( 'Данные полностью загружены на сервер!' );}

xhr.upload.onerror = function() {
  alert( 'Произошла ошибка при загрузке данных на сервер!' );}
	
	
/*Стадия скачивания
После того, как загрузка завершена, и сервер соизволит ответить на запрос, 
XMLHttpRequest начнёт скачивание ответа сервера.

На этой фазе xhr.upload уже не нужен, а в дело вступают обработчики событий на самом объекте xhr. 
В частности, событие xhr.onprogress содержит информацию о количестве принятых байт ответа.*/
xhr.onprogress = function(event) {
  alert( 'Получено с сервера ' + event.loaded + ' байт из ' + event.total );}

/*Все события, возникающие в этих обработчиках, имеют тип ProgressEvent, 
то есть имеют свойства loaded – количество уже пересланных данных в байтах и total – общее количество данных.*/




/*Событие onprogress в деталях
При обработке события onprogress есть ряд важных тонкостей.
Можно, конечно, их игнорировать, но лучше бы знать.
Заметим, что событие, возникающее при onprogress, имеет одинаковый вид на стадии закачки 
(в обработчике xhr.upload.onprogress) и при получении ответа (в обработчике xhr.onprogress).

Оно представляет собой объект типа ProgressEvent со свойствами:
	loaded	Сколько байт уже переслано.
	Имеется в виду только тело запроса, заголовки не учитываются.

	lengthComputable	Если true, то известно полное количество байт для пересылки, и оно хранится в свойстве total.

	total	Общее количество байт для пересылки, если известно.*/


/*А может ли оно быть неизвестно?

	- При закачке на сервер браузер всегда знает полный размер пересылаемых данных, так что total всегда содержит конкретное количество байт, а значение lengthComputable всегда будет true.
	
	-При скачивании данных – обычно сервер в начале сообщает их общее количество в HTTP-заголовке Content-Length. Но он может и не делать этого, например если сам не знает, сколько данных будет или если генерирует их динамически. Тогда total будет равно 0. А чтобы отличить нулевой размер данных от неизвестного – как раз служит lengthComputable, которое в данном случае равно false.*/


/*Ещё особенности, которые необходимо учитывать при использовании onprogress:

	Событие происходит при каждом полученном/отправленном байте, но не чаще чем раз в 50 мс.
	Это обозначено в спецификации progress notifications.

	В процессе получения данных, ещё до их полной передачи, доступен xhr.responseText, 
	но он не обязательно содержит корректную строку.
	Можно до окончания запроса заглянуть в него и прочитать текущие полученные данные. Важно, что при пересылке строки в кодировке UTF-8 кириллические символы, как, впрочем, и многие другие, кодируются 2 байтами. Возможно, что в конце одного пакета данных окажется первая половинка символа, а в начале следующего – вторая. Поэтому полагаться на то, что до окончания запроса в responseText находится корректная строка нельзя. Она может быть обрезана посередине символа.
	Исключение – заведомо однобайтные символы, например цифры или латиница.

	Сработавшее событие xhr.upload.onprogress не гарантирует, что данные дошли.
	Событие xhr.upload.onprogress срабатывает, когда данные отправлены браузером. 
	Но оно не гарантирует, что сервер получил, обработал и записал данные на диск. 
	Он говорит лишь о самом факте отправки.
	Поэтому прогресс-индикатор, получаемый при его помощи, носит приблизительный и оптимистичный характер.*/


/*Файлы и формы
Выше мы использовали xhr.send(file) для передачи файла непосредственно в теле запроса.
При этом посылается только содержимое файла.
Если нужно дополнительно передать имя файла или что-то ещё – это можно удобно сделать через форму, при помощи объекта FormData:
Создадим форму formData и прибавим к ней поле с файлом file и именем "myfile":*/
var formData = new FormData();
formData.append("myfile", file);
xhr.send(formData);
/*Данные будут отправлены в кодировке multipart/form-data. 
Серверный фреймворк увидит это как обычную форму с файлом, практически все серверные технологии
имеют их встроенную поддержку. Индикация прогресса реализуется точно так же.*/













