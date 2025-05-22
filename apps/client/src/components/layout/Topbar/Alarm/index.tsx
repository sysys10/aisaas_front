import { useUserStore } from '@stores'
import { useEffect, useMemo, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { useAlarm, useAlarmCnt } from '@hooks/useAlarm'

import { AlarmModal } from './AlarmModal'

export default function Alarm() {
  const { alarmCnt, getAlarmCnt } = useAlarmCnt()
  const { alarms, handleGetAlarm, handleSetAlarmRead, isLoading } =
    useAlarm(getAlarmCnt)

  // useEffect(() => {
  //   getAlarmCnt()
  // }, [])
  const isBlocked = useUserStore((s) => s.isBlocked)

  const handleAlarmClick = () => {
    if (isBlocked) {
      return
    }
    setIsOpen(!isOpen)
    handleGetAlarm()
  }
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AlarmModal
        isLoading={isLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        alarms={alarms}
        handleSetAlarmRead={handleSetAlarmRead}
      />
      <button onClick={handleAlarmClick} className='relative outline-none'>
        <CustomIcons
          row={true}
          iconClassName='cursor-pointer w-6 h-6'
          name='bell'
          description='알람'
          badge={alarmCnt > 0}
          className='text-sm text-secondary'
        />
      </button>
    </>
  )
}
