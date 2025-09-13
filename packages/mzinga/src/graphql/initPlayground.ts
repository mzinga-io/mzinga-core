import graphQLPlayground from 'graphql-playground-middleware-express'

import type { Payload } from '../mzinga'

function initPlayground(ctx: Payload): void {
  if (
    (!ctx.config.graphQL.disable &&
      !ctx.config.graphQL.disablePlaygroundInProduction &&
      process.env.NODE_ENV === 'production') ||
    process.env.NODE_ENV !== 'production'
  ) {
    ctx.router.get(
      ctx.config.routes.graphQLPlayground,
      graphQLPlayground({
        endpoint: `${ctx.config.routes.api}${ctx.config.routes.graphQL}`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        settings: {
          'request.credentials': 'include',
        },
      }),
    )
  }
}

export default initPlayground
