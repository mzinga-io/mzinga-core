import type { DeleteOne } from 'mzinga/database'
import type { PayloadRequest } from 'mzinga/types'

import type { MongooseAdapter } from '.'

import sanitizeInternalFields from './utilities/sanitizeInternalFields'
import { withSession } from './withSession'

export const deleteOne: DeleteOne = async function deleteOne(
  this: MongooseAdapter,
  { collection, req = {} as PayloadRequest, where },
) {
  const Model = this.collections[collection]
  const options = await withSession(this, req)

  const query = await Model.buildQuery({
    payload: this.payload,
    where,
  })

  let doc = await Model.findOneAndDelete(query, options).lean()

  doc = this.jsonParse ? JSON.parse(JSON.stringify(doc)) : doc

  return sanitizeInternalFields(doc)
}
