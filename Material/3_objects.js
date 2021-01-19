//  Объекты
//  Объекты - это один из основых типов в JS. Они примичательны тем, что позволяют с легкостью объединять 
//  несколько данных в одну переменную. Чаще всего про переменные, имеющие в качестве значения тип данных объект
//  в пределах какого-либо блока кода, называют объектами а не переменными.

//  Пример
//  "Объявление переменной flower и инициализация типом объект"
//  Или
//  "Объявление объекта flower"
//  Или если мы хотим уточнить какие-то данные объекта
//  "Объявление объекта flower с свойствами ..."
let flower = {
    color: 'синий',
    family: 'лилейные',
    name: 'Агапантус'
}
//  Мы объединили в переменную flower(цветок) несколько данных присущих именно ему. 
//  Объект может быть объявлен несколькими формами записи
let a = {};
let b = Object.create({});

//  Объект состоит из ключей(имена слева) и значений (различные данные стоящие справа от :)
//  В объекте flower "color" - это ключ, а строка "синий" его значние
//  Термин ключ:значение - устоявшийся и применяется по отношению к объектам различных вариаций.
//  Для объектов созданных с помощью функции конструктора эти термины применимы
//  Пример применения терминов
flower = {
    color: 'синий',
    family: 'лилейные',
    name: 'Агапантус'
}
//  В примере выше виден способ объявления пар "ключ:значение"
//  Любая пара "ключ:значение" пишется именно в формате пары (для функция значение может быть опущено), где в качестве ключа могут быть
//  Любые имена(даже зарезервированные ключевые слова) из примитивных типов (строка, число, булеан), кроме "__proto__"
//  Оно особенно для объектов. В нем хранится множество служебной информации для програмы.
//  Однако написание ключа как строку не единственный способ задать свойство объекта. 
//  Другим способом является использование [] при описании свойств объекта
//  Пример
let number = 10;
let c = {
    [number]: "Десять",
    [1]: "Один",
    [true]: "Правда"
};



let kitty = {
    name: "Барсик",
    color: 'Белая с черными пятнышками',
    say() {
        console.log('Мяу');
    },
    age: {
        month: 2,
        year: 0
    }
}
//  Важно понимать следующую терминологию
//  В объекте СВОЙСТВОМ называется ЛЮБАЯ пара "ключ:значение"
//  Пример в объекте kitty ключи "name", "color", "say", "age" являются свойствами объекта. (Именно для kitty)

//  В объекте МЕТОДОМ называется пара "ключ:значение", где в качестве ключа ФУНКЦИЯ
//  Пример в объекте kitty ключ "say" является методом объекта

//  В объекте АТРИБУТОМ называется ЛЮБАЯ пара "ключ:значение", где в качестве значения НЕ ФУНКЦИЯ.
//  Пример в объекте kitty ключи "name", "color", "age" являются атрибутами объекта. (Именно для kitty)


//  Модификация объектов
//  Под модификацией объектов называются следующие 3 операции

//  1. Добавление свойства
//  2. Изменение значения свойства
//  3. Удаление свойства.

//  1. Под добавлением свойства понимается "добавление" свойства, которого ранее не было
//  Пример
kitty = {
    name: "Барсик",
    color: 'Белая с черными пятнышками',
    say() {
        console.log('Мяу');
    },
    age: {
        month: 2,
        year: 0
    },
}

kitty.breed = "Британская";
//  В объект kitty добавлено новое свойство breed (порода)
//  Добавление свойства можно производить не только через точку. а и через []
kitty['tail length(cm)'] = 15;


//  2. Под изменением свойства понимается изменение именно значения уже существующего свойства
//  Пример
kitty.age.month = 3;
kitty['tail length(cm)'] = 20;

//  3. Под удалением свойства понимается удаление пары из объекта
//  Для удаления используется ключевое слово "delete"
//  Пример
delete kitty['tail length(cm)'];
delete kitty.age.year;


//  Особенность объектов
/*
    Объект - это сложный тип и имеет некоторую особенность. Чтобы сделать обращения к полям быстрее и не тратить ресурсы устройства,
    разработчики языка сделали его указателем на адрес в памяти. То есть програма не оперирует самим набором данных, 
    она оперирует именно адресами в памяти устройства. Из-за этой особенности const только запрещает присваивать объекту новый объект, 
    но разрешает модификации. И по этой же причиней два одинаковых объекта не равны друг другу (адрес в памяти у них разный, хотя все
    свойства совпадают полностью). Это очень важный аспект в понимании языка.

    Пример:
*/
let man = {
    name: 'Саша'
};
let woman = {
    name: 'Саша'
};

console.log(man == woman);  //  false
const car = {};
car.color = 'красный';  //  Ошибки нет
car = {
    color: 'зеленый'
};  //  Ошибка присваивания нового значения

//  Расширение работы с объектами.
//  Для работы с объектами существует несколько особенных, свойственных именно объектам методов
//  Самыми распространненными являются keys, values и entries. Рассмотрим каждый из них по отдельности


//  1. Keys
//  Позволяет получить из свойств объекта (пар "ключ:значение") именно КЛЮЧИ. Ключи представляют собой массив строк
//  Пример
kitty = {
    name: "Барсик",
    color: 'Белая с черными пятнышками',
    say() {
        console.log('Мяу');
    },
    age: {
        month: 2,
        year: 0
    },
}
Object.keys(kitty);     //  ["name", "color", "say", "age"]

//  2. Values
//  Позволяет получить из свойств объекта (пар "ключ:значение") именно значения каждой пары. Значения представляют собой массив разно
//  типовых значений

Object.values(kitty);   //  ["Барсик", "Белая с черными пятнышками", function () {console.log('Мяу');},{month:2, year: 0}]

//  3. Entries
//  Позволяет получить из свойств объекта (пар "ключ:значение") пару ключ и значение в виде массива. Данный метод возвращает массив таких массивов.
//  Каждый элемент массива представляет собой логическую пару. Где элемент под индексом 0 представляет собой имя ключа, а элемент под индексом 1 его значение
//  [[key1, value1], [key2, value2], ..., [keyN, valueN]]
//  Пример

Object.entries(kitty);  
/*  [
        ["name", "Барсик"],
        ["color", "Белая с черными пятнышками"],
        ["say", function () {console.log('Мяу');}],
        ["age",{month:2, year: 0}]    
    ]
*/


//  Еще одним наиболее распространненым методом является assign. Данный метод позволяет соединять несколько объектов в 1
//  Пример
let style = {
    color: 'белый',
    width: 120,
    height: 80
};

let information = {
    name: 'Samsung',
    model: 'T800',
}

let camera = {
    front: 20,
    back: 48,
    flashlight: true,
    focus: true
};


let phone = {};
phone = Object.assign({}, style, camera, model);
//  Или
Object.assign(phone, style, camera, information);

/*
ЗАДАНИЯ
*/

/*
    №1. Объявите и инициализируйте объект по описанию ниже (есть ошибки, они на внимательность и постарайся исправить их)

    свойство name, с значением "Василий"
    атрибут lastName, с значением "Стрелков"
    пара "ключ:значение" с ключом "age" и значением 24
    метод midName с значением "Петрович"
    метод fullname с функцией формирующую ФИО (Фамилия Имя Отчество)
    атрибут parents со значением пустого массива

    добавьте объект в parents со следующими полями
        метод gender с значением "мужчина"
        пара "ключ:значение" c ключом "role" и значением "папа"
        пара "ключ:значение" с ключом "name" и значением "Петр"
        пара "ключ:значение" с ключом "lastName" и значением "Стрелков"
        пара "ключ:значение" с ключом false и значением true
    
    добавьте объект в parents со следующими полями
        атрибут gender с значением "женщина"
        свойство "role" и значением "мама"
        свойство "name" и значением "Александра"
        метод "lastName" и значением "Стрелков"
        метод undefined возращающее значение undefined
    

    В основном объекте добавьте 
        свойство 1_meeting со значением Николай
        свойство {} со значением "Пустой объект"
        атрибут if со значением else
        метод else возвращающий значение свойства "if" данного объекта
*/

/*
    №2. Напишите чему будет равен результат кода ниже на помеченных строках
*/


let cat = {         //  1
    name: 'Муся',
    age: 1,
    breed: 'Лесная',
    color: 'черная',
    say() {
        console.log('Мяу')
    },
    sleep() {
        console.log('ищет место для сна');
    }
};

Object.keys(cat);  //  2

cat.size = 'средняя';   //  3
delete cat.sleep;       //  4
cat.age = {             //  5
    year: 1,
    month: 0
};
cat.breed = 'норвежская лесная';    //  6

Object.values(cat);     //  7

let city = 'Москва';
let street = 'Комсомольская'

cat.isDomestic = true;      //  8
cat.addressOfLive = {       //  9
    city,
    street: `ул. ${street}`,
    build: 4,
    appartament: 2
}

Object.entries(cat);        //  10

cat.addressOfLive.address = function () {       //11
    return `${this.city} ${this.street} дом ${this.build} квартира ${this.appartament} `;
}

cat.addressOfLive.address();            //  12
delete cat.addressOfLive.street;        //  13
delete cat.addressOfLive.appartament;   //  14

cat.addressOfLive.address();            //  15

/*
    №3. Напишите результат действия объединения объектов. Объясните результаты помеченные решеткой
*/

let build = {
    type: "Высотка",
    numberOfFloors: 200,
    name: 'Первая высотка',
    address: "Москва"
}

let house = {
    numberOfWindow: 12,
    numberOfDoors: 5,
    address: 'Воронеж'
};

let memorial = {
    width: 100,
    height: 4000,
    length: 100,
    type: 'Стела'
}

let pieceOfLand = {
    width: 1000,
    address: 'Ногинск',
    withElectricity: true
}

Object.assign({}, build, pieceOfLand);                  //  #
Object.assign({}, house, memorial, pieceOfLand);        //  #
Object.assign({}, build, house, memorial, pieceOfLand)  //  #