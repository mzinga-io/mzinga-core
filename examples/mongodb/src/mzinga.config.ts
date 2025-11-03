import { webpackBundler } from '@mzinga/bundler-webpack'
import { mongooseAdapter } from '@mzinga/db-mongodb'
import { slateEditor } from '@mzinga/richtext-slate'
import { buildConfig } from 'mzinga/config'
import path from 'path'
import Users from './collections/Users'
const MONGODB_URI = process.env.MONGODB_URI || ''

const buildConfigAsync = async () => {
  return buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    admin: {
      bundler: webpackBundler(),
      user: 'users',
      indexHTML: path.resolve(__dirname, './index.html'),
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
      url: MONGODB_URI,
    }),
    collections: [Users],
  })
}
export default buildConfigAsync()
