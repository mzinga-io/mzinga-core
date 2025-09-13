# MZinga Vite Adapter

Official Vite adapter for [MZinga](https://mzinga.io).

- [Main Repository](https://github.com/mzinga-io/mzinga-core)
- [MZinga Docs](https://mzinga.io/docs)

## Installation

```bash
npm install @mzinga/bundler-vite
```

## Usage

```ts
import { buildConfig } from 'mzinga/config'
import { viteBundler } from '@mzinga/bundler-vite'

export default buildConfig({
  bundler: viteBundler(),
  // ...rest of config
})
```

More detailed usage can be found in the [MZinga Docs](https://mzinga.io/docs/configuration/overview).
