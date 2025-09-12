import type { SerializedEditorState } from 'lexical'
import type { FieldPermissions } from 'mzinga/auth'
import type { FieldTypes } from 'mzinga/config'
import type { RichTextFieldProps } from 'mzinga/types'

import type { SanitizedEditorConfig } from './field/lexical/config/types'

export type FieldProps = {
  fieldTypes: FieldTypes
  indexPath: string
  path?: string
  permissions: FieldPermissions
} & RichTextFieldProps<SerializedEditorState, AdapterProps, AdapterProps>

export type AdapterProps = {
  editorConfig: SanitizedEditorConfig
}
