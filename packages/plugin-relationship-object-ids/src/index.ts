import type { Config } from 'mzinga/config'
import type { Field } from 'mzinga/types'

import { getBeforeChangeHook } from './hooks/beforeChange'
import { extendWebpackConfig } from './webpack'

const traverseFields = ({ config, fields }: { config: Config; fields: Field[] }): Field[] => {
  return fields.map((field) => {
    if (field.type === 'relationship' || field.type === 'upload') {
      return {
        ...field,
        hooks: {
          ...(field.hooks || {}),
          beforeChange: [
            ...(field.hooks?.beforeChange || []),
            getBeforeChangeHook({ config, field }),
          ],
        },
      }
    }

    if ('fields' in field) {
      return {
        ...field,
        fields: traverseFields({ config, fields: field.fields }),
      }
    }

    if (field.type === 'tabs') {
      return {
        ...field,
        tabs: field.tabs.map((tab) => {
          return {
            ...tab,
            fields: traverseFields({ config, fields: tab.fields }),
          }
        }),
      }
    }

    if (field.type === 'blocks') {
      return {
        ...field,
        blocks: field.blocks.map((block) => {
          return {
            ...block,
            fields: traverseFields({ config, fields: block.fields }),
          }
        }),
      }
    }

    return field
  })
}

export const relationshipsAsObjectID = (/** Possible args in the future */) =>
  (config: Config): Config => {
    const webpack = extendWebpackConfig(config)

    return {
      ...config,
      admin: {
        ...(config.admin || {}),
        webpack,
      },
      collections: (config.collections || []).map((collection) => {
        return {
          ...collection,
          fields: traverseFields({
            config,
            fields: collection.fields,
          }),
        }
      }),
      globals: (config.globals || []).map((global) => {
        return {
          ...global,
          fields: traverseFields({
            config,
            fields: global.fields,
          }),
        }
      }),
    }
  }
