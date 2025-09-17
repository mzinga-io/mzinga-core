import type { Access } from 'mzinga/config'

import { checkRole } from '../../Users/checkRole'

export const adminsOrOrderedBy: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    orderedBy: {
      equals: user?.id,
    },
  }
}
