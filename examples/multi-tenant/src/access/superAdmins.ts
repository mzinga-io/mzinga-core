import type { Access } from 'mzinga/config'
import type { FieldHook } from 'mzinga/types'

import { checkUserRoles } from '../utilities/checkUserRoles'

export const superAdmins: Access = ({ req: { user } }) => checkUserRoles(['super-admin'], user)

export const superAdminFieldAccess: FieldHook = ({ req: { user } }) =>
  checkUserRoles(['super-admin'], user)
