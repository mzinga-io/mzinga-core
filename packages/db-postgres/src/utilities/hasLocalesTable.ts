import type { Field } from 'mzinga/types'

import { fieldAffectsData, fieldHasSubFields } from 'mzinga/types'

export const hasLocalesTable = (fields: Field[]): boolean => {
  return fields.some((field) => {
    // arrays always get a separate table
    if (field.type === 'array') return false
    if (fieldAffectsData(field) && field.localized) return true
    if (fieldHasSubFields(field)) return hasLocalesTable(field.fields)
    if (field.type === 'tabs') return field.tabs.some((tab) => hasLocalesTable(tab.fields))
    return false
  })
}
