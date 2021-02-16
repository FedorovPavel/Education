//  Регулярные выражения
//  Регулярные выражения(в общ.) - формальный язык поиска и осуществления манипуляций с подстроками в тексте,
//  основанный на использовании метасимволов.
//  Регулярные выражения(JavaScript) - это объект-регулярного выражения, позволяющий производить
//  сопоставление одной строки к шаблону.
//  Для чего нужны регулярные выражения?
//  Чтобы сделать поиск по тексту более гибким, не привязанным к конкретному значению

//  Создание регулярных выражений
//  Создать регулярное выражение можно 2 способами
//  1. С помощью Функции-конструктора RegExp
let literal = new RegExp('pattern');
let literal2 = new RegExp('pattern', 'gi');
//  Данная функция-конструктор принимает 2 аргумента
//  1. КРИТИЧЕСКИЙ - задает шаблон для сопоставлений в других текстах
//  Может быть строкой или другим RegExp или переменная имеющая значение строка
//  2. ОПЦИОНАЛЬНЫЙ - набор букв, где каждая буква - определенное свойство этого шаблона
//  Разбор флагов будет ниже

//  2. Статическое написание шаблона
let staticLiteral = /pattern/;
let staticLiteral2 = /pattern/gi;
//  Для создания с помощью статического шаблона необходимо написать //
//  Внутри данных / необходимо написать шаблон сопоставления. Флаги располагаются после
//  последнего /

//  Как они сопоставляют шаблон с текстом
//  У объектов-регулярных выражений есть свой собственный метод попоставления со строками
//  .test(srt)
//  Возвращает true - если шаблон был найдет в строке str
//  Возвращает false - если не было ни одного удачного сопоставления шаблона со строкой str
//  Рассмотрим пример
let text1 = 'Этот текст позовлит literal при вызове метода test вернуть true, pattern <- тут';
console.log(literal.test(text1));    //  true
let literal3 = /текста/;
console.log(literal3.test(text1));   //  false

//  Рассмотрим некоторые флаги
//  i - игнорирование регистра.
let textForI = 'ЯбЛоКо';
let patternWithI = /яблок/i;
let patternWithoutI = /яблок/i;
console.log(patternWithI.test(textForI));    //  true
console.log(patternWithoutI.test(textForI)); //  false

//  g - глобальный поиск. Это означает, что после нахождение первого сопоставления
//  поиск следующего будет производится не с начала, а с места предыдущего сопоставления
let textForShowTrigger = 'текст текст текст';
let patternWithG = /т/g;
let patternWithoutG = /т/;
console.log(patternWithG.test(textForShowTrigger));
console.log(patternWithG.lastIndex);     // 1
console.log(patternWithG.test(textForShowTrigger));
console.log(patternWithG.lastIndex);     // 5

console.log(patternWithoutG.test(textForShowTrigger));
console.log(patternWithoutG.lastIndex);     // 0
console.log(patternWithoutG.test(textForShowTrigger));
console.log(patternWithoutG.lastIndex);     // 0
//  Примечание - атрибут lastIndex - с какого символа(его индекс) в строке начнется следующий поиск


//  Специальные символы сопоставления
//  Лучше в виде таблицы: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp

//  . 	
//  (Точка, десятичная запятая) сопоставляется с любым символом за исключением символов новой строки: \n, \r, \u2028 или \u2029.
//  Пример, шаблон /.н/ сопоставляется с подстрокой «ан», но не подстрокой «ну», во фразе «ну что, потанцуем».
let patternDot = /.н/g;
let textDot = "ну что, потанцуем";
console.log(patternDot.test(textDot));
console.log(patternDot.lastIndex);

//  \d	
//  Сопоставляется с символом цифры в базовом латинском алфавите. Эквивалентен набору символов [0-9].
//  Пример, шаблоны /\d/ и /[0-9]/ сопоставляются с подстрокой «2» в строке «B2 — это номер люкс».
let patterMiniD = /\d/g;
let textMiniD = "B2 — это номер люкс";
console.log(patterMiniD.test(textMiniD));
console.log(patterMiniD.lastIndex);

//  \D	
//  Сопоставляется с любым символом, который не является цифрой в базовом латинском алфавите. Эквивалентен набору символов [^0-9].
//  Пример, шаблоны /\D/ и /[^0-9]/ сопоставляются с подстрокой «B» в строке «B2 — это номер люкс».
let patterD = /\D/g;
console.log(patterD.test(textMiniD));
console.log(patterD.lastIndex);

//  \w
//  Сопоставляется с любым алфавитно-цифровым символом из базового латинского алфавита, включая символ подчёркивания. Эквивалентен набору символов [A-Za-z0-9_].
//  Пример, шаблон /\w/ сопоставляется с подстрокой «a» в строке «apple», с подстрокой «5» в строке «$5.28» и с подстрокой «3» в строке «3D».
let patternMiniW = /\w/g;
['apple', '$5.28', '3D'].forEach(function (example) {
    console.log(patternMiniW.test(example));
    console.log(patternMiniW.lastIndex);
    patternMiniW.lastIndex = 0;
});

//  \W
//  Сопоставляется с любым символом из базового латинского алфавита, не являющимся символом, из которых состоят слова. Эквивалентен набору символов [^A-Za-z0-9_].
//  Пример, шаблон /\w/ сопоставляется с подстрокой «%» в строке «50%»
let patternW = /\W/g;
let textW = "50%";

console.log(patternW.test(textW));
console.log(patternW.lastIndex);

//  \t	Сопоставляется с символом табуляции.
//  \r	Сопоставляется с символом возврата каретки.
//  \n	Сопоставляется с символом перевода строки.
//  Пример
let patternT = /\t/g;
let patternR = /\r/g;
let patternN = /\n/g;
let textT = `Тут есть табуляция     между словами`;
console.log('Текст в консоли: ', textT);
console.log(patternT.test(textT));
console.log(patternT.lastIndex);

let textR = `Тут есть возврат каретки \rмежду словами`;
console.log('Текст в консоли: ', textR);
console.log(patternR.test(textR));
console.log(patternR.lastIndex);

let textN = `Тут есть переход на следующую строку
между словами`;
console.log('Текст в консоли: ', textN);
console.log(patternN.test(textN));
console.log(patternN.lastIndex);

// \
// Символ экранирования. Позволяет воспринимать специальный символ как часть текста.
// Пример: . будет сопоставляться шаблоном /\./ в тексте «Привет. Мир» с символом «.» а не «П» 
let patternShielding = /\./g;
let textForShielding = "Привет. Мир";
console.log(patternShielding.test(textForShielding));
console.log(patternShielding.lastIndex);
let patternWithoutShielding = /./g;
console.log(patternWithoutShielding.test(textForShielding));
console.log(patternWithoutShielding.lastIndex);

//  Символы формирующие наборы

//  [xyz]
//  Набор символов. Сопоставляется с любым из заключённых в квадратные скобки символов. С помощью дефиса вы можете определить диапазон символов.
//  [абвгд] эквивалентен [а-д]. Они сопоставляются с символом «г» в слове «грудинка» и символом «б» в слове «отбивная».

let patternUnion = /[а-д]/g;
["грудинка", "отбивная"].forEach(function (item) {
    console.log(patternUnion.test(item))
    console.log(patternUnion.lastIndex)
    patternUnion.lastIndex = 0
});

//  [^xyz]
//  Он сопоставляется со всеми символами, что не заключены в квадратные скобки. С помощью дефиса вы можете определить диапазон символов.
//  Они сопоставляются с символом «е» в слове «бекон» и символом «о» в слове «отбивная».
let patternAntiUnion = /[абвгд]/g;
["бекон", "отбивная"].forEach(function (item) {
    console.log(patternAntiUnion.test(item))
    console.log(patternAntiUnion.lastIndex)
    patternAntiUnion.lastIndex = 0
});


//  спецсимволы границ - Якори
//  ^	
//  Сопоставляется c началом ввода. Например, шаблон /^Б/ не сопоставляется с буквой «Б» в строке «буква Б», но сопоставляеся с первой буквой «Б» в строке «Буква Б».
let patternStart = /^Б/g;
console.log(patternStart.test("буква Б"));
console.log(patternStart.test("Буква Б"));

//  $	
//  Сопоставляется c концом ввода. Например, шаблон /Б$/ сопоставляется с буквой «Б» в строке «буква Б», но не сопоставляеся с первой буквой «Б» в строке «Буква б».
let patternEnd = /Б$/g;
console.log(patternEnd.test("Буква Б"));
console.log(patternEnd.test("Буква б"));

//  Спецсимвол группировки (x)
//  Сопоставляется с x и запоминает сопоставление. Называется «захватывающие скобки».
//  Например, шаблон /(foo)/ сопоставлется с подстрокой «foo» и запоминает её в строке «foo bar».
let patternGroup = /(foo)\W(bar)/g;
console.log(patternGroup.test("foo bar"));
console.log(patternGroup.lastIndex);


//  Спецсимволы модификаторы

//  x* 
//  Сопоставляется с элементом x повторяющийся 0 и более раз. 
//  Например, шаблон /ела*/ сопоставляется с подстрокой «ел» в строке «Призрак просвистел» и подстрокой «ела» в строке «Птица пропела»,
//  но ни с чем не сопоставится в строке «Козёл хмыкнул».

let patternMulti = /ела*/g;
['ел', "Призрак просвистел", "Птица пропела", "Козёл хмыкнул"].forEach(function (item) {
    console.log(item, patternMulti.test(item))
    console.log(patternMulti.lastIndex)
    patternMulti.lastIndex = 0
});

//  Пример с группой
let patternMultiDiff = /(га-)*/g;
let textMultiDiff = 'Га-га-га-га-га-га-га! Поросли травой луГА!';
console.log(textMultiDiff, patternMultiDiff.test(textMultiDiff));
console.log(patternMultiDiff.lastIndex);

//  x+ 
//  Сопоставляется с предшествующим элементом x один или более раз. Эквивалентен квантификатору {1,}.
//  Например, шаблон /о+/ сопоставляется с символом «о» в строке «конфета» и со всеми символами «о» в строке «коооооонфета».
let patternPlus = /о+/g;
let textForPlus1 = "конфета";
let textForPlus2 = "коооооонфета";
console.log(textForPlus1, patternPlus.test(textForPlus1));
console.log(patternPlus.lastIndex);
patternPlus.lastIndex = 0;
console.log(textForPlus2, patternPlus.test(textForPlus2));
console.log(patternPlus.lastIndex);

//  x|y
//  Сопоставляется либо с x, либо с y.
//  Например, шаблон /зелёное|красное/ сопоставится с подстрокой «зелёное» в строке «зелёное яблоко»
//  и подстрокой «красное» в строке «красное яблоко».
let patternOr = /зелёное|красное/g;
let textForOr1 = "зелёное яблоко";
let textForOr2 = "красное яблоко";
console.log(textForOr1, patternOr.test(textForOr1));
console.log(patternOr.lastIndex);
patternOr.lastIndex = 0;
console.log(textForOr2, patternOr.test(textForOr2));
console.log(patternOr.lastIndex);


//  x{n}	
//  Где n является целым положительным числом. Сопоставляется точно с n вхождениями предшествующего элемента x.
//  Например, шаблон /о{2}/ не сопоставится с символом «о» в слове «конфета», 
//  но сопоставится со всеми символами «о» в слове «коонфета» и с первыми двумя символами «о» в слове «кооонфета».
let patternRepeatOne = /о{2}/g;
let textForRepeatOne1 = "конфета";
let textForRepeatOne2 = "коооооонфета";
console.log(textForRepeatOne1, patternRepeatOne.test(textForRepeatOne1));
console.log(textForRepeatOne2, patternRepeatOne.test(textForRepeatOne2));

//  x{n,}	
//  Где n является целым положительным числом. Сопоставляется по крайней мере с n вхождениями предшествующего элемента x.
//  Например, шаблон /о{2,}/ не сопоставится с символом «о» в слове «конфета», 
//  но сопоставится со всеми символами «о» в словах «коонфета» и даже в «кооооооонфета».
let patternRepeatOneWithInfinity = /о{2}/g;
["конфета","коонфета","коооооонфета"].forEach(function (item) {
    console.log(item, patternRepeatOneWithInfinity.test(item));
    console.log(patternRepeatOneWithInfinity.lastIndex)
    patternRepeatOneWithInfinity.lastIndex = 0;
});

//  x{n,m}	
//  Где n и m являются целыми положительными числами. 
//  Сопоставляется по крайней мере с n но не более, чем с m вхождениями предшествующего элемента x.
//  Например, шаблон /о{1,3}/ ни с чем не сопоставится в слове «кнфета», с символом «о» в слове «конфета», 
//  с двумя символами «о» в слове «коонфета» и с первыми тремя символами «о» в слове «кооооооонфета».
let patternRepeatTwo = /о{1,3}/g;
["кнфета", "конфета","коонфета","коооооонфета"].forEach(function (item) {
    console.log(item, patternRepeatTwo.test(item));
    console.log(patternRepeatTwo.lastIndex);
    patternRepeatTwo.lastIndex = 0;
})

//  Как вообще применяются регулярные выражения
/**
 * 1. Соответствует ли строка нужному формату. То есть, есть формат которому должна соответствовать строка
 * 2. Когда необходимо найти части строк в строке по нестандартному шаблону
 * 3. Заменить часть строки на другую. Пример:
 */
console.log("Hello, world".replace(/o|ll/g, "_"));


/**
 * ЗАДАНИЯ
 */

/*
    №1. Создать шаблон позволяющий возвращать true для вещественных чисел
*/

/**
    №2. Создать шаблон позволяющий возвращать true для строки с телефоном в формате +7(999)999-99-99
 */

/**
    №3. Создать шаблон позволяющий возвращать true для строки с email почтой
*/

/**
    №4. Создать шаблон позволяющий возвращать true для вещественныx чисел в красивом формате
    1 234.567890
*/

/**
    №5. Создать шаблон позволяющий возвращать true для слов содержащить от 2 до 4 подряд идущих согласных
*/

/**
    №6. Создать шаблон позволяющий возвращать true для слов содержащить слово яблоко
*/

/**
    №7. Создать шаблон позволяющий возвращать true для слов содержащить слова "яблоко" или "груша" 
*/

/**
    №8. Создать шаблон позволяющий возвращать true для слов содержащить слово "\/\/ala\/\/" 
*/