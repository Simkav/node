#!/usr/bin/env node

// https://www.youtube.com/playlist?list=PLrwNNiB6YOA18XANsFe0CnizlhYKjJT0f
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

const {
  Readable,
  Writable,
  Duplex,
  PassThrough,
  Transform,
  pipeline
} = require('stream')
const { createReadStream, createWriteStream, read } = require('fs')
/* 
// Custom read example
const arr = new Array(20).fill(0).map((_, i) => `${i}`)
class myRead extends Readable {
  constructor (array) {
    super({ objectMode: true }) //encoding: 'UTF-8' => Converts buffer to string
    this.array = array
    this.index = 0
  }

  _read () {
    if (this.index <= this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index
      }
      this.push(chunk)
      this.index += 1
    } else this.push(null)
  }
}

const read = new myRead(arr)
 */
/*
//  flowing = null
read.on('data', data => { //flowin = true
  console.log(data)
}) 
*/
// ============================================================================================================================================================================
/*
const interval = setInterval(() => {
  const data = read.read() //flowin = false
  if (!data) {
    clearInterval(interval)
  }
  console.log(data)
}, 100) 
*/
// ============================================================================================================================================================================

/* 
read
  .on('error', err => {
    console.error(err)
  })
  .on('pause', () => {
    console.log('stream flow is paused')
  })
  .on('resume', () => {
    console.log('stream flow is resumed')
  })

read.pause() //flowin = false
setTimeout(() => {
  read.on('data', data => {
    console.log(data)
  }) // если бы не .pause() то flowing = true
  // console.log(read.readableFlowing)
  read.resume() //flowin = true
}, 2000)
*/
// ============================================================================================================================================================================
// ============================================================================================================================================================================
/* 
// Custom write example
class myWrite extends Writable {
  constructor () {
    super()
  }
  _write (chunk, encoding, done) {
    process.stdout.write(chunk + '\n')
    done()
  }
}
const writer = new myWrite()

for (let i = 0; i < 1000; i++) {
  writer.write(`${i}`)
}
writer.end()
*/
// ============================================================================================================================================================================
/* 
// пример drain
const readStream = createReadStream('./data.html')
const writeStream = createWriteStream('./copy.copy')

readStream.on('data', chunk => {
  const result = writeStream.write(chunk)
  console.log(chunk.length)
  if (!result) {
    console.log('backpressure')
    readStream.pause()
  }
})

readStream.on('error', err => {
  console.log('An err has occured')
  console.error(err)
})

readStream.on('end', () => {
  writeStream.end()
})

writeStream.on('drain', () => {
  console.log('drained')
  readStream.resume()
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n')
})
 */

// readStream.pipe(writeStream) - альтернатива всему этому огороду

// ============================================================================================================================================================================
// Duplex

/* const readStream = createReadStream('./data.html')
const writeStream = createWriteStream('./copy.copy')

class Throttle extends Duplex {
  constructor (ms) {
    super()
    this.delay = ms
  }

  _read () {}

  _write (chunk, encoding, callback) {
    this.push(chunk)
    setTimeout(callback, this.delay)
  }

  _final () { // _final - перед закрытием потока, срабатывает перед колбеком
    this.push(null)
  } 
}

const report = new PassThrough() // PassThrought - простейший дуплекс стрим который ничего не делает
const throttle = new Throttle(10)
const throttle1 = new Throttle(10)
let total = 0
report.on('data', chunk => {
  total += chunk.length
  console.log('total bytes: ', total)
})

console.time('a')

 */

/* pipeline(readStream, throttle, report, writeStream, err => {
  if (err) {
    console.error(err)
  }
}).on('close', () => {
  console.timeEnd('a')
}) */

// Тоже самое

/* 
readStream
  .pipe(throttle)
  .pipe(report)
  .pipe(writeStream)
  .on('close', () => {
    console.timeEnd('a')
  }) */

// ============================================================================================================================================================================
// Transform
/* 
class ReplaceText extends Transform {
  constructor (char) {
    super()
    this.replaceChar = char
  }

  _transform (chunk, encoding, callback) {
    const transformChunk = chunk
      .toString()
      .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar)
      .toUpperCase()
    this.push(transformChunk)
    callback()
  }

  _flush (callback) { // called when there is no more written data to be consumed, but before the 'end' 
    this.push('more stuff us being passed through...')
    callback()
  }
}

const xStream = new ReplaceText('x')

process.stdin.pipe(xStream).pipe(process.stdout)
*/

// ============================================================================================================================================================================
/* 
// Таска с заменой через трансформ

const split2 = require('split2')
const reader = createReadStream('./data.html')
const writer = createWriteStream('./dataRepaced.html')

class ReplaceText extends Transform {
  constructor (search, char) {
    super()
    this.searched = search
    this.replaceChar = char
  }

  _transform (chunk, encoding, callback) {
    const transformChunk = chunk
      .toString()
      .replace(this.searched, this.replaceChar)
    this.push(transformChunk + '\n')
    callback()
  }

  _flush (callback) {
    // called when there is no more written data to be consumed, but before the 'end'
    this.push('more stuff us being passed through...')
    callback()
  }
}

const replacer = new ReplaceText(/Lorem/gi, 'NOTLOREM')
pipeline(reader, split2(), replacer, writer, err => {
  err ? console.error(err) : console.log('Copied and replaced')
})
 */

// ============================================================================================================================================================================
// ============================================================================================================================================================================
// ============================================================================================================================================================================
// ============================================================================================================================================================================
// ============================================================================================================================================================================
// ============================================================================================================================================================================
// ============================================================================================================================================================================

/* 
const { Readable, Writable } = require('stream')

const arr = ['1', '2', '3', '4', '5', '6']

class ArrToStream extends Readable {
  constructor (array = []) {
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

const arrStream = new ArrToStream(arr)

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
const stringArr = new StringToArr()
process.stdin.on('data', data => {
  const value = data.toString().trim()
  if (value === 'exit') {
    console.log(stringArr.getUtfArr())
    stringArr.end()
  } else if (value === 'log') {
    console.log(stringArr.getUtfArr())
  } else {
    stringArr.write(value)
  }
})
stringArr.on('close', () => {
  process.exit(0)
})
arrStream.pipe(stringArr, { end: false })
 */
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
  write.destroy()
  console.timeEnd('a')
}) */
/* let i = 0
let counter = 0
const serv = http.createServer((req, res) => {
  const read = fs.createReadStream('./test', { highWaterMark: 15 })
  const a = read.read(25)
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
