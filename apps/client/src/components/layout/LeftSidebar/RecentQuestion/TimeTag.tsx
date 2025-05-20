import { timeUtils } from '@utils'

const TimeTag = ({ prev, current }: { prev: string; current: string }) => {
  // 이전 항목이 없는 경우 (첫 번째 항목)
  if (!prev) {
    return (
      <div className='pl-7 pr-4 pt-3 pb-[0.4375rem] font-bold'>
        {timeUtils.formatUtteranceToDate(current)}
      </div>
    )
  }

  // 이전 항목과 현재 항목의 날짜를 00:00:00 기준으로 비교
  const prevDate = new Date(prev)
  const currentDate = new Date(current)

  prevDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  // 날짜가 다른 경우에만 TimeTag를 표시
  if (prevDate.getTime() !== currentDate.getTime()) {
    return (
      <div className='px-4 pt-3 pb-[0.4375rem] font-bold'>
        {timeUtils.formatUtteranceToDate(current)}
      </div>
    )
  }

  return null
}
export default TimeTag
