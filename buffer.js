require('buffer')

/* 
Buffer - используется для работы с сырыми данными (байтами)
Static:
Buffer.alloc(size[, fill[, encoding]])
Выделяет новый буфер указаного size(0<=size<require('buffer').kMaxLength)
fill-опциональный параметр - чем заполнить буфер (<string> | <Buffer> | <Uint8Array> | <integer>)
ecnoding-только если указан fill и он string-заполняет созданый буфер fill строкой в encoding кодировки, если fill && !string - ничего не делает
*/
/* 
const a = Buffer.alloc(20)
const b = Buffer.alloc(20, 'alo', 'utf8')
const c = Buffer.alloc(20, 98)
console.log(a);
console.log(b);
console.log(c);
console.log(a.toString());
console.log(b.toString());
console.log(c.toString());
 */
/*
================================================================================================================================================================
Buffer.allocUnsafe(size)
+скорость -секьюрность
Выделяет новый буфер указаного size с неизвестным содержимым из памяти(потенциально опасно так как в памяти может быть все что угодно)
Идеальный вариант если делать копию
// */
/* 
// Bad
const a = Buffer.allocUnsafe(200)
console.log(a)
console.log(a.toString())
// Nice
const b = Buffer.allocUnsafe(200).fill(0)
console.log(b)
// Nice
const oldBuffer = Buffer.from('some data')
const bufferCopy = Buffer.allocUnsafe(oldBuffer.length)
oldBuffer.copy(bufferCopy)
console.log(oldBuffer)
console.log(bufferCopy)
 */
/*
================================================================================================================================================================
Buffer.allocUnsafeSlow(size)
??????????????????????????/
================================================================================================================================================================
Buffer.byteLength(string[, encoding]) : integer
string - <string> | <Buffer> | <TypedArray> | <DataView> | <ArrayBuffer> | <SharedArrayBuffer>
Возвращает числов байтов небходимое для string в указаной encoding
*/

/* console.log(Buffer.byteLength('alo', 'utf8'))
const a = '☃'
console.log(Buffer.byteLength(a, 'utf8'))
console.log(a.length)
 */

/*
================================================================================================================================================================
Buffer.compare(buf1, buf2) : 0|-1|1
buf - <Buffer> | <Uint8Array>
Buffer.compare сравнивает побайтово,0-одинаковые,1-первый болььше,-1-второй больше
*/
/* 
const a = Buffer.alloc(20)
const b = Buffer.alloc(20)
const c = Buffer.alloc(20)
c[0] = 0x63
console.log(a.compare(b))
console.log(a.compare(c))
console.log(c.compare(b))
 */
/*
================================================================================================================================================================
Buffer.concat(list[, totalLength]) : Buffer
Возвращает новый буфер склееный из массива list [Buffer|Uint8Array]
totalLength-можно указать размер получившегося буфера, если > чем результат дописывается нулями
*/
/* 
const a = Buffer.concat([
  Buffer.allocUnsafe(10),
  Buffer.allocUnsafe(10),
  Buffer.allocUnsafe(10),
  Buffer.allocUnsafe(10)
])

console.log(a);
 */
/*
================================================================================================================================================================
Buffer.isBuffer(obj) - Array.isArray(arr) : Boolean
*/
/* 
console.log(Buffer.isBuffer(Buffer.alloc(0)))
console.log(Buffer.isBuffer([Buffer.alloc(0)]))
console.log(Buffer.isBuffer([Buffer]))
 */
/*
================================================================================================================================================================
Buffer.isEncoding(encoding) : boolean
encoding - string 
поддерживаемая ли кодировка
*/
/* 
console.log(Buffer.isEncoding('utf8'))
console.log(Buffer.isEncoding('utf'))
console.log(Buffer.isEncoding('utf16'))
console.log(Buffer.isEncoding('utf16le'))
console.log(Buffer.isEncoding('hex'))
 */
/*
================================================================================================================================================================
Buffer.from(array|arrayBuffer|buffer|object|string)
*/
/*
================================================================================================================================================================
Buffer.from(array)
Возвращает buffer на основании масива битов в диапазоне 0-255
либо номер юникода в 16ричном формате 0x5c,0x53
либо номер в ascii таблице 32-126
================================================================================================================================================================
Instance Methods:
buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
target:<Buffer> | <Uint8Array>
ends:not inclusive
================================================================================================================================================================
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
Копирует из buf в target
*/

/* const buf1 = Buffer.allocUnsafe(4)
const buf2 = Buffer.allocUnsafe(13).fill('!')

for (let i = 0; i < 4; i++) {
  buf1[i] = i + 97
}

buf1.copy(buf2, 5, 0, 3)

console.log(buf2.toString())
 */

/*
================================================================================================================================================================
buf.entries() : iterator
Итератор вида [index,byte]
*/
/* 
for (ent of Buffer.allocUnsafe(5).entries()) {
  console.log(ent)
}
 */
/*
================================================================================================================================================================
buf.equals(otherBuffer):boolean
сравнение буферов
*/
/* 
const a = Buffer.alloc(10)
const b = Buffer.alloc(10)
const c = Buffer.alloc(10).fill(2)

console.log(a.equals(b))
console.log(a.equals(c))
console.log(c.equals(b))
console.log(c.equals(c))
 */
/*
================================================================================================================================================================
buf.fill(value[, offset[, end]][, encoding]):buf
value <string> | <Buffer> | <Uint8Array> | <integer>
заполняет буфер указаным value
encoding : кодировка в строковом виде, только если value = string
аналог array.fill(), но с возможностью указывать диапазон где будет заполнение
*/
// console.log(Buffer.alloc(25).fill('alo', 5, 8, 'utf8'))
/*
================================================================================================================================================================
buf.includes(value[, byteOffset][, encoding]): boolean
value <string> | <Buffer> | <Uint8Array> | <integer> 
encoding : кодировка в строковом виде, только если value = string
byteOffset:отступ
Есть ли value в buf
*/
/* 
const buf = Buffer.alloc(9, 'alo')
console.log(buf.includes('alo'))
console.log(buf.includes('oal'))
console.log(buf.includes('loa'))
console.log(buf.includes('aloo'))
console.log(buf.includes('aloaloal'))
console.log(buf.includes('aloaloalo'))
console.log(buf.includes('aloaloaloa'))
 */
/*
================================================================================================================================================================
buf.indexOf(value[, byteOffset][, encoding]) : integer
value <string> | <Buffer> | <Uint8Array> | <integer> 
Индекс первого вхождения value в buf
*/
/* 
const buf = Buffer.alloc(9, 'alo')
console.log(buf.indexOf('a'))
console.log(buf.indexOf('a', 1))
console.log(buf.indexOf('o', 3))
console.log(buf.indexOf('alo', 1))
console.log(buf.indexOf('ab'))
console.log(buf.indexOf(97)); // 97=a
 */
/*
================================================================================================================================================================
buf.keys():iterator
возвращает итератор с индексами????
*/
/* const buf = Buffer.alloc(9, 'alo')
for (const obj of buf.keys()) {
  console.log(obj)
}
 */
/*
================================================================================================================================================================
buf.lastIndexOf(value[, byteOffset][, encoding])
*/
/* 
const buf = Buffer.alloc(9, 'alo')
console.log(buf.lastIndexOf('a'))
console.log(buf.lastIndexOf('a', 1))
console.log(buf.lastIndexOf('o', 3))
console.log(buf.lastIndexOf('alo', 1))
console.log(buf.lastIndexOf('ab'))
console.log(buf.lastIndexOf(97)) // 97=a
 */
/*
================================================================================================================================================================
buf.write(string[, offset[, length]][, encoding]):integer
записывает в буфер string в кодировке encoding,
с помощью offset можно указать сдвиг от начала
length:максимальное количество байт для записи от offset
*/

/* const a = Buffer.alloc(6)
console.log(a)
a.write('abc')
a.write('abc', 3)
console.log(a)
 */
/*
================================================================================================================================================================
buf.slice([start[, end]])|buf.subarray([start[, end]])
Возвращает буфер который ссылается на ту же память что и источник
Изменения в одном затронут изменения в другом
Грубо говоря частичная копия буфера в нужном отрезке по ссылке
*/
/* 
const a = Buffer.alloc(10).fill('abzxcasdwqer')
console.log(a)
const b = a.slice(0, 5)
const c = a.slice(5, 10)
b.write('aboba')
c.write('abcde')
const concated = Buffer.concat([b, c])
console.log(concated)
console.log(a)
 */
/*
================================================================================================================================================================
buf.values():iterator
возвращает значения буфера в беззнаковом виде
*/
/* 
const a = Buffer.alloc(10).fill('abzxcasdwqer')

for (const value of a.values()) {
  console.log(value)
}
//      ||
for (const value of a) {
  console.log(value)
}
 */
/*
================================================================================================================================================================
buf.swap (16|32|64)
Меняет соседние биты 
    12345678 
16  21436587
32  43218765
64  87654321
*/
/* 
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8])
console.log(buf.swap16())
buf.swap16()
console.log(buf.swap32())
buf.swap32()
console.log(buf.swap64())
buf.swap64()
 */
/* 
================================================================================================================================================================
buf.toJson()
Вовзращает JSON представление буфера в виде
{"type":"Buffer","data":[0,1,2,3,4,5]}
*/
/* 
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8])
console.log(buf)
console.log(buf.toJSON())
 */
/* 
================================================================================================================================================================
buffer.transcode(source, fromEnc, toEnc)
Переводит данные из одной кодировки в другую
достпуные кодировки 'ascii', 'utf8', 'utf16le', 'ucs2', 'latin1','binary'
*/
/* 
const a = Buffer.from('alovasa', 'utf16le')
console.log(a)
console.log(a.toString('utf16le'))
const b = require('buffer').transcode(a, 'utf16le', 'utf8')
console.log(b)
console.log(b.toString())
 */
/* 
================================================================================================================================================================
8Uint = 0-255 
8Int = -128 - 127 
16Uint = 65536
16Int = -32768 - 32767
32Uint = 0 - 4294967295
32Int = -2147483648 2147483647
64Uint = 0 - (2^64)-1
64Int = -9,223,372,036,854,775,808 - 9,223,372,036,854,775,807
================================================================================================================================================================
buf.readBigInt64BE([offset])
buf.readBigInt64LE([offset])
buf.readBigUInt64BE([offset])
buf.readBigUInt64LE([offset])
buf.readDoubleBE([offset])
buf.readDoubleLE([offset])
buf.readFloatBE([offset])
buf.readFloatLE([offset])
buf.readInt8([offset])
buf.readInt16BE([offset])
buf.readInt16LE([offset])
buf.readInt32BE([offset])
buf.readInt32LE([offset])
buf.readIntBE(offset, byteLength)
buf.readIntLE(offset, byteLength)
buf.readUInt8([offset])
buf.readUInt16BE([offset])
buf.readUInt16LE([offset])
buf.readUInt32BE([offset])
buf.readUInt32LE([offset])
buf.readUIntBE(offset, byteLength)
buf.readUIntLE(offset, byteLength)
================================================================================================================================================================
buf.writeBigInt64BE(value[, offset])
buf.writeBigInt64LE(value[, offset])
buf.writeBigUInt64BE(value[, offset])
buf.writeBigUInt64LE(value[, offset])
buf.writeDoubleBE(value[, offset])
buf.writeDoubleLE(value[, offset])
buf.writeFloatBE(value[, offset])
buf.writeFloatLE(value[, offset])
buf.writeInt8(value[, offset])
buf.writeInt16BE(value[, offset])
buf.writeInt16LE(value[, offset])
buf.writeInt32BE(value[, offset])
buf.writeInt32LE(value[, offset])
buf.writeIntBE(value, offset, byteLength)
buf.writeIntLE(value, offset, byteLength)
buf.writeUInt8(value[, offset])
buf.writeUInt16BE(value[, offset])
buf.writeUInt16LE(value[, offset])
buf.writeUInt32BE(value[, offset])
buf.writeUInt32LE(value[, offset])
buf.writeUIntBE(value, offset, byteLength)
buf.writeUIntLE(value, offset, byteLength)
buffer.transcode(source, fromEnc, toEnc)
================================================================================================================================================================
buf.readUInt8([offset])
buf.writeUInt8(value[, offset])
Считывание\запись данных
*/
/* 
const buffer = Buffer.alloc(20)
buffer.writeUInt8(97)
buffer.writeUInt8(98,1)
buffer.writeUInt8(99,2)
buffer.writeUInt8(100,3)
buffer.writeUInt8(101,4)
buffer.writeUInt8(102,5)
buffer.writeUInt8(103,6)
console.log(buffer)
console.log(buffer.readUInt8(0));
console.log(buffer.readUInt8(1));
console.log(buffer.readUInt8(2));
console.log(buffer.readUInt8(3));
console.log(buffer.readUInt8(4));
console.log(buffer.readUInt8(5));
console.log(buffer.readUInt8(6));
console.log(buffer.readUInt16BE(0));
 */
/* 
================================================================================================================================================================
*/
