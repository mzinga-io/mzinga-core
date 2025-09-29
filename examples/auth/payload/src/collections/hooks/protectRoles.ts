import type { FieldHook } from 'mzinga/types'

import type { User } from '../../payload-types'

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User & { id: string }> = async ({ req, data }) => {
  const isAdmin = req.user?.roles.includes('admin') || data.email === 'demo@mzinga.io' // for the seed script

  if (!isAdmin) {
    return ['user']
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user')
  return [...userRoles]
}
