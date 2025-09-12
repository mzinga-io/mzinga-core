import type { MeHook } from '../../../../packages/mzinga/src/collections/config/types'

export const meHook: MeHook = ({ user }) => {
  if (user.email === 'dontrefresh@payloadcms.com') {
    return {
      exp: 10000,
      user,
    }
  }
}
