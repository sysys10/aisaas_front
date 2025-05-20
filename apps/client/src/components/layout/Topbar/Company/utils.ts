export const getFreeDDay = (freeDDay: number) => {
  const now = new Date()
  const freeDDayDate = new Date(now.getFullYear(), now.getMonth(), freeDDay)
  return freeDDayDate.getTime() - now.getTime()
}
