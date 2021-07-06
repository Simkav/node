#!/usr/bin/env node

// https://cdn-media-1.freecodecamp.org/images/1*HGXpeiF5-hJrOk_8tT2jFA.png
/* 
Потоки позволяют обмениваться данными небольшими частями, что в свою очередь дает возможность в своей работе не расходовать много памяти.

Есть четыре вида потоков:

Readable — поток, который предоставляет данные на чтение;
Writable — поток, в который данные можно записывать;
Duplex — поток, из которого можно как читать данные (Readable), 
так и записывать в него (Writable), при этом процесс чтения и записи просиходит независимо друго от друга;
Transform — разновидность Duplex потоков, которые могут изменять данные при их записи и чтении в/из потока 
(чаще используется как промежуточное звено в цепочке передачи данных).

Потоки работают со строками и буферами, но с опцией objectMode можно работать с объектами.

Потоки хранят данные в своем внутреннем буфере.
Размер буфера можно указать через параметр highWaterMark,
который можно задать в конструкторе класса.

Физический смысл значение highWaterMark зависит от другой опции — objectMode.

new StreamObject({objectMode: false, highWaterMark: кол_во_байт}); //по умолчанию 16384 (16kb)
new StreamObject({objectMode: true, highWaterMark: кол_во_объектов});//по умолчанию  16

В Readable потоке данные буферизируются, когда над ним вызвается метод push(data),
и остаются в буфере до тех пор, пока их не прочитают, вызвав метод read().
Как только общий размер внутреннего буфера Readable потока достигнет порогового значения, 
указанного в highWaterMark, поток временно прекратит чтение данных.

Для Writable буферизация происходит во время вызова над ним метода write(data). 
Метод вернет true, пока размер буфера не достиг значения highWaterMark, и false, когда буфер переполнен.
При использовании метода pipe(), как раз в этот момент он «останавливает» чтение данных,
ожидает событие «drain», после чего передача данных возобновляется.

Потоки наследуются от EventEmitter это дает потокам возможность работы с эвентами.

Состояние flowing или paused потока Readable

flowing — данные поступают непрерывно и как можно быстро для процесса, который их считывает;
paused — режим по умолчанию для всех типов потоков, ,
данные передаются только если их явно запросили — явный вызов метода read()
(метод read() неявно вызывается «внутри» метода pipe()).

Состояние flowing === true — автоматически если:

данные передаются другим потокам через метод pipe();
и/или у него есть обработчик события 'data';
и/или над ним вызван метод resume().

Из состояния flowing в paused можно переключиться (flowing === false):

если «разорвем» связь между источником данных и их потребителем (Readable.pipe(Writable);
Readable.unpipe(Writable)), и/или удалим обработчик события 'data';
или вызовем метод Readable.pause().

На момент инициализации класса Readable flowing === null, то есть еще не реализован механизм чтения данных, и данные не генерируются.

Эвенты
Readable: 
!data - стрим отдает какие-то данные из своего буфера
!readable - в стриме есть данные которые он готов отдать, также !выполняетеся когда данные закончились, !перед end
close - стрим или привязаный ресурс закрывается, последний эвент
end - данные закончились, больше передавать нечего
error - ашибка
pause - вызов rStream.pause() и readableFlowing !false
resume - вызов rStream.resume() и readableFlowing !true

Writable:
close - close
drain - когда заполнеынй внутрений буфер стрима опустошится
error - ашибка
finish - вызов wStream.end() - сигнал о том что данные больше записываться не будут
pipe - вызов rStream.pipe(wStream) - возвращает rStream
unpipe - вызов rStream.unpipe(wStream) - возвращает rStream


*/

const { Readable, Writable } = require('stream')

const arr = [
  '<head>',
  '<meta charset="UTF-8" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '<link rel="stylesheet" href="./assets/css/reset.css" />',
  '<link rel="stylesheet" href="./assets/css/style.css" />',
  '<title>Document</title>',
  '</head>'
]

class ArrToStream extends Readable {
  constructor (array) {
    super({ encoding: 'utf8' })
    this.array = array
    this.index = 0
  }

  _read () {
    if (this.index <= this.array.length) {
      const chunk = this.array[this.index]
      this.push(chunk)
      this.index += 1
    } else this.push(null)
  }
}

const ar = new ArrToStream(arr)

class StringToArr extends Writable {
  constructor (opt = {}) {
    super(opt)
    this.arr = []
  }
  _write (chunk, encoding, done) {
    this.arr.push(chunk)
    done()
  }
  getArr () {
    return this.arr
  }
  getUtfArr () {
    return this.arr.map(buffer => buffer.toString('utf8'))
  }
}
const a = new StringToArr()
process.stdin.on('data', data => {
  const value = data.toString().trim()
  if (value === 'exit') {
    console.log(a.getUtfArr())
    a.end()
    process.exit(0)
  } else {
    a.write(value)
  }
})
ar.pipe(a, { end: false })

/* 
ar.on('data', data => {
  console.log(data)
})
  .on('end', () => {
    console.log('array stream ended')
  })
  .on('error', err => {
    console.log(err)
  })

console.log(ar.read())
console.log(ar.read())
console.log(ar.read())
console.log(ar.read())
console.log(ar.read())
console.log(ar.read())
*/

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

// const { createReadStream, createWriteStream } = require('fs')
// const http = require('http')
/* 
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
/* 
const { PassThrough } = require('stream')

const report = new PassThrough()

report.on('data', data => {
  console.log(data.toString(), 'reported data')
})
process.stdin.pipe(report)
 */
/* 
const http = require('http')
const serv = http.createServer((req, res) => {
  process.stdin.on('data', data => {
    res.write(data, 'utf8')
    if (data.toString().trim() === 'exit') {
      res.end()
    }
  })
})

serv.listen(8001) */

/* 
const fs = require('fs')
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/octet-stream' })
  const stream = fs.createReadStream('./test')
  stream.pipe(res)
})

server.listen(8001) */

/* const split2 = require('split2')
const fs = require('fs')
const copyFileWithReplace = (from, to, search, replace) => {
  console.log(from)
  const read = fs.createReadStream(from, {
    encoding: 'utf8',
    highWaterMark: 64
  })
  const write = fs.createWriteStream(to)
  const split = split2()
  read
    .pipe(split)
    .on('data', data => {
      write.write(data.replace(search, replace) + '\n')
    })
    .on('close', () => {
      split.destroy()
      read.destroy()
      write.destroy()
    })
}

copyFileWithReplace('./data.html', './data.copy', /lorem/gi, 'alo')
*/

/* 
function writeOneMillionTimes (writer, data, encoding, callback) {
  var i = 1000000
  write()
  function write () {
    var ok = true
    do {
      i -= 1
      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback)
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding)
      }
    } while (i > 0 && ok)
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      console.log('drain')
      console.log(writer._writableState.buffered[0].chunk.toString())
      writer.once('drain', write)
    }
  }
}
const ws = require('fs').createWriteStream('./test.file')
writeOneMillionTimes(
  ws,
  'LoremPrisum alo alo ake qwe scz asdnm eqwr rtLoremPrisum alo alo ake qwe scz asdnm eqwr rtLoremPrisum alo alo ake qwe scz asdnm eqwr rtLoremPrisum alo alo ake qwe scz asdnm eqwr rtLoremPrisum alo alo ake qwe scz asdnm eqwr rtLoremPrisum alo alo ake qwe scz asdnm eqwr rt\n',
  'utf8',
  () => {
    console.log('end')
  }
)
 */
