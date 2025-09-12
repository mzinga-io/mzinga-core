import type { CollectionConfig } from '../../../packages/mzinga/src/collections/config/types'

import { group2Collection2Slug } from '../slugs'

export const CollectionGroup2B: CollectionConfig = {
  slug: group2Collection2Slug,
  admin: {
    group: 'One',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
