# MZinga MongoDB Adapter

Official MongoDB adapter for [MZinga](https://mzinga.io).

- [Main Repository](https://github.com/mzinga-io/mzinga-core)
- [MZinga Docs](https://mzinga.io/docs)

## Installation

```bash
npm install @mzinga/db-mongodb
```

## Usage

```ts
import { buildConfig } from 'mzinga/config'
import { mongooseAdapter } from '@mzinga/db-mongodb'

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // ...rest of config
})
```

More detailed usage can be found in the [MZinga Docs](https://mzinga.io/docs/configuration/overview).
