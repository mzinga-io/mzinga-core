import type { Field } from 'mzinga/types'

export const idToUUID = (fields: Field[]): Field[] =>
  fields.map((field) => {
    if ('name' in field && field.name === 'id') {
      return {
        ...field,
        name: '_uuid',
      }
    }

    return field
  })
