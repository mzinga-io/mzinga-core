import type { CollectionConfig } from 'mzinga/types'

export interface PluginConfig {
  collections?: string[]
  overrides?: Partial<CollectionConfig>
}
