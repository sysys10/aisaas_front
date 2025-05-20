export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
export const formatStringDate = (date: string) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}
export const getKoreaDate = (date: Date, plusDays: number = 0) => {
  const koreaDate = new Date(
    date.getTime() + 9 * 60 * 60 * 1000 + plusDays * 24 * 60 * 60 * 1000
  )
  return koreaDate
}
const timeUtils = {
  formatTime: (date: Date): string => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? '오후' : '오전'
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, '0')

    return `${period} ${displayHours}:${displayMinutes}`
  },

  getCurrentTime: (): string => {
    return timeUtils.formatTime(new Date())
  },

  calculateUtterenceDiff: (date: string): number => {
    // 입력된 날짜를 Date 객체로 변환 (이미 한국 시간으로 들어온다고 가정)
    const lastDate = new Date(date)
    lastDate.setHours(0, 0, 0, 0)

    // 현재 날짜의 자정
    const nowDate = new Date()
    nowDate.setHours(0, 0, 0, 0)

    const diffTime = nowDate.getTime() - lastDate.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  },

  formatUtteranceToDate: (date: string): string => {
    const diffDays = timeUtils.calculateUtterenceDiff(date)

    if (diffDays === 0) {
      return '오늘'
    } else if (diffDays === 1) {
      return '어제'
    } else if (diffDays < 0) {
      return '오늘'
    } else {
      return `${diffDays}일 전`
    }
  }
}
export const getKoreanWeekday = (date: Date) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  return weekdays[date.getDay()]
}

export const formatStringToDate = (date: string): string => {
  return date.split('T')[0].replace(/-/g, '. ')
}
export const formatDateKR = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일(${getKoreanWeekday(date)})`
}
export const formatKoreanDate = (date: Date): string => {
  // 한국 시간으로 오프셋 조정 (UTC+9)
  const koreanOffset = 9 * 60 * 60 * 1000 // 9시간을 밀리초로
  const koreanDate = new Date(date.getTime() + koreanOffset)

  const year = koreanDate.getUTCFullYear()
  // getUTCMonth()는 0부터 시작하므로 1을 더해줌
  const month = String(koreanDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(koreanDate.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export { timeUtils }
export const formatTime = (date: Date): string => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? '오후' : '오전'
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')

  return `${period} ${displayHours}:${displayMinutes}`
}

export const getCurrentTime = (): string => {
  return formatTime(new Date())
}
