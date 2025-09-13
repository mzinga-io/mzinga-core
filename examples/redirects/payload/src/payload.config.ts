import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import redirects from '@payloadcms/plugin-redirects'
import { slateEditor } from '@payloadcms/richtext-slate'
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
    redirects({
      collections: ['pages'],
    }),
  ],
})
