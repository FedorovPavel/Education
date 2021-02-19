/**
 * Задание. Написать функцию isSquare, которая возвращает true если число может быть образовано от целочисленного числа,
 * путем возведения в квадрате
 * Примеры
 * -1  =>  false 
 *  0  =>  true
 *  3  =>  false
 *  4  =>  true
 * 25  =>  true
 * 26  =>  false
 */
//  Реализация
function isSquare(value) {

}




//  Тесты
console.assert(isSquare(-1) == false, 'должно быть false');
console.assert(isSquare(0) == true, 'должно быть true');
console.assert(isSquare(3) == false, 'должно быть false');
console.assert(isSquare(4) == true, 'должно быть true');
console.assert(isSquare(25) == true, 'должно быть true');
console.assert(isSquare(26) == false, 'должно быть false');