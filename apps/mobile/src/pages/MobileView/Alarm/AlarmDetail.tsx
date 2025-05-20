import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { AlarmResponse } from '@components/Alarm/AlarmResponse'
import CustomIcons from '@components/common/CustomIcons'

import { useGetVocDetail } from '@hooks/useGetVocDetail'

export default function AlarmDetail() {
  const navigate = useNavigate()
  const { type, seq } = useParams()
  const { getVoc, vocDetail } = useGetVocDetail()
  useEffect(() => {
    getVoc({ vocId: Number(seq) })
  }, [])
  return (
    <>
      <div className='h-topbar-height w-full fixed top-0 left-0 z-50 bg-white flex items-center px-6'>
        <CustomIcons
          name='back'
          className='w-5 h-5'
          onClick={() => {
            navigate('/alarm/alarm')
          }}
        />
        <div className='absolute left-1/2 -translate-x-1/2 w-[13.75rem] h-10 font-bold text-sm'>
          <div className='w-full h-full bg-gray-100 rounded-full grid grid-cols-3'>
            <Link
              to='/alarm/alarm'
              className={`${
                type === 'alarm'
                  ? 'bg-aicfo text-white rounded-full'
                  : 'text-gray-500'
              }  flex items-center justify-center`}
            >
              알림
            </Link>
            <Link
              to='/alarm/fds'
              className={`${
                type === 'fds'
                  ? 'bg-aicfo text-white rounded-full'
                  : 'text-gray-500'
              }  flex items-center justify-center`}
            >
              이상거래
            </Link>
            <Link
              to='/alarm/report'
              className={`${
                type === 'report'
                  ? 'bg-aicfo text-white rounded-full'
                  : 'text-gray-500'
              }  flex items-center justify-center`}
            >
              보고서
            </Link>
          </div>
        </div>
      </div>
      {vocDetail && <AlarmResponse vocDetail={vocDetail} />}
    </>
  )
}
