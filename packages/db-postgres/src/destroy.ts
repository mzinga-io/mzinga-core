import type { Destroy } from 'mzinga/database'

import type { PostgresAdapter } from './types'

export const destroy: Destroy = async function destroy(this: PostgresAdapter) {
  // TODO: this hangs test suite for some reason
  // await this.pool.end()
}
