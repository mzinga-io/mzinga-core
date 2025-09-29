import type { Payload } from 'mzinga'

export const seed = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'demo@mzinga.io',
      password: 'demo',
      roles: ['admin'],
    },
  })
}
