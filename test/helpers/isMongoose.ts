import type { Payload } from '../../packages/mzinga/src'

export function isMongoose(_payload?: Payload) {
  return _payload?.db?.name === 'mongoose' || ['mongoose'].includes(process.env.PAYLOAD_DATABASE)
}
