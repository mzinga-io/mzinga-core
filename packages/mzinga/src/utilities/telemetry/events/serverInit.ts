import type { Payload } from '../../../mzinga'

import { sendEvent } from '..'

export type ServerInitEvent = {
  type: 'server-init'
}

export const serverInit = (payload: Payload): void => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  sendEvent({
    event: {
      type: 'server-init',
    },
    payload,
  })
}
