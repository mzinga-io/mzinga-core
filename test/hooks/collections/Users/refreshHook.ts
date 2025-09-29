import type { RefreshHook } from '../../../../packages/mzinga/src/collections/config/types'

export const refreshHook: RefreshHook = ({ user }) => {
  if (user.email === 'dontrefresh@mzinga.io') {
    return {
      exp: 1,
      refreshedToken: 'fake',
      strategy: 'local-jwt',
      user,
    }
  }
}
