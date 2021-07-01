const buf = Buffer.alloc(25)
console.log(buf)

buf.write('alo', 0, 10, 'utf8')

buf.write('alo', 10, 20, 'utf16le')

console.log(buf.toString('utf16le', 10, 16))
const buf1 = Buffer.from('abobc','utf8')
console.log(buf1)
const buf2 = Buffer.from('af','utf8')
console.log(buf2)
console.log(Buffer.compare(buf1, buf2))
