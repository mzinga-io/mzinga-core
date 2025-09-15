import { webpackBundler } from '@mzinga/bundler-webpack'
import { mongooseAdapter } from '@mzinga/db-mongodb'
import nestedDocs from '@mzinga/plugin-nested-docs'
import { slateEditor } from '@mzinga/richtext-slate'
import { buildConfig } from 'mzinga/config'
import path from 'path'

import BeforeLogin from './BeforeLogin'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { MainMenu } from './globals/MainMenu'

export default buildConfig({
  collections: [Pages, Users],
  admin: {
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
    },
  },
  cors: ['http://localhost:3000', process.env.PAYLOAD_PUBLIC_SITE_URL],
  globals: [MainMenu],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  plugins: [
    nestedDocs({
      collections: ['pages'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: docs => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],
})
