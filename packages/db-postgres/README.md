# MZinga Postgres Adapter

Official Postgres adapter for [MZinga](https://mzinga.io).

- [Main Repository](https://github.com/mzinga-io/mzinga-core)
- [MZinga Docs](https://mzinga.io/docs)

## Installation

```bash
npm install @payloadcms/db-postgres
```

## Usage

```ts
import { buildConfig } from 'mzinga/config'
import { postgresAdapter } from '@mzinga/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  // ...rest of config
})
```

More detailed usage can be found in the [MZinga Docs](https://mzinga.io/docs/configuration/overview).
