import type { Props as DateType } from '../../../DatePicker/types'
export type Props = {
  admin?: {
    date?: DateType
  }
  disabled?: boolean
  onChange: () => void
  value: Date
}
