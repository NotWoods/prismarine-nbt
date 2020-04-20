import ProtoDef from 'protodef/src/protodef'
import { compound } from './compound'
import nbtJson from './nbt.json'

export { Buffer } from 'buffer';

function createProto (littleEndian) {
  let proto
  return () => {
    if (!proto) {
      proto = new ProtoDef()
      proto.addType('compound', compound)
      if (littleEndian) {
        const leNbtJson = JSON.parse(JSON.stringify(nbtJson).replace(/(i[0-9]+)/g, 'l$1'))
        proto.addTypes(leNbtJson)
      } else {
        proto.addTypes(nbtJson)
      }
    }
    return proto
  }
}

export const proto = createProto(false)
export const protoLE = createProto(true)

export function writeUncompressed (value, le) {
  return (le ? protoLE() : proto()).createPacketBuffer('nbt', value)
}

/**
 * @param {any} data
 * @param {boolean} [le] If true, use little endian.
 */
export function parseUncompressed (data, le) {
  return (le ? protoLE() : proto()).parsePacketBuffer('nbt', data).data
}

export function simplify (data) {
  function transform (value, type) {
    if (type === 'compound') {
      return Object.keys(value).reduce(function (acc, key) {
        acc[key] = simplify(value[key])
        return acc
      }, {})
    }
    if (type === 'list') {
      return value.value.map(function (v) { return transform(v, value.type) })
    }
    return value
  }
  return transform(data.value, data.type)
}
