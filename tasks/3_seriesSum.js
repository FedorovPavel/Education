/*
    Задание. Есть ряд чисел который задается следующей формулой
    y = Pi/3 + ((Pi/3)^3) / 3 + ... + ((Pi/3)^(2n+1))/(2n+1)!
    Необходимо вычислить данные ряд с точностью до Epsilon
    В консоль необходимо вывести за какое количество шагов ряд сошелся и чему равна сумма ряда.
    Для того, чтобы избежать бесконечного вычисления необходимо вычислить ряд до шага nLoop, если он не сошелся.
    Если ряд сошелся раньше nLoop цикл прекращается

    Подсказка:
        необходимо использовать
            оператор цикла
            условный оператор
*/

let epsilon;
let nLoop;