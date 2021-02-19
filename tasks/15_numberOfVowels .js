/**
 * Задание. Напишите функцию, которая принимает строку текста. 
 * Она должна возвращать в качестве результата количество гласных букв в тексте. 
 * Примеры:
 *      numberOfVowels( "Привет мир" ) => returns 3
 *      numberOfVowels( "Количество гласных") => returns 6
 *      numberOfVowels( "Добрая половина выводов оказалась ошибочной" )=> returns 18
 */

function numberOfVowels(text) {

}

//  Тесты
console.assert(numberOfVowels("Привет мир") == 3, `должно быть 3, а не ${numberOfVowels("Привет мир")}`);
console.assert(numberOfVowels("Количество гласных") == 6, `должно быть 6, а не ${numberOfVowels("Количество гласных")}`);
console.assert(numberOfVowels("Добрая половина выводов оказалась ошибочной") == 18, `должно быть 18, а не ${numberOfVowels("Добрая половина выводов оказалась ошибочной")}`);