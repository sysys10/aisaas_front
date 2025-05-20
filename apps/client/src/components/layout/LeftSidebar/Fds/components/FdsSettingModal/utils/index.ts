export const formatAmount = (amount: number | string): string => {
  const amountStr = amount.toString()

  const isNegative = amountStr.startsWith('-')
  const absAmountStr = isNegative ? amountStr.substring(1) : amountStr

  if (absAmountStr === '0') {
    return '0'
  }
  const units = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간']
  const result: string[] = []

  const paddedLength = Math.ceil(absAmountStr.length / 4) * 4
  const paddedStr = absAmountStr.padStart(paddedLength, '0')

  for (let i = 0; i < paddedStr.length; i += 4) {
    const chunk = parseInt(paddedStr.substring(i, i + 4), 10)
    const unitIndex = (paddedStr.length - i) / 4 - 1

    if (chunk > 0) {
      result.push(chunk + (unitIndex > 0 ? units[unitIndex] : ''))
    }
  }

  if (result.length === 0) {
    result.push('0')
  }

  const formattedAmount = (isNegative ? '-' : '') + result.join(' ')
  return formattedAmount
}


function getHour(defaultTimeVal: string) {
  return parseInt(defaultTimeVal.slice(0, 2), 10);
}

function getMinute(defaultTimeVal: string) {
  return parseInt(defaultTimeVal.slice(2, 4), 10);
}

function formatTimeToHHMMSS(timeObject: { hour: number; minute: number }) {
  const hour = timeObject.hour.toString().padStart(2, '0');
  const minute = timeObject.minute.toString().padStart(2, '0');
  return `${hour}${minute}00`;
}
export { getHour, getMinute, formatTimeToHHMMSS }