const v8 = require('v8')
/* 
v8.cachedDataVersionTag()
v8.getHeapCodeStatistics()
v8.getHeapSnapshot()
v8.getHeapSpaceStatistics()
v8.getHeapStatistics()


*/

// v8.setFlagsFromString(flags)
/* 
Позволяет установить флаги для в8 прямо в коде
Дважды подумать перед использованием, так как может все сломать
Посмотреть доступны флаги можно выполнив node --v8-options

*/
// v8.writeHeapSnapshot([filename]) // string
/* 
Записывает снапшот кучи v8 в [filename]
*/
/* 
v8.serialize()
v8.deserialize()
Сериализация и десериализация
Пока нашел применение только для копирования 
Не может копировать функции кинет ошибку
*/