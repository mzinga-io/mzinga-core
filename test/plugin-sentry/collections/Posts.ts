import type { CollectionConfig } from '../../../packages/mzinga/src/collections/config/types'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: () => false,
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}
