import type { Access } from 'mzinga/config'

import { checkRole } from './checkRole'

export const admins: Access = ({ req: { user } }) => checkRole(['admin'], user)
