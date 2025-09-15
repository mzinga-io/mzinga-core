import { webpackBundler } from '@mzinga/bundler-webpack'
import { mongooseAdapter } from '@mzinga/db-mongodb'
import { slateEditor } from '@mzinga/richtext-slate'
import { buildConfig } from 'mzinga/config'
import path from 'path'

import { Users } from './collections/Users'
import BeforeLogin from './components/BeforeLogin'

export default buildConfig({
  collections: [Users],
  admin: {
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
