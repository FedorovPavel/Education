/**
 * Задание. Написать функцию, которая принимает 2 строки. Каждая строка состоит только из букв английского алфавита
 * Необхоимо, чтобы функция longest из двух строк формировала строку только из уникальных символов обеих строк
 * и отсортированных в алфавитном порядке 
 */

function longest(a, b) {

}

//  Тесты
console.assert(longest("aretheyhere", "yestheyarehere") == "aehrsty", 'должно быть aehrsty')
console.assert(longest("loopingisfunbutdangerous", "lessdangerousthancoding") == "abcdefghilnoprstu", 'должно быть abcdefghilnoprstu')
console.assert(longest("inmanylanguages", "theresapairoffunctions") == "acefghilmnoprstuy", 'должно быть acefghilmnoprstuy')