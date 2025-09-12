import { type Field, type Fields } from 'mzinga/types'

export interface Props {
  drawerSlug: string
  fieldSchema: Field[]
  handleModalSubmit: (fields: Fields, data: Record<string, unknown>) => void
  initialState?: Fields
}
