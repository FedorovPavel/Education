/**
 * Промисы - важный инструмент, на уровне callback
 * Они позволяют сделать код одноуровневым, а плюсом ко всем решает пару проблем,
 * которые с callback'ами выглядят ужасными
 * 
 * Начнем с простого Promise - с английского обещание, и он определяет собой какое либо 
 * действие, которое будет выполнено, когда виртуальная машина будет свободна
 * 
 * Для того чтобы создать Promise достаточно вызвать функцию конструктор с единственным аргументом
 * функцией. Важно аргументы функции всегда состоят из 2 переменных. 
 * 1 - ая, обычно именнуемая resolve представляет собой функцию, которая подтверждает 
 * успешное выполнение Promise. Результат выполнения указывается внутри скобок
 * 2 - ая, обычно именнуемая reject представляет собой функцию, которая обозначает
 * что данный Promise является завершенным с ошибкой. В качестве аргумента reject 
 * указывается Error (начиная со стандарта ES2016)
 */
{
    let promise = new Promise(function (resolve, reject) {
        if (true)
            reject(new Error('Это ошибка выполнения Promise'));
        resolve('Это результат выполнения Promise');
    });

    /**
     * Функция конструктор возвращает именно Объект-Promise. Он обладает специфиальными аттрибутами и методами
     * Нам важны только 2 метода, оба метода имеют всего 1 аргумент и в качестве аргумента функция
     * 1. then - метод вызывает указанную функцию в качестве аргумента после УСПЕШНОЙ обработки Promise (resolve)
     * Причем результат Promise попадает в аргумент функции. Результат Promise всегда один аргумент
     * 2. catch - метод вызывает указанную функцию в качестве аргумента после завершения Promise c ОШИБКОЙ
     * Причем ошибка в Promise попадает в аргумент функции.
     */

    promise
        .then(function (result) {
            console.log(result);
        })
        .catch(function (err) {
            console.log(err.message);
        })
}

/**
 * Из Promise можно формировать цепочки действий/операции.
 * Пример
 */

{
    new Promise(function (resolve, reject) {
        resolve(1);
    })
        .then(function (res) {
            console.log(res);   //  1
            return 2;
        })
        .then(function (res) {
            console.log(res);   //  2
            return 3;
        })
        .then(function (res) {
            console.log(res);   //  3
        })

    /*
    Каждый и then и catch могут передавать следующей стадии then результат, который был указан при return
    Это справедливо для ВСЕХ типов, за исключением самого Promise. Если в качестве результата стадии then
    указывается именно Promise, то на следующую стадию передается именно его РЕЗУЛЬТАТ(НЕ САМ PROMISE)
    */
}

/*
Можно заметить, что для создания цепочки действий необходим первичный Promise. То есть тот Promise с которого
начинается цепочка. И не всегда есть реальная задача, которая требует такой обертки в виде new Promise
Для того чтобы избавиться от пустых Promise в начале для создания цепочек, придумали дополнительные 2 метода
1. resolve - Представляет собой пустой Promise для создания цепочки, который завершился УСПЕШНО
2. reject - Представляет собой пустой Promise для создания цепочки, который завершился с ОШИБКОЙ
Оба метода могут принимать в качестве аргумента результат своего действия
Кстати эти два метода используется не только для цепочек но и для функций, которые обязаны вернуть Promise для
продолжения работы программы в целом
*/
{
    console.log('Resolve example')
    Promise.resolve(1)
        .then(function (res) {
            console.log(res)
            return res ** 2;
        })
        .then(function (res) {
            console.log(res)
            return res ** 2;
        })
        .then(function (res) {
            console.log(res)
        })
}


{
    console.log('Reject example')
    Promise.reject(new Error('это ошибка не для цепочки, но ее можно использовать и так'))
        .catch(function (err) {
            console.log(err.message);
            return 1;
        })
        .then(function (res) {
            console.log(res)
            return res ** 2;
        })
        .then(function (res) {
            console.log(res)
            return res ** 2;
        })
        .then(function (res) {
            console.log(res)
        });
}

//  Теперь тот самый пример когда для работы программы нужен именно Promise
{

    function difficultCalculation(checker) {
        if (checker > 0) {
            return new Promise(function (resolve, reject) {
                //  Какие-то сложные вычисления или работа с БД
                return resolve(checker);
            })
        }

        return Promise.reject(new Error('checker отрицательный или равный 0'));
    }

    difficultCalculation(256)
        .then(function (res) {
            console.log(res)
            return Math.sqrt(res);
        })
        .then(function (res) {
            console.log(res)
            return Math.sqrt(res);
        })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (err) {
            console.log(err.message);
        })
}

/*
Бывают ситуации, когда нужна не цепочка, а множество параллельных действий и причем результаты этих действий нужно получить одновременно
Что это за ситуации, когда мы обновляем данные о пользователе персонально или производим параллельные операции
Для callback'а эта ситуация страшная. Нам придется в callback указывать не функцию которая продолжает действия программы
а функцию, которая собирает эти данные
Пример
*/
{
    //  имитация обновления пользователя
    function updateUser(data, cb) {
        cb(data ** 3);
    }

    function mainOperation(users, cb) {
        //  В данный массив мы будем записывать всех успешно обновленных пользователей
        let list = [];
        //  Переменная sync будет указывать нам сколько пользователей уже обновилось
        //  и необходимо ли дальше продолжить функцию
        let sync = 0;

        for (let user of users) {
            updateUser(user, function (newUser) {
                list.push(newUser);
                sync++;
                if (sync == users.length)
                    cb(list);
                return;
            })
        }
    }

    mainOperation([1, 2, 3, 4, 5, 6, 7], function (list) {
        console.log(list);
    });
}

/*
Можно заметить что для такой операции нам пришлось делать функцию отдельно, отдельно синхронизировать данные 
и вводить дополнительные переменные
Все это выглядит страшно особенно в множестве callback'ов

Теперь взгялнем на тот же самый пример, но с использованием Promise
*/
{
    //  имитация обновления пользователя
    function updateUser(data) {
        return Promise.resolve(data ** 3);
    }

    function mainOperation(users) {
        let actions = [];

        for (let user of users) {
            actions.push(updateUser(user));
        }

        return Promise.all(actions);
    }

    mainOperation([1, 2, 3, 4, 5, 6, 7])
        .then(function (list) {
            console.log(list);
        });
}

/*
Уже намного лучше не правда ли? 
Теперь о новом 
Тут нам встречается новый метод Promise "all". Метод all ожидает УСПЕШНОЕ завершение ВСЕХ Promise переданных ему в качестве аргумента.
Причем результат выполнения метода будет Promise с результатом в виде такого же списка. Результат будет полностью совпадать с переданными 
ему аргументами (т.е. первый элемент массива Promise соответствует первому элементу результата)
ВАЖНО. Ожидает только успешно завершенных Promise. То есть, если кто-то из них завершится ошибкой то Promise.all вызове ошибку
Пример
*/
{
    //  имитация обновления пользователя
    function updateUser(data) {
        if (data % 2 == 0)
            return Promise.reject(new Error('Четный'));
        return Promise.resolve(data ** 3);
    }

    function mainOperation(users) {
        let actions = [];

        for (let user of users) {
            actions.push(updateUser(user));
        }

        return Promise.all(actions);
    }

    mainOperation([1, 2, 3, 4, 5, 6, 7])
        .then(function (list) {
            console.log(list);
        })
        .catch(function (err) {
            console.log("Обновление не произведено");
            console.log(err.message);
        });
}
/*
Для этого, относительно недавно добавили новый метод allSettled. Он полностью копирует смысл all, кроме пары аспектов
1. Как бы не завершился Promise среди массива он все равно будет обработан
2. Результат действия больше не просто результат, а подписанный результат. Т.е. кроме самого результата возвращается и 
то как он был получен (успешно завершенный или ответ из завершенного с ошибкой Promise)
Теперь как выглядят ответы
Для УСПЕШНО завершенного Promise результат будет представлять собой следующий объект
{
    status: 'fulfilled', 
    value: %value% - результат Promise
}
Для Promise завершенного с ОШИБКОЙ
{
    status: 'rejected', 
    reason: {
        Error: {
            message: %message% - сообщение указанное в ошибке
            ....
        }
    }
}
Пример
*/
{
    {
        //  имитация обновления пользователя
        function updateUser(data) {
            if (data % 2 == 0)
                return Promise.reject(new Error('Четный'));
            return Promise.resolve(data ** 3);
        }

        function mainOperation(users) {
            let actions = [];

            for (let user of users) {
                actions.push(updateUser(user));
            }

            return Promise.allSettled(actions);
        }

        mainOperation([1, 2, 3, 4, 5, 6, 7])
            .then(function (list) {
                console.log(JSON.stringify(list));
            })
            .catch(function (err) {
                console.log("Обновление не произведено");
                console.log(err.message);
            });
    }
}

/*
Как видно из примера, можно по полю status понять КАК завершился Promise и тем самым отобрать только успешно отобранные результаты
Пример
*/
{
    {
        //  имитация обновления пользователя
        function updateUser(data) {
            if (data % 2 == 0)
                return Promise.reject(new Error('Четный'));
            return Promise.resolve(data ** 3);
        }

        function mainOperation(users) {
            let actions = [];

            for (let user of users) {
                actions.push(updateUser(user));
            }

            return Promise.allSettled(actions)
                .then(function (all) {
                    return all.filter(function (promise) {
                        return promise.status == 'fulfilled';
                    }).map(function (item) {
                        return item.value;
                    });
                });
        }

        mainOperation([1, 2, 3, 4, 5, 6, 7])
            .then(function (list) {
                console.log(list);
            })
            .catch(function (err) {
                console.log("Обновление не произведено");
                console.log(err.message);
            });
    }
}


/*
Promise очень мощный и удобный инструмент. Существует библиотека BlueBird(https://www.npmjs.com/package/bluebird), который
расширяет функциональности Promise еще больше, для описания различных задач.



Async/await
Относительно недавно в JS был добавлен синтаксис позволяющий работать с Promise еще проще. 
Async/await всегда работают в паре. Пример ниже
*/

{
    async function example() {
        let res = await Promise.resolve(10);
        console.log(res);
    }

    example();
}
/*
Теперь об использовании:
Чтобы использовать async/await функционал нужно:
1. Перед ключевым словом function написать async
2. await пишется рядом с Promise или функциями которые возвращает Promise

Следующее что нужно помнить, то что функция которая имеет приписку async, сама возвращает Promise просто не явно
*/

{
    async function example() {
        let res = await Promise.resolve(10);
        console.log(res);
        return res;
    }

    example()
        .then(function (res) {
            console.log(`Да функция с async вернула promise: ${res}`);
        });
}

/*
Как и раньше, если в цепочке Promise'ов нужно прервать ее то нужно вызвать throw new Error
*/
{
    async function example() {
        let res = await Promise.resolve(10);
        throw new Error('Ошибка');
    }

    example()
        .then(function (res) {
            console.log(`Да функция с async вернула promise: ${res}`);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

/*
А чтобы поймать ошибку в async function необходимо использовать стандартный try catch
*/
{
    async function example() {
        let res = await Promise.resolve(10);
        try {
            throw new Error('Ошибка');
        } catch (err) {
            console.log(err.message);
        }
        return res;

    }

    example()
        .then(function (res) {
            console.log(`Да функция с async вернула promise: ${res}`);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

/**
 * ЗАДАНИЯ
 */

/*
Задание 1. Построить цепочку из Promise, где каждое звено (цепочки) умножнает на результат предыдущего звена на изначально
печает его и передает следующему. Должно быть 10 звеньев
*/
//  Ожидаемая печать
//  2 4 8 16 32 64 128 256 512 1024


/*
Задание 2 Какой результат цепочки, Объяснить почему. Если вам кажется некорректным исправьте ниже
*/
{
    let initialValue = 42;
    Promise.resolve(initialValue)
        .then(function (res) {
            let avg = 0;
            for (let i = 0; i < res; i++) {
                avg += i;
            }
            return avg = avg / res;
        })
        .then(function (avg) {
            let res = avg;
            for (let i = -10; i < 10; i++)
                res = res ** i;
            return new Promise(function (resolve, reject) {
                if (res % 2 == 0)
                    resolve(1);
                else if (res % 2 == 1)
                    reject(new Error('Число не подходящего формата'))
            })
        })
        .catch(function (err) {
            console.log(err.message);
            return 0;
        })
        .then(function (res) {
            return initialValue / res;
        })
        .then(function (part) {
            if (part == initialValue)
                throw new Error('Число не изменилось');
            else if (part == initialValue - 2) {
                return part * initialValue;
            } else if (typeof part == 'number')
                return initialValue / part;
        })
        .then(function (res) {
            if (res < 0)
                throw new Error("Отрицательное число")
            console.log(res);
        })
        .catch(function (err) {
            console.log(err.message);
        })
}

/*
Задание 3. Написать функцию delay, которая возвращает Promise, который успешно завершится через X мс, где X - значение аргумента делай
Пример
*/
{
    function delay(ms) {

    }

    // delay(200).then(function () {
    //     console.log('Прошло не больше 0.2 секунды')
    // })
}

/*
Задание 4. D NodeJs есть модуль для работы с файлами. Однако до недавнего времени у него не было callback реализации. 
Поэтому многие разработчики оборачивали его ответы в Promise. Задание написать функцию asyncReadDir, которая является полным аналогом readDir,
но основанная на Promise
Пример
*/
{
    const fs = require('fs');

    fs.readdir('.', function (err, files) {
        if (err) {
            console.log(`Ошибка: ${err.message}`);
            return;
        }
        for (let file of files)
            console.log(file);
    });

    function asyncReadDir(path) {

    }

    //  пример использования asyncReadDir
    asyncReadDir('.')
        .then(function (files) {
            for (let file of files)
                console.log(file);
        })
        .catch(function (err) {
            console.log(`Ошибка: ${err.message}`);
            return;
        })
}

/*
Задание 5. Часто бывает ситуация, когда выполняется множество параллельных ситуаций. Одна из самых типичных это подсчет количества записей в БД
и поиск самих записей удовлитворяющих поиску. Допустим у нас есть функция getRecords - отвечающая за получение первых 5 записей из БД
и есть функция getNumberOfRecords - отвечает за подсчет количества документов. Без одного из этих действий второе бессмыслено. Ниже дан пример
неэффективного использования этих двух функций. Как иначе можно изменить пример ниже чтобы дождаться ответы от обеих функций одновременно
*/
{
    function getRecords() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve([
                    { name: 'Вася' },
                    { name: 'Петя' },
                    { name: 'Коля' },
                    { name: "Даша" },
                    { name: 'Маша' }])
            }, 100)
        })
    }

    function getNumberOfRecords() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(100);
            }, 40)
        });
    }

    let _users;
    getRecords()
        .then(function (users) {
            _users = users;
            return getNumberOfRecords();
        })
        .then(function (count) {
            let userName = _users.map(function (item) {
                return item.name
            }).join(',')
            console.log(`Всего ${count} пользователей. первые пять из них ${userName}`);
        })

}

/*
Задание 6. Допустим мы прогрессивные разработчики и решили подключить сервис рассылок смс для нашей платформы.
Но, у строннего сервиса иногда бывают ошибки и он присылает ошибки, что отправить не удалось. Необходимо написать
функцию, которая использует функцию отправки сообщений, дожидается рассылки и печатает те номера, на которые удалось отправить
сообщения.
Пример
исходный массив номеров:
[79999999999, 79999999998, 79999999997,79999999996,79999999995,79999999994,79999999993,79999999992,79999999991]
Отправлены
[79999999998, 79999999996, 79999999995, 79999999992,79999999991]
*/
{
    //  Функция отправки номеров
    function sendSms(number) {
        return new Promise(function (resolve, reject) {
            setTimeout(function() {
                if (Date.now() % 3 == 0) {
                    reject(`Отправка на номер ${number} не удалась`);
                    return;
                }
                return resolve('Отправка завершена');
            }, 50);
        })
    }

    //  То что нужно написать
    function main() {

    }
}

/*
Задание 7. Модификировать метод отправки из задания 6 так, чтобы все на все не отправленные номера смс было отправлено повторно,
пока все абоненты не получат сообщения. Модифицированный метод напиши ниже
// Пример
исходный массив номеров:
[79999999999, 79999999998, 79999999997,79999999996,79999999995,79999999994,79999999993,79999999992,79999999991]
Отправлены
[79999999998, 79999999996, 79999999995, 79999999992,79999999991]
..  Отправка оставшихся
Отправлены
[79999999999, 79999999997,79999999993]
..  Отправка оставшихся
[79999999994]
*/
{
    //  Функция отправки номеров
    function sendSms(number) {
        return new Promise(function (resolve, reject) {
            setTimeout(function() {
                if (Date.now() % 2 == 0) {
                    reject(`Отправка на номер ${number} не удалась`);
                    return;
                }
                return resolve('Отправка завершена');
            }, 50);
        })
    }

    //  То что нужно написать
    function main() {

    }
}

/*
Задание 8 Перепиши задание 7 в формат async/await ниже. P.S. Включая сторонние функции
*/
{
    //  Функция отправки номеров - ее тоже переписать
    function sendSms(number) {
        return new Promise(function (resolve, reject) {
            setTimeout(function() {
                if (Date.now() % 3 == 0) {
                    reject(`Отправка на номер ${number} не удалась`);
                    return;
                }
                return resolve('Отправка завершена');
            }, 50);
        })
    }

    //  То что нужно написать
    function main() {

    }
}