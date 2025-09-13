# Payload Slate Rich Text Editor

Slate Rich Text Editor for [Payload](https://mzinga.io).

- [Main Repository](https://github.com/mzinga-io/mzinga-core)
- [MZinga Docs](https://mzinga.io/docs)

## Installation

```bash
npm install @payloadcms/richtext-slate
```

## Usage

```ts
import { buildConfig } from 'mzinga/config'
import { slateEditor } from '@mzinga/richtext-slate'

export default buildConfig({
  editor: slateEditor({}),
  // ...rest of config
})
```

More detailed usage can be found in the [MZinga Docs](https://mzinga.io/docs/configuration/overview).
