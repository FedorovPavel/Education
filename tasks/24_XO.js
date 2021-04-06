/*
Задание. Дана строка состоящая из символов. Необходимо написать функцию XO, которая принимает эту строку и выдает результат true или false
True - если количество "o" равно количеству "x" без учета регистра или если их нет в строке
False - иначе
P.S. Решить с использованием регулярных выражений и метода String.match
Пример:
*/

console.log(XO("ooxx"))     // => true
console.log(XO("xooxx"))    // => false
console.log(XO("ooxXm"))    // => true
console.log(XO("zpzpzpp"))  // => true 
console.log(XO("zzoo"))     // => false

function XO() {
    
}


console.assert(XO('xo') == true);
console.assert(XO("xxOo") == true);
console.assert(XO("xxxm") == false);
console.assert(XO("Oo") == false);
console.assert(XO("ooom") == false);