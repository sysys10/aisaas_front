import ALL from '@assets/icons/ALL.png'
import DD from '@assets/icons/DD.png'
import MM from '@assets/icons/MM.png'
import WW from '@assets/icons/WW.png'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AlarmItem } from '@components/Alarm/AlarmItem'
import { FdsLists } from '@components/Fds/FdsLists'
import CustomIcons from '@components/common/CustomIcons'

import { useAlarm } from '@hooks/useAlarm'

import useDeviceStore from '@stores/useDevice'

import { AlarmType } from '@types'

import handleMobileActions from '@utils/nativeActionHandler'
import { useCertCntStore } from '@stores/useCertCnt'

export default function AlarmView() {
  const { type } = useParams()
  const device = useDeviceStore((s) => s.device)

  return (
    <>
      <div className='h-topbar-height w-full fixed top-0 left-0 z-50 bg-white flex items-center px-6'>
        <CustomIcons
          name='back'
          className='w-5 h-5'
          onClick={() => {
            handleMobileActions(device, 'godismiss')
          }}
        />
        <div className='absolute left-1/2 -translate-x-1/2 w-[13.75rem] h-10 font-bold text-sm'>
          <div className='w-full h-full bg-gray-100 rounded-full grid grid-cols-3'>
            <Link
              to='/alarm/alarm'
              className={`${type === 'alarm' ? 'bg-aicfo text-white rounded-full' : 'text-gray-500'}  flex items-center justify-center`}
            >
              알림
            </Link>
            <Link
              to='/alarm/fds'
              className={`${type === 'fds' ? 'bg-aicfo text-white rounded-full' : 'text-gray-500'}  flex items-center justify-center`}
            >
              이상거래
            </Link>
            <Link
              to='/alarm/report'
              className={`${type === 'report' ? 'bg-aicfo text-white rounded-full' : 'text-gray-500'}  flex items-center justify-center`}
            >
              보고서
            </Link>
          </div>
        </div>
      </div>
      <div className='h-full pt-[var(--topbar-height)]'>
        {type === 'alarm' && <Alarms />}
        {type === 'fds' && <Fds />}
        {type === 'report' && <Report />}
      </div>
    </>
  )
}
export function Fds() {
  const device = useDeviceStore((s) => s.device)
  const { certCnt, setCertCnt } = useCertCntStore()

  window.handleGetCertCnt = (count: string) => {
    console.log('current handleGetCertCnt count:', count)
    setCertCnt(count)
  }

  return (
    <div className='mt-topbar-height pt-8 flex flex-col h-full'>
      <div className='pl-6 pr-4 flex items-center justify-between mb-2'>
        <h1 className='text-lg font-bold'>이상거래 내역</h1>
        <div
          className='flex items-center gap-x-2 text-gray-400'
          onClick={() => {
            console.log('certCnt:', certCnt)
            Number(certCnt) > 0 ? 
              handleMobileActions(device, 'gofds')
              : alert('인증서 등록 후 이용해 주세요.')
          }}
        >
          <p>설정</p>
          <CustomIcons name='setting' />
        </div>
      </div>
      <div className='w-full flex-1 flex flex-col'>
        <FdsLists getFdsAlarmCnt={() => {}} />
      </div>
    </div>
  )
}
export function Report() {
  const navigate = useNavigate()
  function handleReportClick(type: string) {
    navigate(`/alarm/report/${type}`)
  }
  return (
    <div className='mt-topbar-height px-6 pt-6 space-y-2 h-full w-full bg-[#F5F5F5]'>
      <div
        onClick={() => handleReportClick('dd')}
        className='bg-white relative w-full rounded-2xl h-[7rem] flex items-center p-[1.25rem]'
      >
        <div
          className='bg-gray-100 h-full aspect-square rounded-3xl bg-cover bg-center'
          style={{ backgroundImage: `url(${DD})` }}
        ></div>
        <div className='flex-1 px-2'>
          <p className='text-base font-semibold'>자금일보</p>
          <p className='text-sm text-gray-500'>전일 자금 일보</p>
        </div>
        <div className='absolute right-4 top-1/2 -translate-y-1/2'>{'>'}</div>
      </div>
      <div
        onClick={() => handleReportClick('ww')}
        className='bg-white relative w-full rounded-2xl h-[7rem] flex items-center p-[1.25rem]'
      >
        <div
          className='bg-gray-100 h-full aspect-square rounded-3xl bg-cover bg-center'
          style={{ backgroundImage: `url(${WW})` }}
        ></div>
        <div className='flex-1 px-2'>
          <p className='text-base font-semibold'>자금주보</p>
          <p className='text-sm text-gray-500'>전주 월~일요일 자금 주보</p>
        </div>
        <div className='absolute right-4 top-1/2 -translate-y-1/2'>{'>'}</div>
      </div>
      <div
        onClick={() => handleReportClick('mm')}
        className='bg-white relative w-full rounded-2xl h-[7rem] flex items-center p-[1.25rem]'
      >
        <div
          className='bg-gray-100 h-full aspect-square rounded-3xl bg-cover bg-center'
          style={{ backgroundImage: `url(${MM})` }}
        ></div>
        <div className='flex-1 px-2'>
          <p className='text-base font-semibold'>자금월보</p>
          <p className='text-sm text-gray-500'>전달 1일~말일 자금 월보</p>
        </div>
        <div className='absolute right-4 top-1/2 -translate-y-1/2'>{'>'}</div>
      </div>
      <div
        onClick={() => handleReportClick('all')}
        className='bg-white relative w-full rounded-2xl h-[7rem] flex items-center p-[1.25rem]'
      >
        <div
          className='bg-gray-100 h-full aspect-square rounded-3xl bg-cover bg-center'
          style={{ backgroundImage: `url(${ALL})` }}
        ></div>
        <div className='flex-1 px-2'>
          <p className='text-base font-semibold'>일일시재마감</p>
          <p className='text-sm text-gray-500'>일일 시재 마감</p>
        </div>
        <div className='absolute right-4 top-1/2 -translate-y-1/2'>{'>'}</div>
      </div>
    </div>
  )
}

export function Alarms() {
  const { handleSetAlarmRead, alarms, isLoading, handleGetAlarm } = useAlarm()
  const handleAllAlarmRead = () => {
    handleSetAlarmRead()
  }
  useEffect(() => {
    handleGetAlarm()
  }, [])
  const navigate = useNavigate()

  const handleAlarmItemClick = (alarm: AlarmType) => {
    handleSetAlarmRead(alarm.pushNotificationHistorySeq)
    if (alarm.type === 'P0004') {
      navigate(`/alarm/alarm/${alarm.vocSeq}`)
    }
  }

  return (
    <>
      <div className='flex justify-between w-full px-6 pt-10 pb-2'>
        <h2 className='text-lg font-semibold'>알림 내역</h2>
        <button onClick={handleAllAlarmRead} className='text-aicfo text-sm'>
          모두 읽음 상태로 표시
        </button>
      </div>
      <div className='flex flex-col overflow-y-auto'>
        {isLoading ? (
          <div className='flex flex-col gap-y-3 px-6 py-5'>
            {/* <Skeleton className='h-20' />
            <Skeleton className='h-20' />
            <Skeleton className='h-20 rounded-sm' /> */}
          </div>
        ) : alarms.length > 0 ? (
          alarms?.map((v, i) => (
            <AlarmItem
              key={i}
              v={v}
              onClick={() => {
                handleAlarmItemClick(v)
              }}
            />
          ))
        ) : (
          <div className='text-center mt-10'>알림이 없습니다.</div>
        )}
      </div>
    </>
  )
}
