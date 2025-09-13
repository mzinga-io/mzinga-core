import type { TypeWithVersion } from 'mzinga/database'
import type { PayloadRequest, TypeWithID } from 'mzinga/types'

import { sql } from 'drizzle-orm'
import { type CreateGlobalVersionArgs } from 'mzinga/database'
import { buildVersionGlobalFields } from 'mzinga/versions'
import toSnakeCase from 'to-snake-case'

import type { PostgresAdapter } from './types'

import { upsertRow } from './upsertRow'

export async function createGlobalVersion<T extends TypeWithID>(
  this: PostgresAdapter,
  { autosave, globalSlug, req = {} as PayloadRequest, versionData }: CreateGlobalVersionArgs,
) {
  const db = this.sessions[await req.transactionID]?.db || this.drizzle
  const global = this.payload.globals.config.find(({ slug }) => slug === globalSlug)

  const tableName = this.tableNameMap.get(`_${toSnakeCase(global.slug)}${this.versionsSuffix}`)

  const result = await upsertRow<TypeWithVersion<T>>({
    adapter: this,
    data: {
      autosave,
      latest: true,
      version: versionData,
    },
    db,
    fields: buildVersionGlobalFields(global),
    operation: 'create',
    req,
    tableName,
  })

  const table = this.tables[tableName]

  if (global.versions.drafts) {
    await db.execute(sql`
      UPDATE ${table}
      SET latest = false
      WHERE ${table.id} != ${result.id};
    `)
  }

  return result
}
