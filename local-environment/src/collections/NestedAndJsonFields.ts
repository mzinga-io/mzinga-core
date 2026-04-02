import { CollectionConfig } from 'mzinga/types'

export const NestedAndJsonFields: CollectionConfig = {
  slug: 'nested-json-fields',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'nested',
      type: 'group',
      fields: [{ name: 'nestedField', type: 'text', required: true }],
    },
    { name: 'jsonField', type: 'json', required: true },
  ],
}
