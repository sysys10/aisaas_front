import { REPORT_LIST } from '@constants/report.constant'
import { useState, useReducer } from 'react'

import { useReport } from '@hooks/useReport'

import { ReportHeader } from './ReportHeader'
import { ReportItem } from './ReportItem'
import ReportModal from './ReportModal'

export default function ReportList() {
  const { report, isReportLoading, handleGetReport, handleResetReport } =
    useReport()
  
  const [openedReportName, setOpenedReportName] = useState('')
  // 사용자 메뉴 클릭 시, 일자 초기화용
  const [menuClickTrigger, toggleMenuClickTrigger] = useReducer((state) => !state, false)
  
  // 보고서별 클릭 핸들러
  const handleToggleNews = async (reportType: string) => {
    setOpenedReportName(reportType)

    const reportTypeRec: Record<string, string> = {
      자금일보: 'D',
      자금주보: 'W',
      자금월보: 'M',
      일일시재마감: 'A',
    }
    const reportTypeCD = reportTypeRec[reportType]
    toggleMenuClickTrigger()
    // 보고서 타입에 따라 보고서 조회
    reportTypeCD && handleGetReport(undefined, undefined, reportTypeCD)
  }

  const handleCloseModal = () => {
    setOpenedReportName('')
    handleResetReport() // report 초기화
  }

  return (
    <>
      <ReportHeader />
      <div className='flex flex-col gap-1 p-2 w-full'>
        <ReportModal 
          handleCloseModal={handleCloseModal}
          openedReportName={openedReportName}
          menuClickTrigger={menuClickTrigger}
          report={report}
          handleGetReport={handleGetReport}
          isReportLoading={isReportLoading}
        />
        {REPORT_LIST.map((reportItem, index) => (
          <ReportItem
            key={index}
            item={reportItem}
            isActive={openedReportName === reportItem.title}
            onSelect={handleToggleNews}
          />
        ))}
      </div>
    </>
  )
}
