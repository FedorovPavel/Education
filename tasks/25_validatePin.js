/*
Задание. Когда мы используем карточку в банкомате, первое что мы должны ввести это PIN код карты. Обычно PIN состоит
из 4 или 6 цифрт. Задание написать функцию validatePIN, которая будет вызвращать true
если PIN код состоит из 4 или из 6 цифр. False иначе
Пример
*/

console.log(validatePIN("1234"))    //  =>  true
console.log(validatePIN("12345"))   //  =>  false
console.log(validatePIN("a234"))    //  =>  false

function validatePIN(pin) {
}

//  Тесты
console.assert(validatePIN("1") == false, "Wrong output for '1'");
console.assert(validatePIN("12") == false, "Wrong output for '12'");
console.assert(validatePIN("123") == false, "Wrong output for '123'");
console.assert(validatePIN("12345") == false, "Wrong output for '12345'");
console.assert(validatePIN("1234567") == false, "Wrong output for '1234567'");
console.assert(validatePIN("-1234") == false, "Wrong output for '-1234'");
console.assert(validatePIN("1.234") == false, "Wrong output for '1.234'");
console.assert(validatePIN("-1.234") == false, "Wrong output for '-1.234'");
console.assert(validatePIN("a234") == false, "Wrong output for 'a234'")
console.assert(validatePIN(".234") == false, "Wrong output for '.234'")
console.assert(validatePIN("1234") == true, "Wrong output for '1234'");
console.assert(validatePIN("0000") == true, "Wrong output for '0000'");
console.assert(validatePIN("1111") == true, "Wrong output for '1111'");
console.assert(validatePIN("123456") == true, "Wrong output for '123456'");
console.assert(validatePIN("098765") == true, "Wrong output for '098765'");
console.assert(validatePIN("000000") == true, "Wrong output for '000000'");
console.assert(validatePIN("123456") == true, "Wrong output for '123456'");
console.assert(validatePIN("090909") == true, "Wrong output for '090909'");