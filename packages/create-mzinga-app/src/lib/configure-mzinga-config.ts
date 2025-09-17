import fse from 'fs-extra'
import path from 'path'

import type { DbDetails } from '../types'

import { warning } from '../utils/log'
import { bundlerPackages, dbPackages, editorPackages } from './packages'

/** Update payload config with necessary imports and adapters */
export async function configurePayloadConfig(args: {
  dbDetails: DbDetails | undefined
  projectDir: string
}): Promise<void> {
  if (!args.dbDetails) {
    return
  }

  // Update package.json
  const packageJsonPath = path.resolve(args.projectDir, 'package.json')
  try {
    const packageObj = await fse.readJson(packageJsonPath)

    packageObj.dependencies['payload'] = '^2.0.0'

    const dbPackage = dbPackages[args.dbDetails.type]
    const bundlerPackage = bundlerPackages['webpack']
    const editorPackage = editorPackages['slate']

    // Delete all other db adapters
    Object.values(dbPackages).forEach((p) => {
      if (p.packageName !== dbPackage.packageName) {
        delete packageObj.dependencies[p.packageName]
      }
    })

    packageObj.dependencies[dbPackage.packageName] = dbPackage.version
    packageObj.dependencies[bundlerPackage.packageName] = bundlerPackage.version
    packageObj.dependencies[editorPackage.packageName] = editorPackage.version

    await fse.writeJson(packageJsonPath, packageObj, { spaces: 2 })
  } catch (err: unknown) {
    warning('Unable to update name in package.json')
  }

  try {
    const possiblePaths = [
      path.resolve(args.projectDir, 'src/mzinga.config.ts'),
      path.resolve(args.projectDir, 'src/mzinga/mzinga.config.ts'),
      path.resolve(args.projectDir, 'src/payload.config.ts'),
      path.resolve(args.projectDir, 'src/payload/payload.config.ts'),
    ]

    let mzingaConfigPath: string | undefined

    possiblePaths.forEach((p) => {
      if (fse.pathExistsSync(p) && !mzingaConfigPath) {
        mzingaConfigPath = p
      }
    })

    if (!mzingaConfigPath) {
      warning('Unable to update mzinga.config.ts with plugins')
      return
    }

    const configContent = fse.readFileSync(mzingaConfigPath, 'utf-8')
    const configLines = configContent.split('\n')

    const dbReplacement = dbPackages[args.dbDetails.type]
    const bundlerReplacement = bundlerPackages['webpack']
    const editorReplacement = editorPackages['slate']

    let dbConfigStartLineIndex: number | undefined
    let dbConfigEndLineIndex: number | undefined

    configLines.forEach((l, i) => {
      if (l.includes('// database-adapter-import')) {
        configLines[i] = dbReplacement.importReplacement
      }
      if (l.includes('// bundler-import')) {
        configLines[i] = bundlerReplacement.importReplacement
      }

      if (l.includes('// bundler-config')) {
        configLines[i] = bundlerReplacement.configReplacement
      }

      if (l.includes('// editor-import')) {
        configLines[i] = editorReplacement.importReplacement
      }

      if (l.includes('// editor-config')) {
        configLines[i] = editorReplacement.configReplacement
      }

      if (l.includes('// database-adapter-config-start')) {
        dbConfigStartLineIndex = i
      }
      if (l.includes('// database-adapter-config-end')) {
        dbConfigEndLineIndex = i
      }
    })

    if (!dbConfigStartLineIndex || !dbConfigEndLineIndex) {
      warning('Unable to update mzinga.config.ts with database adapter import')
    } else {
      // Replaces lines between `// database-adapter-config-start` and `// database-adapter-config-end`
      configLines.splice(
        dbConfigStartLineIndex,
        dbConfigEndLineIndex - dbConfigStartLineIndex + 1,
        ...dbReplacement.configReplacement,
      )
    }

    fse.writeFileSync(mzingaConfigPath, configLines.join('\n'))
  } catch (err: unknown) {
    warning('Unable to update mzinga.config.ts with plugins')
  }
}
