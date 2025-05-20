import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ReportDetail from '@components/Alarm/Report/ReportDetail'
import CustomIcons from '@components/common/CustomIcons'

export default function ReportView() {
  const { type } = useParams()
  const navigate = useNavigate()
  return useMemo(() => {
    return (
      <>
        <div className='h-topbar-height w-full fixed top-0 left-0 z-50 bg-white flex items-center px-6'>
          <CustomIcons
            name='back'
            className='w-5 h-5 outline-none'
            onClick={() => navigate('/alarm/report')}
          />

          <div className='absolute left-1/2 -translate-x-1/2 w-[13.75rem] h-10 font-bold text-lg flex items-center justify-center'>
            {type === 'dd'
              ? '자금일보'
              : type === 'ww'
                ? '자금주보'
                : type === 'mm'
                  ? '자금월보'
                  : '일일시재마감'}
          </div>
        </div>
        <div className='h-[calc(100vh-var(--topbar-height))] mt-[var(--topbar-height)] overflow-y-auto'>
          <ReportDetail type={type!} />
        </div>
      </>
    )
  }, [type])
}
