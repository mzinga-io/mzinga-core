import type { SQL } from 'drizzle-orm'
import type { Field, PayloadRequest } from 'mzinga/types'

import type { DrizzleDB, GenericColumn, PostgresAdapter } from '../types'

type BaseArgs = {
  adapter: PostgresAdapter
  data: Record<string, unknown>
  db: DrizzleDB
  fields: Field[]
  path?: string
  req: PayloadRequest
  tableName: string
}

type CreateArgs = {
  id?: never
  operation: 'create'
  upsertTarget?: never
  where?: never
} & BaseArgs

type UpdateArgs = {
  id?: number | string
  operation: 'update'
  upsertTarget?: GenericColumn
  where?: SQL<unknown>
} & BaseArgs

export type Args = CreateArgs | UpdateArgs
