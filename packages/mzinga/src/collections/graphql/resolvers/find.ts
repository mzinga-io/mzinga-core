/* eslint-disable no-param-reassign */
import type { PaginatedDocs } from '../../../database/types'
import type { PayloadRequest } from '../../../express/types'
import type { Select, Where } from '../../../types'
import type { Collection } from '../../config/types'

import { fieldsProjection } from 'graphql-fields-list'
import type { GraphQLResolveInfo } from 'graphql/type'
import isolateObjectProperty from '../../../utilities/isolateObjectProperty'
import find from '../../operations/find'

export type Resolver = (
  _: unknown,
  args: {
    data: Record<string, unknown>
    draft: boolean
    fallbackLocale?: string
    limit?: number
    locale?: string
    page?: number
    sort?: string
    where?: Where
  },
  context: {
    req: PayloadRequest
    res: Response
  },
  info?: GraphQLResolveInfo,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<PaginatedDocs<any>>

export default function findResolver(collection: Collection): Resolver {
  return async function resolver(_, args, context, info) {
    let { req } = context
    const locale = req.locale
    const fallbackLocale = req.fallbackLocale

    req = isolateObjectProperty(req, ['locale', 'fallbackLocale', 'transactionID'])
    req.locale = args.locale || locale
    req.fallbackLocale = args.fallbackLocale || fallbackLocale
    if (!req.query) req.query = {}

    const draft: boolean =
      (args.draft ?? req.query?.draft === 'false')
        ? false
        : req.query?.draft === 'true'
          ? true
          : undefined
    if (typeof draft === 'boolean') req.query.draft = String(draft)
    context.req = req
    const selectProjection = fieldsProjection(info)
    let select = {} as Select
    for (const field of Object.keys(selectProjection)) {
      const selectValue = (selectProjection[field] || '').toString()
      // Only the top-level path segment is meaningful for projection: a relationship
      // field like `tags` stores raw related IDs, not the shape of its populated subfields
      // (e.g. `tags.name`), so requesting `tags { name }` must still project the whole
      // `tags` field or the relationship resolver has no raw value left to populate from.
      const key = field.replace('docs.', '').split('.')[0]
      select[key] = selectValue === '1' || selectValue === 'true' ? 1 : 0
    }
    const options = {
      collection,
      depth: 0,
      draft: args.draft,
      limit: args.limit,
      page: args.page,
      req,
      sort: args.sort,
      where: args.where,
      select,
    }

    const results = await find(options)
    return results
  }
}
