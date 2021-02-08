//  Дата и время
//  Для работы со временем есть в JS есть специальный объект Date
//  Данный объект позволяет работать со временем и датами.
//  Дата работает на основе стандарта UNIXtime(POSIX-time)
//  Это значит, что Дата и время может быть преобразовано к обычному числу.
//  Причем, если это число равно 0, то дата равна 1 января 1970 года 0 часов, 0 минут, 0 секунд
//  Для объявления переменной и инициализации датой используется следующая функция
//  Конструктор.
let date = new Date();

//  У данной функции конструктора есть несколько форматов(5) создания времени
//  Формат создания зависит от типа и количества переданной ей аргументов
//  Рассмотрим каждый из них последовательно

//  1. Без аргументов
let date1 = new Date();
console.log(date1); //  2021-01-29T17:54:38.278Z
//  Когда создается дата и время подобным образом, в date1 записывается объект
//  созданный функцией конструктором, который содержит дату и время на момент
//  выполнения вызова функции конструктора

//  2. Первый и едиственный аргумент число
let date2 = new Date(6 * 24 * 60 * 60 * 1000);
console.log(date2); //  7 января 1970

//  Когда создается дата и время подобным образом, в date2 записывается объект
//  созданный функцией конструктором, который содержит дату и время равный
//  (1970-01-01 00:00:00 + количество миллисекунд), указанных первым аргументом 

//  3. Первый и единственный аргумент строка
let date3 = new Date('2021-01-08T00:00:00.000Z');

//  Когда создается дата и время подобным образом, в date3 записывается объект
//  созданный функцией конструктором, который содержит дату и время равный
//  дате и времени указаной в строке. ВАЖНО! строка формируется именно в таком шаблоне.
//  (ISO-стандарт)

//  4. Два и более аргумента числа
let date4 = new Date(1999, 10, 4, 12, 30, 45, 888);

//  Когда создается дата и время подобным образом, в date4 записывается объект
//  созданный функцией конструктором, который содержит дату и время со следующей информацией:
//  1 - год         - критический
//  2 - месяц       - критический. ВАЖНО! в JS месяцы исчисляются с 0. То есть 0 - январь, 11 - декабрь
//  3 - день        - опциональный (1 день по умолчанию)
//  4 - часы        - опциональный (0)
//  5 - минуты      - опциональный (0)
//  6 - секунду     - опциональный (0)
//  7 - миллисекунды - опциональный (0)

//  В основном используется 1 2 и 4 форма создания даты, поскольку данные формы достаточно просты для работы
//  3 используется только при работе со строковым форматом и в основном используется имено для преобразования
//  даты из строчной формы в объект дату

//  Методы для работы с датой.
//  Для работы с датой есть небольшое количество методов. Данные методы позволяют
//  производить простые операции. 

/*
Рассмотрим методы получения данных из объекта даты:
    1. getFullYear() - получить год из объекта-даты (минимальное значение 1970)
    2. getMonth() - получить номер месяца из объекта-даты (от 0 до 11, 0 - январь, 11 - декабрь)
    3. getDate() - получить номер дня в месяце из объекта-даты (от 1 до 31)
    4. getDay() - получить номер дня недели из объекта-даты (от 0 до 6, 0 - воскресенье, 6 - суббота)
    5. getHours() - получить часы из объекта-даты
    6. getMinutes() - получить минуты из объекта-даты
    7. getSeconds() - получить секунды из объекта-даты
    8. getMilliseconds() - получить миллисекунды из объекта-даты

    ПРИМЕРЫ:
*/

let testerForGet = new Date(2007, 9, 30, 23, 58, 61);
testerForGet.getFullYear();     //  2007
testerForGet.getMonth();        //  9 - октябрь
testerForGet.getDate();         //  30 число
testerForGet.getDay();          //  2 - вторник
testerForGet.getHours();        //  23 часа
testerForGet.getMinutes();      //  59 минут
testerForGet.getSeconds();      //  1 секунда
testerForGet.getMilliseconds(); //  0 миллисекунд

//  Для данных методов учитывается "часовой пояс". То есть данные методы возвращают дату с учетом часового пояса
//  Если, есть дублирующие методы, возвращающие дату по гринвичу(Лондонское время)
//  getFullYear => getUTCFullYear()
//  getMonth => getUTCMonth()
//  и так далее по аналогии
//  Пример:

testerForGet.getUTCFullYear();      //  2007
testerForGet.getUTCMonth();         //  9 - октябрь
testerForGet.getUTCDate();          //  30 число
testerForGet.getUTCDay();           //  2 - вторник
testerForGet.getUTCHours();         //  20 часов
testerForGet.getUTCMinutes();       //  59 минут
testerForGet.getUTCSeconds();       //  1 секунда
testerForGet.getUTCMilliseconds();  //  0 миллисекунд

//  Установка компонентов даты
//  Мы рассмотрели методы получения данных из объекта-даты
//  Есть методы противоложные получению - установка
//  они схожи с обычными методами getFullYear()..., все кроме getDay()
//  только get меняется на set
/*
.setFullYear(1999);
.setMonth(5);
.setDate(3);
.setHours(12);
.setMinutes(45);
.setSeconds(54);
.setMilliseconds(876);
*/

/*
    Из примеров выше, заметно, что объект-дата позволяет автоматически исправит 
    ошибки установки частей даты и времени, перенося на следующий компонент

    Пример 
    секунды 120 => добавлено 2 минуты к части минут
    или -120 => отнять 2 минуты из части минут
*/

//  Мутация.
//  Объект-даты и времени, имеет свои собственные правила мутации. Обычно она мутирует к строке. 
testerForGet + 2; //  'Tue Oct 30 2007 23:59:01 GMT+0300 (GMT+03:00)2'

//  Однако, с операцией разница или "со знаком + перед объектом-датой"(короткая запись преобразования к числу)
//  объект-дата будет преобразовываться
//  к числу: Количеству миллисекунд прошедших с 1970 1 января 00:00:00
//  Пример:
testerForGet - 2;   //  1193777941877
+ testerForGet;     //  1193777941879


//  Дополнительные 2 метода
//  Метод получения из даты-объекта количества миллисекунд прошедших с 1970... 
//  .getTime()
//  Пример
let millisec = testerForGet.getTime();
millisec;    //  1193777941879

//  Метод получения количества миллисекунд прошедших с 1970... начиная с текущего момента
//  Важно! данный метод вызывается у множества Дат, чтобы получить количество миллисекунд
//  Date.now() 
//  Пример
Date.now() //  аналогично (new Date()).getTime()


/*  
    Зачем вообще такая путаница?
    Все просто, с числом проще работать чем со строкой. Поэтому, есть некоторые моменты для
    преобразования даты к числу и наоборот. Еще одним моментом такой путаницы и почему работает
    операция вычитания с датами, служит использование объект-дат в качестве замера времени и
    определения промежутков времени

    Пример
*/

let start = new Date();

let k;
for (let i = 0; i < 10000000; i++) {
    k = 0;
    for (let j = 0; j < 1000000; j++)
        k++;
}

let diff = new Date() - start;
//  diff - время выполнения 2-х циклов
/*
    Данный метод не очень точный, поскольку минимальной величиной измерения является 
    миллисекунда
*/

//  Преобразования объекту-даты к строкам
//  Помимо рассмотренных методов получения из объекта-даты существуют методы получения даты или времени или того
//  и другого в виде строки
//  Разберем методы
let example = new Date();
//  toISOString() - метод получения даты и времени в формате ISO  YYYY-MM-DDTHH:mm:ss.sssZ
example.toISOString();  //  2021-01-24T18:22:44.453Z

//  toDateString() - метод получения только даты в формате
example.toDateString()  //  Sun Jan 24 2021

//  toLocaleString(locale, options) - метод получения даты и времени в настраиваемом формате
//  locale - опциональный - устанавливает язык и привычный формат для вывода по стандарту BCP-47 
//  Например английский формат "en", а русский "ru-RU" (с русским работает плохо)
//  options - опциональный - объект
/*
    * localeMatcher - Используемый алгоритм сопоставления локалей. 
    Возможными значениями являются "lookup" и "best fit"; 
    значением по умолчанию является "best fit"
    
    * timeZone - Используемый часовой пояс. 
    Единственным значением, которые реализации обязаны распознавать, является "UTC"; 
    значением по умолчанию является часовой пояс по умолчанию среды выполнения.

    * hour12 - Определяет, использовать ли 12-ти часовой формат времени (в противовес 24-х часовому). 
    Возможными значениями являются true и false; значение по умолчанию зависит от локали.

    * formatMatcher - Используемый алгоритм сопоставления форматов.

    * weekday - Представление дней недели. 
    Возможными значениями являются "narrow", "short" и "long".

    * era - Представление эр. Возможными значениями являются "narrow", "short" и "long".
    * year - Представление лет. Возможными значениями являются "numeric" и "2-digit".
    * month - Представление месяцев. Возможными значениями являются "numeric", "2-digit", "narrow", "short" и "long".
    * day - Представление дней. Возможными значениями являются "numeric" и "2-digit".
    * hour - Представление часов. Возможными значениями являются "numeric" и "2-digit".
    * minute - Представление минут. Возможными значениями являются "numeric" и "2-digit".
    * second - Представление секунд. Возможными значениями являются "numeric" и "2-digit".
    * timeZoneName - Представление названий часовых поясов. Возможными значениями являются "short" и "long".

    Пример использования
*/
example = new Date();

example.toLocaleString('en', {
    year: "2-digit",
    weekday: 'long',
    month: 'long',
    day: "2-digit",
    second: "numeric",
    timeZoneName: 'long'
}); // 'Sunday, January 24, 21, 56 Moscow Standard Time'

example.toLocaleString('en', {
    year: "numeric",
    weekday: 'short',
    month: '2-digit',
    day: "2-digit",
    minute: "numeric",
    timeZoneName: 'short'
}); // 'Sun, 01/24/2021, 47 GMT+3'

/**
 * ЗАДАНИЯ
 */

/*
    №1. Создай объект-дату со следующей датой 2077 6 июля 10 часов 29 минут 50 секунд
    любым способом
*/

/*
    №2. Создай объект-дату со следующией датой 1986 26 апреля 21:23 UTC с помощью строки
*/

/*
    №3. Написать функцию getDateToString(), которая выводит даты в привычном для россии и СНГ формате
    Формат: DD.MM.YYYY HH:MM:ss 
*/

/*
    №4. Модифицировать функцию getDateToString() так, чтобы если в качестве первого аргумента был передан true
    то возвращалась бы длиная запись даты, во всех других случаях как раньше
    Формат: DD.MM.YYYY HH:MM:ss 

    Пример: 
        getDateToString()       //  21.05.2007 21:00:43
        getDateToString(true)   //  ПН 21 мая 2007 
*/

/*
    №5. Ваш коллега написал функцию по возведению числа в куб. Вам надо замерить время выполнения функции.
    
*/

function calcCubing(a) {
    a = a * a;
    let prevA;
    for (let i = -1000; i < Math.abs(a); i ++) {
        if (Math.sqrt(a) == i) {
            prevA = i;
        }
    }
    a = prevA * a;
    return;
}

/*
    №6. Исправьте его функцию и посмотрите разницу во времени выполнения функции
*/