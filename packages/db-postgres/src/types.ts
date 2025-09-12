import type {
  ColumnBaseConfig,
  ColumnDataType,
  DrizzleConfig,
  ExtractTablesWithRelations,
  Relation,
  Relations,
} from 'drizzle-orm'
import type { NodePgDatabase, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres'
import type {
  PgColumn,
  PgEnum,
  pgEnum,
  PgSchema,
  PgTableWithColumns,
  PgTransaction,
} from 'drizzle-orm/pg-core'
import type { PgTableFn } from 'drizzle-orm/pg-core/table'
import type { BaseDatabaseAdapter } from 'mzinga/database'
import type { PayloadRequest } from 'mzinga/types'
import type { Payload } from 'payload'
import type { Pool, PoolConfig } from 'pg'

export type DrizzleDB = NodePgDatabase<Record<string, unknown>>

export type Args = {
  idType?: 'serial' | 'uuid'
  localesSuffix?: string
  logger?: DrizzleConfig['logger']
  migrationDir?: string
  pool: PoolConfig
  push?: boolean
  relationshipsSuffix?: string
  schemaName?: string
  versionsSuffix?: string
}

export type GenericColumn = PgColumn<
  ColumnBaseConfig<ColumnDataType, string>,
  Record<string, unknown>
>

export type GenericColumns = {
  [x: string]: GenericColumn
}

export type GenericTable = PgTableWithColumns<{
  columns: GenericColumns
  dialect: string
  name: string
  schema: undefined
}>

export type GenericEnum = PgEnum<[string, ...string[]]>

export type GenericRelation = Relations<string, Record<string, Relation<string>>>

export type DrizzleTransaction = PgTransaction<
  NodePgQueryResultHKT,
  Record<string, unknown>,
  ExtractTablesWithRelations<Record<string, unknown>>
>

type Schema =
  | {
      enum: typeof pgEnum
      table: PgTableFn
    }
  | PgSchema

export type PostgresAdapter = {
  drizzle: DrizzleDB
  enums: Record<string, GenericEnum>
  /**
   * An object keyed on each table, with a key value pair where the constraint name is the key, followed by the dot-notation field name
   * Used for returning properly formed errors from unique fields
   */
  fieldConstraints: Record<string, Record<string, string>>
  idType: Args['idType']
  localesSuffix?: string
  logger: DrizzleConfig['logger']
  pgSchema?: Schema
  pool: Pool
  poolOptions: Args['pool']
  push: boolean
  relations: Record<string, GenericRelation>
  relationshipsSuffix?: string
  schema: Record<string, unknown>
  schemaName?: Args['schemaName']
  sessions: {
    [id: string]: {
      db: DrizzleTransaction
      reject: () => Promise<void>
      resolve: () => Promise<void>
    }
  }
  tableNameMap: Map<string, string>
  tables: Record<string, GenericTable | PgTableWithColumns<any>>
  versionsSuffix?: string
} & BaseDatabaseAdapter

export type IDType = 'integer' | 'numeric' | 'uuid' | 'varchar'

export type PostgresAdapterResult = (args: { payload: Payload }) => PostgresAdapter

export type MigrateUpArgs = {
  payload: Payload
  req?: Partial<PayloadRequest>
}
export type MigrateDownArgs = {
  payload: Payload
  req?: Partial<PayloadRequest>
}

declare module 'payload' {
  export interface DatabaseAdapter
    extends Omit<Args, 'migrationDir' | 'pool'>,
      BaseDatabaseAdapter {
    drizzle: DrizzleDB
    enums: Record<string, GenericEnum>
    fieldConstraints: Record<string, Record<string, string>>
    localeSuffix?: string
    pool: Pool
    push: boolean
    relations: Record<string, GenericRelation>
    relationshipsSuffix?: string
    schema: Record<string, unknown>
    sessions: {
      [id: string]: {
        db: DrizzleTransaction
        reject: () => Promise<void>
        resolve: () => Promise<void>
      }
    }
    tables: Record<string, GenericTable>
    versionsSuffix?: string
  }
}
