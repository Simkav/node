/* 
WebAssembly

Полуярные примеры
TensorFlow - js lib для машинного обучения
Unity - компиляция кода в wasm
Веб версия AutoCAD 
Google Earth

Бенчмарки
https://takahirox.github.io/WebAssembly-benchmark/
http://aws-website-webassemblyskeletalanimation-ffaza.s3-website-us-east-1.amazonaws.com/
https://codepen.io/jtiscione/pen/yxybjX

WebAssembly – это новый открытый формат байт-кода, исполняемого современными браузерами.

Он позволяет переносить код, написанный на таких языках как C, C++, C#, Rust, в низкоуровневые ассемблерные инструкции и использовать его в сети.

Формат имеет компактные размеры, высокую производительность, близкую к нативной, и может одновременно работать с  JavaScript.

WebAssembly оказывает огромное влияние на веб-платформу — он предоставляет способ исполнения кода,
написанного на различных языках, в сети, со скоростью близкой к нативной, чего ранее невозможно было достичь.

WebAssembly разработан для дополнения JavaScript – используя WebAssembly JavaScript API 
вы можете загружать модули WebAssembly в приложения JavaScript и обеспечивать взаимодействие между ними, используя общие функции.

Такой подход позволяет вам получить производительность и мощность WebAssembly, а также выразительность и гибкость JavaScript в ваших приложениях,
даже если вы не знаете как писать код WebAssembly, а используете готовые модули.

В сравнении с JavaScript, получается, что в среднем Wasm быстрее, но в каждом частном случае нужно делать сравнение JS/Wasm, потому что может получиться и во много раз лучше, и в несколько раз хуже. Также это может сильно зависеть от используемого браузера.

На самом деле, пиковая производительность JS и Wasm одинакова,оба выполняются в одной вм, оба в итоге превращаются в родной код процессора.
Но JS гораздо легче теряет в производительности, а Wasm обеспечивает более «ровный» подход.

Как правило, Wasm хорошо показывает себя на объёмных вычислениях. Там где много операций с памятью, Wasm проигрывает. 

Не язык програмирования, но можно писать на нем
бинарный формат запускаемый в браузере, виртуальная машина(может запускаться и вне веба)
WebAssembly органично заполнит пробелы, которые есть в функциональности JavaScript.
мост между JavaScript и машинным кодом

Типы данных:
числа с плавающей точкой, целые числа
Инструкции:
матемтичные(+-*\/)
битовые операции
операции сравнения

условные констркуции
циклы

Сылочки
https://habr.com/ru/post/475778/
https://developer.mozilla.org/ru/docs/WebAssembly
https://www.youtube.com/watch?v=h3kwQ7nbGb4&
https://www.youtube.com/watch?v=1Ba1l0cieMY
https://www.youtube.com/watch?v=qOPTlY-FMSw&
wabt apt
wat2wasm
*/
const fs = require('fs')
const http = require('http')
const serv = http.createServer((req, res) => {
  const stream = fs.createReadStream('./simple.wasm')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Content-Type', 'application/wasm')
  stream.pipe(res)
})

serv.listen(8001)
