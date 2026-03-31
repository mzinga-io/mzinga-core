import type { NextFunction, Response } from 'express'

import type { PayloadRequest } from '../../express/types'
import type { Document, Select } from '../../types'

import { sanitizeCollectionID } from '../../utilities/sanitizeCollectionID'
import findByID from '../operations/findByID'

export type FindByIDResult = {
  doc: Document
  message: string
}

export default async function findByIDHandler(
  req: PayloadRequest,
  res: Response,
  next: NextFunction,
): Promise<Response<FindByIDResult> | void> {
  const id = sanitizeCollectionID({
    id: req.params.id,
    collectionSlug: req.collection.config.slug,
    payload: req.payload,
  })
  let select = {} as Select
  if (req.query.select) {
    for (const field of Object.keys(req.query.select)) {
      const selectValue = (req.query.select[field] || '').toString()
      select[field] = selectValue === '1' || selectValue === 'true' ? 1 : 0
    }
  }

  try {
    const doc = await findByID({
      id,
      collection: req.collection,
      depth: Number(req.query.depth),
      draft: req.query.draft === 'true',
      req,
      select,
    })
    return res.json(doc)
  } catch (error) {
    return next(error)
  }
}
