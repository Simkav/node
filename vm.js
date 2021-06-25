const vm = require('vm')
/* 
eval к которому можно прибивать контекст
Не секьюрно

Частый случай применения выполнять код в разных контекстах(eval.call())
*/
// const context = { a: 1, b: 2 }
// vm.createContext(context)
const code = 'console.log("abc")'
// vm.runInThisContext(code)
const a = new vm.Script(code)
// a.runInThisContext()
// new vm.Script(code[, options])
// vm.Script (Script) = class в котором прекомпиленый скрипт который в последствии можно юзать

// script.createCachedData()
// Returns: <Buffer>
// Creates a code cache that can be used with the Script constructor's cachedData option. Returns a Buffer. This method may be called at any time and any number of times.

const context = {
  animal: 'cat',
  count: 2,
  a: function () {
    console.log(this.animal)
  },
  b: function () {
    console.log(this.count)
  }
}

const script = new vm.Script('count +=1; name = "kitty";')

vm.createContext(context)
const cont2 = { animal: 'sobaka', count: 35 }
// vm.createContext(cont2)
// for (let i = 0; i < 10; ++i) {
//   script.runInContext(context)
//   script.runInContext(cont2)
// }
const script2 = new vm.Script('this.b();this.a()')
script2.runInContext(context)
// console.log(context)
