# MZinga Webpack Adapter

Official Webpack adapter for [MZinga](https://mzinga.io).

- [Main Repository](https://github.com/mzinga-io/mzinga-core)
- [MZinga Docs](https://mzinga.io/docs)

## Installation

```bash
npm install @mzinga/bundler-webpack
```

## Usage

```ts
import { buildConfig } from 'mzinga/config'
import { webpackBundler } from '@mzinga/bundler-webpack'

export default buildConfig({
  bundler: webpackBundler(),
  // ...rest of config
})
```

More detailed usage can be found in the [MZinga Docs](https://mzinga.io/docs/configuration/overview).
