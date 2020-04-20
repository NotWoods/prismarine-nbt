/* eslint-env mocha */

'use strict'

const fs = require('fs').promises
const nbt = require('../')
const { expect } = require('chai')

describe('nbt.parse', function () {
  function checkBigtest (data) {
    expect(data.value.stringTest.value).to.equal(
      'HELLO WORLD THIS IS A TEST STRING ÅÄÖ!')
    expect(data.value['nested compound test'].value).to.deep.equal({
      ham: {
        type: 'compound',
        value: {
          name: { type: 'string', value: 'Hampus' },
          value: { type: 'float', value: 0.75 }
        }
      },
      egg: {
        type: 'compound',
        value: {
          name: { type: 'string', value: 'Eggbert' },
          value: { type: 'float', value: 0.5 }
        }
      }
    })
  }

  it('parses an uncompressed NBT file', async function () {
    const file = await fs.readFile('sample/bigtest.nbt')
    const data = nbt.parseUncompressed(file)

    checkBigtest(data)
  })
})

describe('nbt.write', function () {
  it('writes an uncompressed NBT file', async function () {
    const nbtdata = await fs.readFile('sample/bigtest.nbt')
    expect(nbt.writeUncompressed(require('../sample/bigtest'))).to.deep.equal(nbtdata)
  })

  it('re-encodes it input perfectly', async function () {
    const input = require('../sample/bigtest')
    const output = nbt.writeUncompressed(input)
    const decodedOutput = nbt.parseUncompressed(output)
    expect(decodedOutput).to.deep.equal(input)
  })
})
