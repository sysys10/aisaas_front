import { useEffect, useState } from 'react';
import { Skeleton } from '@components/Skeleton';
import { NewsChartTable } from '@components/answers/charts/NewsChartTable';
import DayPicker from '@components/common/datePicker/DayPicker';
import MonthPicker from '@components/common/datePicker/MonthPicker';
import WeekPicker from '@components/common/datePicker/WeekPicker';
import { getMonthReportDate, getWeekReportDate, useReport } from '@hooks/useReport';

// CHECKLIST: 데이터 업데이트 시, 재랜더링 확인
const REPORT_TYPE_MAP: Record<string, [string, string]> = {
  dd: ['D', '자금일보'],
  ww: ['W', '자금주보'],
  mm: ['M', '자금월보'],
  all: ['A', '일일시재마감'],
};

const isValidReport = (v: any) => {
  if (v.data.length === 0 || typeof v.data !== 'object') return false;
  if (!v.answer.match(/^[1-9]/)) return false;
  if (v.key === 'ACCT_REC_8' || v.key === 'ACCT_REC_9') return false;
  return true;
};

export default function ReportDetail({ type }: { type: string }) {
  const { report, isReportLoading, handleGetReport } = useReport();
  const [openedReportName, setOpenedReportName] = useState('');
  const [isLoading, setIsLoading] = useState(isReportLoading);
  const [reportData, setReportData] = useState(report);
  const [userSelectedStartDate, setUserSelectedStartDate] = useState('');

  useEffect(() => {
    setReportData(report ? [...report] : []);
    setIsLoading(isReportLoading ?? true);

    if (isReportLoading !== undefined) {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, [report, isReportLoading]);

  useEffect(() => {
    const reportType = REPORT_TYPE_MAP[type];
    if (reportType) {
      setOpenedReportName(reportType[1]);
      handleGetReport(undefined, undefined, reportType[0]);
    }
  }, [type]);

  return (
    <div className="pt-4 px-2">
      <p className="text-lg font-medium">조회하실 날짜를 선택해주세요</p>
      {type === 'dd' && (
        <DayPicker
          onClose={async (startDate) => {
            await handleGetReport(startDate, undefined, 'D');
            setUserSelectedStartDate(startDate);
          }}
          openedReportName={openedReportName}
          initialDate={new Date(new Date().setDate(new Date().getDate() - 1))}
        />
      )}
      {type === 'ww' && (
        <WeekPicker
          onClose={(startDate, endDate) => handleGetReport(startDate, endDate, 'W')}
          initialDate={getWeekReportDate()[0]}
        />
      )}
      {type === 'mm' && (
        <MonthPicker
          initialDate={getMonthReportDate()[0]}
          onClose={(month) => handleGetReport(month, undefined, 'M')}
        />
      )}
      {type === 'all' && (
        <DayPicker
          onClose={(startDate) => handleGetReport(startDate, undefined, 'A')}
          openedReportName={openedReportName}
          initialDate={new Date(new Date().setDate(new Date().getHours() < 18 ? new Date().getDate() - 1 : new Date().getDate()))}
        />
      )}
      <div className="flex flex-col gap-y-2 pt-4">
        {isLoading ? (
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : reportData && reportData.map((v) => v.data).some((v) => v.length > 0) ? (
          reportData?.filter(isValidReport).map((v, i) => (
            <NewsChartTable
              data={{ ...v }}
              idx={i}
              key={`${i}-${JSON.stringify(v.data)}`}
              openedReportName={openedReportName}
            />
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
