export interface CustomInputProps {
  value?: any
  onClick?: () => void
}

export interface RenderHeaderProps {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

export interface DatePickerBaseProps {
  onClose: (date: string) => void
  initialDate: Date
  openedReportName?: string
  menuClickTrigger?: boolean
}
