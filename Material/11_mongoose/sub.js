/*
Использование подключения в другом файле.

Для того чтобы пользоваться инструментарием за пределом файла в котором она описана можно использовать 2 механизма
1) Стандарный module.exports && require
2) Встроенный в mongoose
*/
(async function () {

    //  1
    const userModel = require('./index');

    let res = await userModel.model.findOne({});
    console.log(res.toObject());

    //  2
    const mognoose = require('mongoose');
    const userModelMongoose = mongoose.model('person');

    res = await userModelMongoose.findOne({});
    console.log(res.toObject());




    await userModel.shutdownConnection();
})();

