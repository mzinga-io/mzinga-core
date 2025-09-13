import type { CollectionConfig } from '../../../packages/mzinga/src/collections/config/types'

import {
  autosaveCollectionSlug,
  draftCollectionSlug,
  postCollectionSlug,
  versionCollectionSlug,
} from '../slugs'

const Posts: CollectionConfig = {
  slug: postCollectionSlug,
  fields: [
    {
      name: 'relationToAutosaves',
      type: 'relationship',
      relationTo: autosaveCollectionSlug,
    },
    {
      name: 'relationToVersions',
      type: 'relationship',
      relationTo: versionCollectionSlug,
    },
    {
      name: 'relationToDrafts',
      type: 'relationship',
      relationTo: draftCollectionSlug,
    },
  ],
}

export default Posts
