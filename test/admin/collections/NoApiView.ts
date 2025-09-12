import type { CollectionConfig } from '../../../packages/mzinga/src/collections/config/types'

import { noApiViewCollectionSlug } from '../slugs'

export const CollectionNoApiView: CollectionConfig = {
  slug: noApiViewCollectionSlug,
  admin: {
    hideAPIURL: true,
  },
  fields: [],
}
