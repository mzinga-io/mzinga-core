import path from 'path'

import { webpackBundler } from '@mzinga/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@mzinga/db-mongodb' // database-adapter-import
import { payloadCloud } from '@mzinga/plugin-cloud'
import { slateEditor } from '@mzinga/richtext-slate' // editor-import
import { buildConfig } from 'mzinga/config'

import Users from './collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(), // bundler-config
  },
  editor: slateEditor({}), // editor-config
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
})
