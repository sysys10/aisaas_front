import { ErrorType } from '@types'

const ERROR_TYPES: ErrorType[] = ['AM', 'UT', 'ET', 'ER']

const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  AM: '금액 오류',
  UT: '발화 오류',
  ET: '기타 오류',
  ER: '디폴트 오류'
}

export { ERROR_TYPES, ERROR_TYPE_LABELS }
