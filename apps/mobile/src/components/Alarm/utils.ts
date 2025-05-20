export const formatStringToDate = (date: string): string => {
  if (!date) return ''
  return date.split('T')[0].replace(/-/g, '. ')
}
