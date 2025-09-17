import type { CollectionConfig } from '../../../../packages/mzinga/src/collections/config/types'

import { slugs } from '../../shared'
import { ValidateDraftsOn } from '../ValidateDraftsOn'

export const ValidateDraftsOnAndAutosave: CollectionConfig = {
  ...ValidateDraftsOn,
  slug: slugs.validateDraftsOnAutosave,
  versions: {
    drafts: {
      autosave: true,
      validate: true,
    },
  },
}
