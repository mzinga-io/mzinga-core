# Payload Lexical Rich Text Editor

Lexical Rich Text Editor for [Payload](https://mzinga.io).

- [Main Repository](https://github.com/mzinga-io/mzinga-core)
- [MZinga Docs](https://mzinga.io/docs)

## Installation

```bash
npm install @payloadcms/richtext-lexical
```

## Usage

```ts
import { buildConfig } from 'mzinga/config'
import { lexicalEditor } from '@mzinga/richtext-lexical'

export default buildConfig({
  editor: lexicalEditor({}),
  // ...rest of config
})
```

More detailed usage can be found in the [MZinga Docs](https://mzinga.io/docs/configuration/overview).
