import { webpackBundler } from '@mzinga/bundler-webpack'
import { mongooseAdapter } from '@mzinga/db-mongodb'
import { slateEditor } from '@mzinga/richtext-slate'
import dotenv from 'dotenv'
import { buildConfig } from 'mzinga/config'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGO_URL,
  }),
  editor: slateEditor({}),
  admin: {
    bundler: webpackBundler(),
  },
  collections: [
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
  ],
})
