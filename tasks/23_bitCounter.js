/**
 * Задание. Написать функцию которая принимает десятичное число в качестве аргумента. 
 * Это число необходимо разложить в биты (двоичную систему счисления). Необходимо посчитать количество битов равных 1
 * В качестве аргумента передается только неотрицательные числа
 * Подсказка нужен метод toString
 * Пример
 */
countBits(1234) == 5    //  1234 == 10011010010

function countBits(n) {

};


//  Тесты
console.assert(countBits(0) == 0, '0 == 0');
console.assert(countBits(4) == 1, '4 == 100');
console.assert(countBits(7) == 3, '7 == 111');
console.assert(countBits(9) == 2, '9 == 1001');
console.assert(countBits(10) ==  2, '10 == 1010');