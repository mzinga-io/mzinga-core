import type { Access } from 'mzinga/config'

export const loggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}
