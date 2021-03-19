/**
 * Задание.
 * Примечание: 
 * Изограмма - это слово, в котором нет повторяющихся букв, ни последовательных, ни непоследовательных. 
 * 
 * Необходимо реализовать функцию isIsogram, которая определяет, является ли строка, содержащая только буквы, изограммой. 
 * Предполагать, что пустая строка является изограммой. Регистр букв игнорировать.
 * Пример:
 */

isIsogram("Dermatoglyphics") == true
isIsogram("aba") == false
isIsogram("moOse") == false



function isIsogram(str){

}

//  Тесты
console.assert( isIsogram("Dermatoglyphics") == true, 'Dermatoglyphics - является изограммой');
console.assert( isIsogram("isogram") == true, 'isogram - является изограммой');
console.assert( isIsogram("aba") == false, "A повторилась 2 раза" );
console.assert( isIsogram("moOse") == false, "O повторяется 2 раза, регистр нужно игнорировать" );
console.assert( isIsogram("isIsogram") == false, 'I и S повторилась 2 раза');
console.assert( isIsogram("") == true,  "Пустая строка - изограмма" );