import type { SingleRelationshipField } from 'mzinga/types'

export const createParentField = (
  relationTo: string,
  overrides?: Partial<
    {
      hasMany: false
    } & SingleRelationshipField
  >,
): SingleRelationshipField => ({
  name: 'parent',
  admin: {
    position: 'sidebar',
    ...(overrides?.admin || {}),
  },
  // filterOptions are assigned dynamically based on the pluginConfig
  // filterOptions: parentFilterOptions(),
  maxDepth: 1,
  relationTo,
  type: 'relationship',
  ...(overrides || {}),
})

export default createParentField
