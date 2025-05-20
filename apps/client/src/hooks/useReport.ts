import { useState } from 'react'

import { ReportData } from '@types'

import { useReportMutation } from './query/useReportMutation'

export const useReport = () => {
  const [report, setReport] = useState<ReportData[]>()
  const { mutate: getReport, isPending: isReportLoading } = useReportMutation({
    setReport
  })

  // date를 한국 시간으로 설정하고 YYYY-MM-DD 형식으로 변환
  const convertUTCToLocal = (date: Date | string): string => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    const localDate = new Date(date.getTime()).toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
    })
    const [year, month, day] = localDate.split('.').map(ele => ele.trim())
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  const handleResetReport = () => {
    setReport(undefined)
  }

  // 자금일보 조회
  const handleGetDayReport = (startDate?: string) => {
    const selectedDate = startDate || convertUTCToLocal(new Date(new Date().setDate(new Date().getDate() - 1)))

    getReport({
      startDate: selectedDate,
      endDate: selectedDate,
      option: 'D'
    })
  }
  
  // 자금주보 조회
  const handleGetWeekReport = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) {
      const [lastMonday, thisSunday] = getWeekReportDate()
      startDate = convertUTCToLocal(lastMonday)
      endDate = convertUTCToLocal(thisSunday)
    }
    getReport({ startDate, endDate, option: 'W' })
  }

  // 자금월보 조회
  const handleGetMonthReport = (date?: string) => {
    let startDate: string
    let endDate: string
    if (!date) {
      const [lastMonth, lastMonthEnd] = getMonthReportDate()
      startDate = convertUTCToLocal(lastMonth)
      endDate = convertUTCToLocal(lastMonthEnd)
    } else {
      const month = new Date(date)
      startDate = new Date(month.getFullYear(), month.getMonth(), 2)
        .toISOString()
        .split('T')[0]
      endDate = new Date(month.getFullYear(), month.getMonth() + 1)
        .toISOString()
        .split('T')[0]
    }
    getReport({
      startDate,
      endDate,
      option: 'M'
    })
  }
  
  // 일일시재마감 조회
  const handleGetAllReport = (date?: string) => {
    const currentDate = new Date(new Date().setDate(new Date().getHours() < 18 ? new Date().getDate() - 1 : new Date().getDate()))
    getReport({
      startDate:
        date ||
        convertUTCToLocal(currentDate),
      endDate:
        date ||
        convertUTCToLocal(currentDate),
      option: 'A'
    })
  }

  // 보고서 타입별 조회
  const handleGetReport = (date?: string, endDate?: string, type?: string) => {
    if (type === 'D') {
      handleGetDayReport(date)
    } else if (type === 'W') {
      handleGetWeekReport(date, endDate)
    } else if (type === 'M') {
      handleGetMonthReport(date)
    } else if (type === 'A') {
      handleGetAllReport(date)
    }
  }
  return {
    report,
    setReport,
    isReportLoading,
    handleResetReport,
    handleGetReport
  }
}

export function getWeekReportDate() {
  const today = new Date()
  const lastMonday = new Date(today)
  lastMonday.setDate(today.getDate() - today.getDay() - 6)
  const thisSunday = new Date(today)
  thisSunday.setDate(today.getDate() - today.getDay())

  return [lastMonday, thisSunday]
}

export function getMonthReportDate() {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)

  return [lastMonth, lastMonthEnd]
}
