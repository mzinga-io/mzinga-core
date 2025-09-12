import type { GlobalConfig } from '../../../packages/mzinga/src/globals/config/types'

import { group2GlobalSlug } from '../slugs'

export const GlobalGroup1B: GlobalConfig = {
  slug: group2GlobalSlug,
  admin: {
    group: 'Group',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
