# Prismarine-NBT
[![NPM version](https://img.shields.io/npm/v/notwoods/prismarine-nbt.svg)](http://npmjs.com/package/prismarine-nbt)

Prismarine-NBT is a JavaScript parser and serializer for [NBT](http://wiki.vg/NBT) archives, for use with [Node.js](http://nodejs.org/).

This fork is designed to run in browser enviornments in addition to Node.


## Usage

```js
const fs = require('fs')
const nbt = require('prismarine-nbt')

fs.readFile('bigtest.nbt', function(error, file) {
    if (error) throw error;

    const data = nbt.parseUncompressed(file)
    console.log(data.value.stringTest.value)
    console.log(data.value['nested compound test'].value)
});
```

Unlike the original module, this version does not automatically decompress gzipped files.

## API

### writeUncompressed(value, [isLittleEndian])

Returns a buffer with a serialized nbt `value`. If isLittleEndian is passed and is true, write little endian nbt (mcpe).

### parseUncompressed(data, [isLittleEndian])

Takes a buffer `data` and returns a parsed nbt value. If isLittleEndian is passed and is true, read little endian nbt (mcpe).

### simplify(nbt)

Returns a simplified nbt representation : keep only the value to remove one level.
This loses the types so you cannot use the resulting representation to write it back to nbt.

### proto()

Provide the protodef instance used to parse and serialize nbt.

### protoLE()

Provide the protodef instance used to parse and serialize little endian nbt.
