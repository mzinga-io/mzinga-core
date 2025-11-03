import { CollectionConfig } from 'mzinga/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Users
