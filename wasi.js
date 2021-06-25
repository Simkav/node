/*
The WASI class provides the WASI system call API and additional convenience methods for working with WASI-based applications.
Each WASI instance represents a distinct sandbox environment. 
For security purposes, each WASI instance must have its command-line arguments, environment variables, and sandbox directory structure configured explicitly. 

new WASI([options])

*/

'use strict';
const fs = require('fs');
const { WASI } = require('wasi');
const wasi = new WASI({
  args: process.argv,
  env: process.env,
  preopens: {
    '/sandbox': '/home/developer/test'
  }
});
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(fs.readFileSync('./demo.wasm'));
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
})();