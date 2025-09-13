import type { Access } from 'mzinga/types'

export const lastLoggedInTenant: Access = ({ req: { user }, data }) =>
  user?.lastLoggedInTenant?.id === data?.id
