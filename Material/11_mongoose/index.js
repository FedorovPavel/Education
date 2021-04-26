/*
Мы прошли СУБД Robo3T, который использует нативные механизмы работы с БД
Теперь рассмотрим инструментарий (ORM) для nodeJS для работы с MongoDB
Данный инструментарий называется mongoose

Устанавливается он следующим способом
    npm install -s mongoose

Инструментарий позволит программе транслировать (использовать методы БД) напрямую, без посредником
Первое что необходимо сделать, это подключиться к БД (установить эту связь)
*/
const mongoose = require('mongoose');
//  Подключение
mongoose.connect("mongodb://localhost/mongoose-test", function (err) {
    if (err) {
        console.log('Проблема с соединением');
        throw err;
    }
});

//  Записываем в переменную именно соединение для последущего отключения от БД
const connection = mongoose.connection;

/*
Основным отличием инструмента robo3T от mongoose, то что для работы в программе
нужно описание данных. Так как программа оперирует ими без прямого участия программиста, 
программе надо указать:
    1. С какими коллекциями документов в БД она может работать
    2. Как выглядит типовой документ из этой коллекции.

Второй пункт очень важет, так как он описывает правила взаимодействия между программой и самой БД
Рассмотрим пример описания простой схемы на примере человека
*/
const PersonSchema = new mongoose.Schema({
    lastName: String,
    firstName: {
        type: String,       //  Указываем тип
        required: true      //  Указываем что поле должно быть обязательно заполнено
    },
    midName: String,
    age: {
        type: Number,
        min: 0,
        default: 0
    },
    appearance: {
        hairColor: {
            type: String,
        },
        height: {
            type: String,
            enum: ['высокий', 'средний', 'низкий']      //  Указываем возможные значения для этого поля в документе
        }
    },
    createdTime: {
        type: Number,
        default: Date.now
    }
});

/*
Описав схему ее надо связать с коллекциями документов. Это необходимо чтобы понимать к какой коллекции принадлежит типовой шаблон
*/
const model = mongoose.model('person', PersonSchema);
/*
    Первым аргументом указывается название коллекции с учетом регистра и в ЕДИНСТВЕННОМ числе
    Вторым аргументом указывается схема типового документа
*/

/*  
После привязки коллекции со схемой можно пользоваться стандартными методами обычной СУБД
*/
(async function () {
    try {
        //  DeleteMany
        let delRes = await model.deleteMany({});
        console.log(delRes);

        //  Insert. Его нет. Вместо него create
        let document = await model.create({
            lastName: "Титов",
            firstName: "Николай",
            age: 20,
            appearance: {
                hairColor: 'блондин',
                height: 'высокий'
            },
            createdTime: Date.now()
        });

        //  Результат create
        console.log('create');
        console.log(document.toObject());

        //  InsertMany
        let result = await model.insertMany([{
            lastName: "Петров",
            firstName: "Афанасий",
            midName: "Евтихович",
            age: 89,
            appearance: {
                hairColor: 'седой',
                height: 'низкий'
            },
            createdTime: Date.now()
        }, {
            lastName: "Вассерман",
            firstName: "Анатолий",
            midName: 'Александрович',
            age: 68
        }]);

        //  Результат InsertMany
        console.log('insertMany');
        printArrayOfDocuments(result);

        //  Find
        result = await model.find({ firstName: /ов$/i });

        //  Результат find
        console.log('find');
        printArrayOfDocuments(result);

        //  Find с skip limit sort
        result = await model.find({}).sort({ age: 1 }).skip(1).limit(2);
        console.log('find с skip limit sort');
        printArrayOfDocuments(result);

        //  FindOne
        result = await model.findOne({
            midName: {
                $exists: false
            }
        });
        //  Результат
        console.log('FindOne с записью');
        console.log(result.toObject());

        //  FindOne без соответствующих документов
        result = await model.findOne({
            age: {
                $gte: 100
            }
        });
        console.log('FindOne без соответствующих документов');
        console.log(result);

        //  Update. Для единообразия в библиотеки добавили метод updateOne
        result = await model.updateOne({
            'appearance.hairColor': 'седой'
        }, {
            $set: {
                'appearance.hairColor': 'брюнет'
            }
        });

        console.log('UpdateOne');
        console.log(result);

        //  UpdateMany
        result = await model.updateMany({
            age: {
                $gte: 50
            }
        }, {
            $inc: {
                age: -20
            }
        }, {
            runValidators: true         //  Модификатор запуска проверок соответствия. Необходим, чтобы перед обновлением документ
                                        //  Удовлитворял описанным правилам
        });

        console.log('updateMany');
        console.log(result);

        //  FindOneAndUpdate
        result = await model.findOneAndUpdate({
            firstName: /толий/i
        }, {
            $set: {
                'appearance.height': 'низкий'
            }
        }, {
            runValidators: true,
            new: true                   //  Модификатор указывающий возвращать после обновления именно НОВУЮ копию
        });

        console.log('FindOneAndUpdate');
        console.log(result.toObject());

        //  DeleteOne
        result = await model.deleteOne({
            lastName: 'Титов'
        });
        console.log('DeleteOne');
        console.log(result);

        // countDocuments
        result = await model.countDocuments({});
        console.log('countDocuments');
        console.log(result);


        /*
        Есть и множество расширенных свойств для работы с документами
        findById()
        save()
        validate()
        ...
        Рассмотрим два наиболее из популярных: save & validate
        */

        //  Save & validate
        document = new model({
            firstName: 'Ольга',
            midName: 'Викторовна',
            age: 35
        });

        await document.validate();
        result = await document.save();
        console.log('save');
        console.log(result.toObject());

        /*
        Mongoose также предоставляет создавать пользовательские функции на основе стандартных методов взаимодействия с БД
        Данные методы указываются у схемы в качестве статического(постоянного) метода

        Пример
        */

        /* 
        =====================================================
        ЭТО НЕОБХОИМО ПИСАТЬ ДО СВЯЗИ СХЕМЫ С КОЛЛЕКЦИЕЙ В БД
        */
        PersonSchema.statics.getUsersWithCount = async function (filter) {
            let actions = [
                model.find(filter),
                model.countDocuments(filter)
            ];

            return await Promise.all(actions)
        }
        /*===================================================*/

        // result = await model.getUsersWithCount({});
        // console.log('getUsersWithCount');
        // console.log(result);
        // console.log(`Количество: ${result[1]}`);
        // console.log('Пользователи: ');
        // printArrayOfDocuments(result[0]);
        

        /*
            см sub.js
        */

    } catch (err) {
        console.log(err);
    }
})();


function printArrayOfDocuments(array) {
    array.forEach(function (doc) {
        console.log(doc.toObject());
    });
}

function shutdownConnection() {
    setTimeout(async function () {
        await connection.close();
    }, 100)
}

module.exports = {
    model,
    shutdownConnection
}

require('./sub');