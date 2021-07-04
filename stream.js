// https://cdn-media-1.freecodecamp.org/images/1*HGXpeiF5-hJrOk_8tT2jFA.png
/* 
Потоки позволяют обмениваться данными небольшими частями, что в свою очередь дает возможность в своей работе не расходовать много памяти.
 
Конечно, это зависит от того, как вы реализуется внутренний функционал потока.


Виды потоков

Есть четыре вида потоков:

Readable — поток, который предоставляет данные на чтение;
Writable — поток, в который данные можно записывать;
Duplex — поток, из которого можно как читать данные (Readable), 
так и записывать в него (Writable), при этом процесс чтения и записи просиходит независимо друго от друга;
Transform — разновидность Duplex потоков, которые могут изменять данные при их записи и чтении в/из потока 
(чаще используется как промежуточное звено в цепочке передачи данных).



Потоки хранят данные в своем внутреннем буфере.

Размер буфера можно указать через параметр highWaterMark, который можно задать в конструкторе класса.


В Readable потоке данные буферизируются, когда над ним вызвается метод push(data),
и остаются в буфере до тех пор, пока их не прочитают, вызвав метод read().
Как только общий размер внутреннего буфера Readable потока достигнет порогового значения,
указанного в highWaterMark, поток временно прекратит чтение данных.

Для Writable буферизация происходит во время вызова над ним метода write(data).
Метод вернет true, пока размер буфера не достиг значения highWaterMark, и false, когда буфер переполнен.

При использовании метода pipe(), как раз в этот момент он «останавливает» чтение данных,
ожидает событие «drain», после чего передача данных возобновляется.

*/

// const fs = require('fs')
// const read = fs.createReadStream('./testfile')
// const write = fs.createWriteStream('./testfile', { flags: 'a' })
// read.pipe(write)
// console.log('aboba')
// const r = fs.createReadStream('./test')
// const w = fs.createWriteStream(',/test', { flags: 'a+' })
// r.on('open', data => {
//   console.log(data)
//   r.pipe(w)
// })

/* let l = 0
console.time('a')
const read = fs.createReadStream('./test') // { highWaterMark: 1 })
const write = fs.createWriteStream('./test', { flags: 'a' })
read.on('data', data => {
  l++
  if (l > 50000) {
    console.log('limit')
    read.destroy()
  }
})
read.pipe(write)
read.on('close', () => {
  console.timeEnd('a')
}) */
/* let i = 0
let counter = 0
const serv = http.createServer((req, res) => {
  const read = fs.createReadStream('./test', { highWaterMark: 15 })
  const a = read.read(25)
  console.log(a)
  read.pipe(res)
})

serv.listen(8001)
 */

/* const { Writable } = require('stream')

const outStream = new Writable({
  write (chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})

process.stdin.pipe(outStream) */

/* const { Readable } = require('stream');

const inStream = new Readable({
  read() {}
});

inStream.push('ABCDEFGHIJKLM');
inStream.push('NOPQRSTUVWXYZ');

inStream.push(null); // No more data

inStream.pipe(process.stdout); */

const { createReadStream, createWriteStream } = require('fs')
const http = require('http') /* 
const read = createReadStream('./test', { highWaterMark: 1 })
const read2 = createReadStream('./test', { highWaterMark: 1 })
const read3 = createReadStream('./test', { highWaterMark: 1 })
const read4 = createReadStream('./test', { highWaterMark: 1 })

setTimeout(() => {
  read.emit('end')
  console.log('aboba')
}, 1000)

read.pipe(process.stdout)
read2.pipe(process.stdout)
read3.pipe(process.stdout)
read4.pipe(process.stdout)

read4.on('close', () => {
  console.log('end')
})
 */
// const read = createReadStream('./test')
// const write = createWriteStream('./test.copy')

// read.pipe(write).on('error', console.error)

/* const write = createWriteStream('./input')
process.stdin.pipe(write) */

/* const { PassThrough } = require('stream')

const report = new PassThrough()

read.pipe(report).pipe(write)

report.on('data', data => {
  console.log(data)
})
 */
/* 
const http = require('http')
const serv = http.createServer((req, res) => {
  // process.stdin.on('data', data => {
  //   if (data.toString() === 'exit\n') {
  //     res.end()
  //     return
  //   }
  //   res.write(data)
  // })
  // res.on('close', () => {})
  process.stdin.pipe(res)
  res.on('close', () => {
    process.stdin.unpipe(res)
  })
})

serv.listen(8001)
 */
/* 
const fs = require('fs')
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/octet-stream' })
  const stream = fs.createReadStream('./test')
  stream.pipe(res)
})

server.listen(8001) */

/* const fs = require('fs');
const read = fs.createReadStream('./test')
const write = fs.createWriteStream('./test', { flags: 'a' })

read.pipe(write) */ const {
  stdin,
  stdout
} = process

stdin.on('data', data => {
  stdout.write(data)
})
