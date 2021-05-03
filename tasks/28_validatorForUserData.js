/*
Задание. 
Прежде чем обновлять данные пользователей, их необходимо отфильтровать. 
(Отобрать только валидные данные и только те, которые могут храниться в БД)

Написать функцию validateDataToUpdate, которая отбирает только ФИО и только если они строки
Если это не так, то выкинуть ошибку
Первый аргумент функции - это сырые данные. 
Функция должна возвращать только валидные данные
*/

function validateDataToUpdate(data) {

}

//  Тесты


const lodash = require('lodash');
let temp;
console.assert(lodash.isEqual(temp = validateDataToUpdate(
    { firstName: 'Петя', lastName: 'Стрельцов', midName: 'Анатольевич' }),
    { firstName: 'Петя', lastName: 'Стрельцов', midName: 'Анатольевич' }),
    'Неправильные данные:\n' + toString(temp));

console.assert(lodash.isEqual(temp = validateDataToUpdate(
    { age: 1 })
    , {}),
    'Неправильные данные:\n' + toString(temp));

console.assert(lodash.isEqual(temp = validateDataToUpdate(
    { midName: 2932, lastName: 'Приходько' }),
    { lastName: 'Приходько' }), 
    'Неправильные данные:\n' + toString(temp));

console.assert(lodash.isEqual(temp = validateDataToUpdate({
    firstName: () => {
        return 'Илья';
    }
}), {}), 'Неправильные данные:\n' + toString(temp));

console.assert(lodash.isEqual(temp = validateDataToUpdate(
    {MidName: 'Викторович', fisrtName: 'Олег', lastname: 'Морозов'}), 
    {}), 'Неправильные данные:\n' + toString(temp));

function toString(val) {
    if (typeof val == 'object')
        return JSON.stringify(val);
    return val.toString();
}