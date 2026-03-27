import { Access } from 'mzinga/config'

export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
