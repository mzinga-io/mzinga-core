import type { BundlerType, DbType, EditorType } from '../types'

type DbAdapterReplacement = {
  configReplacement: string[]
  importReplacement: string
  packageName: string
  version: string
}

type BundlerReplacement = {
  configReplacement: string
  importReplacement: string
  packageName: string
  version: string
}

type EditorReplacement = {
  configReplacement: string
  importReplacement: string
  packageName: string
  version: string
}

const mongodbReplacement: DbAdapterReplacement = {
  importReplacement: "import { mongooseAdapter } from '@mzinga/db-mongodb'",
  packageName: '@mzinga/db-mongodb',
  // Replacement between `// database-adapter-config-start` and `// database-adapter-config-end`
  configReplacement: ['  db: mongooseAdapter({', '    url: process.env.DATABASE_URI,', '  }),'],
  version: '^1.0.0',
}

const postgresReplacement: DbAdapterReplacement = {
  configReplacement: [
    '  db: postgresAdapter({',
    '    pool: {',
    '      connectionString: process.env.DATABASE_URI,',
    '    },',
    '  }),',
  ],
  importReplacement: "import { postgresAdapter } from '@mzinga/db-postgres'",
  packageName: '@mzinga/db-postgres',
  version: '^0.x', // up to, not including 1.0.0
}

export const dbPackages: Record<DbType, DbAdapterReplacement> = {
  mongodb: mongodbReplacement,
  postgres: postgresReplacement,
}

const webpackReplacement: BundlerReplacement = {
  importReplacement: "import { webpackBundler } from '@mzinga/bundler-webpack'",
  packageName: '@mzinga/bundler-webpack',
  // Replacement of line containing `// bundler-config`
  configReplacement: '    bundler: webpackBundler(),',
  version: '^1.0.0',
}

const viteReplacement: BundlerReplacement = {
  configReplacement: '  bundler: viteBundler(),',
  importReplacement: "import { viteBundler } from '@mzinga/bundler-vite'",
  packageName: '@mzinga/bundler-vite',
  version: '^0.x', // up to, not including 1.0.0
}

export const bundlerPackages: Record<BundlerType, BundlerReplacement> = {
  vite: viteReplacement,
  webpack: webpackReplacement,
}

export const editorPackages: Record<EditorType, EditorReplacement> = {
  lexical: {
    configReplacement: '  editor: lexicalEditor({}),',
    importReplacement: "import { lexicalEditor } from '@mzinga/richtext-lexical'",
    packageName: '@mzinga/richtext-lexical',
    version: '^0.x', // up to, not including 1.0.0
  },
  slate: {
    configReplacement: '  editor: slateEditor({}),',
    importReplacement: "import { slateEditor } from '@mzinga/richtext-slate'",
    packageName: '@mzinga/richtext-slate',
    version: '^1.0.0',
  },
}
