import { useMemo } from 'react'

import { ReportData } from '@types'

import { NewsTable } from '@packages/components'

const formatHeaderTitle = (date: string, time: string, suffix: string) => `${date} ${time} ${suffix}`;

/** 헤더 타이틀 포맷 */
const getHeaderTitleByType = (
  type: string,
  date: string,
  time: string
) => (type === '평가액' ? formatHeaderTitle(date, time, '평가액') : formatHeaderTitle(date, time, '잔액'));

/** 타입에 따른 헤더 타이틀 반환 */
const getDateToMonthDay = (date: string | undefined): { month?: string; day?: string } => {
  if (!date) return {}
  const dateObj = {
    month: date.toString().slice(4, 6),
    day: date.toString().slice(6, 8),
  }
  return dateObj
}

export function NewsChartTable({
  data,
  idx,
  openedReportName
}: {
  data: ReportData
  idx: number,
  openedReportName: string
}) {

  const yesterDayColumnName = ['전일잔액', '어제평가액', '기초잔액', '어제잔액'];
  const todayColumnName = ['오늘잔액', '금일평가액', '마감잔액', '금일잔액'];

  const genHeaderName = (
  field: any,
  briefingName: string,
  start_date?: string,
  end_date?: string
): string => {
  const { month: startMonth, day: startDay } = getDateToMonthDay(start_date);
  const { month: endMonth, day: endDay } = getDateToMonthDay(end_date);
  const currentTitle = data.data_header[field]?.change_title || field;

  const isYesterdayColumn = yesterDayColumnName.includes(currentTitle);
  const isTodayColumn = todayColumnName.includes(currentTitle);

  const generateDateHeader = (date: string, time: string, dv: number) => {
    if (dv === 0) {
      return getHeaderTitleByType(currentTitle.includes('평가액') ? '평가액' : '잔액', date, time);
    } else {
      let type;
      (data.answer === '6.증권금융상품' && (currentTitle === '기초잔액' || currentTitle === '마감잔액')) ? type = '평가액' : type = '잔액';
      return formatHeaderTitle(date, time, type);
    }
  }

  const briefingHandlers: Record<string, () => string> = {
    '자금일보': () =>
      isYesterdayColumn
        ? generateDateHeader(`${startMonth}월 ${startDay}일`, '00시', 0)
        : isTodayColumn
          ? generateDateHeader(`${endMonth}월 ${endDay}일`, '24시', 0)
          : currentTitle,
    '자금주보': () => briefingHandlers['자금일보'](),
    '자금월보': () => briefingHandlers['자금일보'](),
    '일일시재마감': () => {
      return isYesterdayColumn
        ? generateDateHeader(`${startMonth}월 ${startDay}일`, '00시', 1)
        : isTodayColumn
          ? generateDateHeader(`${endMonth}월 ${endDay}일`, '16시', 1)
          : currentTitle
    },
  };

  return briefingHandlers[briefingName]?.() || currentTitle;
};

  const columns = useMemo(() => {
    if (!data.data_header || !data.data?.[0]) return []
    const availableKeys = Object.keys(data.data?.[0])
    const result = availableKeys.map((field: any) => {
      return {
        id: field,
        header: genHeaderName(field, openedReportName, data?.start_date, data?.end_date),
        accessorKey: field,
        meta: {
          briefingName: openedReportName,
          start_date: data?.start_date,
          end_date: data?.end_date,
          align: data.data_header[field]?.align,
          type: data.data_header[field]?.type,
          width: data.data_header[field]?.width,
        }
      }
    })

    return result;
  }, [data, openedReportName])

  return (
    <div className='my-8'>
      {data.data.length > 0 && (
        <div className='text-primary mb-2 text-lg'>
          {idx + 1}. {data.answer.split('.')[1] || ''}
        </div>
      )}
      <NewsTable key={`${data.start_date}-${data.end_date}`} data={data.data} columns={columns as any} />
    </div>
  )
}
