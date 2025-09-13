import type { GlobalConfig } from '../../../packages/mzinga/src/globals/config/types'

import { noApiViewGlobalSlug } from '../slugs'

export const GlobalNoApiView: GlobalConfig = {
  slug: noApiViewGlobalSlug,
  admin: {
    hideAPIURL: true,
  },
  fields: [],
}
