export const calculateChange = (current: number, previous: number) => {
  const change = current - previous
  const percentage = (change / previous) * 100
  return percentage
}
export const calculateWeightedAverage = (
  items: Array<{ value: number; weight: number }>
): number => {
  const sum = items.reduce((acc, item) => acc + item.value * item.weight, 0)
  const weightSum = items.reduce((acc, item) => acc + item.weight, 0)
  return sum / weightSum
}

export function FormatColumnToKR(str: string) {
  return str
}
/**
 * 금액 포맷팅
 * @param amount 금액 숫자
 * @returns 포맷팅된 금액, isPositive +, -
 */
export const formatAmount = (amount: number) => {
  const isPositive = amount > 0
  return {
    value: Math.abs(amount).toLocaleString(),
    isPositive
  }
}
