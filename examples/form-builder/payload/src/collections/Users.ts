import { CollectionConfig } from 'mzinga/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Don't need any user fields here
  ],
}
