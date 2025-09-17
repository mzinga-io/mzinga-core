import type { ContextType } from 'mzinga/dist/admin/components/utilities/DocumentInfo/types'
import type { Field, TextField, TextareaField, UploadField } from 'mzinga/dist/fields/config/types'

export type GenerateTitle = <T = any>(
  args: { doc: T; locale?: string } & ContextType,
) => Promise<string> | string

export type GenerateDescription = <T = any>(
  args: {
    doc: T
    locale?: string
  } & ContextType,
) => Promise<string> | string

export type GenerateImage = <T = any>(
  args: { doc: T; locale?: string } & ContextType,
) => Promise<string> | string

export type GenerateURL = <T = any>(
  args: { doc: T; locale?: string } & ContextType,
) => Promise<string> | string

export interface PluginConfig {
  collections?: string[]
  fieldOverrides?: {
    description?: Partial<TextareaField>
    image?: Partial<UploadField>
    title?: Partial<TextField>
  }
  fields?: Field[]
  generateDescription?: GenerateDescription
  generateImage?: GenerateImage
  generateTitle?: GenerateTitle
  generateURL?: GenerateURL
  globals?: string[]
  interfaceName?: string
  tabbedUI?: boolean
  uploadsCollection?: string
}

export interface Meta {
  description?: string
  image?: any // TODO: type this
  keywords?: string
  title?: string
}
