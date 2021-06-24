const vm = require('vm')
// eval к которому можно прибивать контекст
// Не секьюрно
// A common use case is to run the code in a different V8 Context.
// This means invoked code has a different global object than the invoking code.
const context = { a: 1, b: 2 }
vm.createContext(context)
const code = 'console.log("abc")'
vm.runInThisContext(code)
const a = new vm.Script(code)
a.runInThisContext()
// new vm.Script(code[, options])
// vm.Script (Script) = class в котором прекомпиленый скрипт который в последствии можно юзать
console.log('test');
const c = vm.runInNewContext('console.log("abc")')