import type { Create } from 'mzinga/database'

import toSnakeCase from 'to-snake-case'

import type { PostgresAdapter } from './types'

import { upsertRow } from './upsertRow'

export const create: Create = async function create(
  this: PostgresAdapter,
  { collection: collectionSlug, data, req },
) {
  const db = this.sessions[await req.transactionID]?.db || this.drizzle
  const collection = this.payload.collections[collectionSlug].config

  const tableName = this.tableNameMap.get(toSnakeCase(collection.slug))

  const result = await upsertRow({
    adapter: this,
    data,
    db,
    fields: collection.fields,
    operation: 'create',
    req,
    tableName,
  })

  return result
}
