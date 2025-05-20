import React, { useEffect, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'
import { ModalPortal } from '@components/ui'
import { Skeleton } from '@components/ui/skeleton/Skeleton'

import AmountSetting from './AmountSetting'
import { MIN_AMOUNT } from './constants'
import ToggleSwitch from '../ToggleSwitch'
import TimeSetting from './TimeSetting'
import { FdsSettingProps, FdsTimeProps } from '@apis/fdsSettingApi'

interface FinancialSettingsModalProps {
  isOpen: boolean 
  setIsOpen: (isOpen: boolean) => void
  fdsAmount: FdsSettingProps
  fdsTime: FdsTimeProps
  isPending: boolean 
  saveFdsSetting: (data: {
    useYn: boolean,   amount: string
    inOutDv: '1' | '2'
  }) => void
  saveFdsTime: (data: {
    timeUseYn: boolean 
    timeStart: string 
    timeEnd: string 
  }) => void
  isSaving: boolean 
}

/**
 * 이상거래 설정 모달 컴포넌트
 * - 입출금 알림 설정 및 금액, 지정시간외 거래 설정을 관리
 * @param {FinancialSettingsModalProps} props
 * @returns {JSX.Element} - 금액 설정 모달 UI
 */

const FinancialSettingsModal = ({ // TODO: state 너무 많아서 정리 필요
  isOpen,
  setIsOpen,
  fdsAmount,
  fdsTime= {
    timeUseYn: 'Y',
    timeStart: '080000',
    timeEnd: '180000'
  },
  isPending,
  saveFdsSetting,
  saveFdsTime,
  isSaving
}: FinancialSettingsModalProps): JSX.Element => {
  // 입출금, 지정시간 외 출금 토글 활성화 상태
  const [withdrawalAlertEnabled, setWithdrawalAlertEnabled] = useState(fdsAmount.outYn)
  const [depositAlertEnabled, setDepositAlertEnabled] = useState(fdsAmount.inYn)
  const [timeAlertEnabled, setTimeAlertEnabled] = useState(fdsTime.timeUseYn === 'Y')

  const [withdrawalThreshold, setWithdrawalThreshold] = useState(
    Math.max(fdsAmount.outAmount, MIN_AMOUNT)
  )
  const [depositThreshold, setDepositThreshold] = useState(
    Math.max(fdsAmount.inAmount, MIN_AMOUNT)
  )

  const [originalWithdrawalThreshold, setOriginalWithdrawalThreshold] =
    useState(Math.max(fdsAmount.outAmount, MIN_AMOUNT))
  const [originalDepositThreshold, setOriginalDepositThreshold] = useState(
    Math.max(fdsAmount.inAmount, MIN_AMOUNT)
  )

  const fdsTimeStart = fdsTime.timeStart;
  const fdsTimeEnd = fdsTime.timeEnd;
  
  // 시간 설정 state
  const [startTimeValue, setStartTimeValue] = useState<string>(fdsTimeStart)
  const [endTimeValue, setEndTimeValue] = useState<string>(fdsTimeEnd)
  const [originalStartTimeValue, setOriginalStartTimeValue] = useState<string>(fdsTimeStart)
  const [originalEndTimeValue, setOriginalEndTimeValue] = useState<string>(fdsTimeEnd)

  const [isEditingWithdrawal, setIsEditingWithdrawal] = useState(false)
  const [isEditingDeposit, setIsEditingDeposit] = useState(false)
  const [isEditingTime, setIsEditingTime] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setWithdrawalAlertEnabled(fdsAmount.outYn)
      setDepositAlertEnabled(fdsAmount.inYn)
      setTimeAlertEnabled(fdsTime.timeUseYn === 'Y')

      setWithdrawalThreshold(Math.max(fdsAmount.outAmount, MIN_AMOUNT))
      setDepositThreshold(Math.max(fdsAmount.inAmount, MIN_AMOUNT))
      setOriginalWithdrawalThreshold(Math.max(fdsAmount.outAmount, MIN_AMOUNT))
      setOriginalDepositThreshold(Math.max(fdsAmount.inAmount, MIN_AMOUNT))
      setStartTimeValue(fdsTimeStart)
      setEndTimeValue(fdsTimeEnd)
      setOriginalStartTimeValue(fdsTimeStart)
      setOriginalEndTimeValue(fdsTimeEnd)
      setIsEditingWithdrawal(false)
      setIsEditingDeposit(false)
      setIsEditingTime(false)
    }
  }, [isOpen, fdsAmount, fdsTime])

  useEffect(() => {
    setStartTimeValue(fdsTimeStart)
    setEndTimeValue(fdsTimeEnd)
    setOriginalStartTimeValue(fdsTimeStart)
    setOriginalEndTimeValue(fdsTimeEnd)
  }, [fdsTime])

  const handleToggleWithdrawalAlert = () => {
    const newState = !withdrawalAlertEnabled
    setWithdrawalAlertEnabled(newState)

    saveFdsSetting({
      useYn: newState,
      amount: withdrawalThreshold.toString(),
      inOutDv: '2'
    })
  }
  const handleToggleDepositAlert = () => {
    const newState = !depositAlertEnabled
    setDepositAlertEnabled(newState)
    
    saveFdsSetting({
      useYn: newState,
      amount: depositThreshold.toString(),
      inOutDv: '1'
    })
  }

  const handleToggleTimeAlert = () => {
    const newState = !timeAlertEnabled
    setTimeAlertEnabled(newState)

    saveFdsTime({
      timeUseYn: newState,
      timeStart: fdsTimeStart,
      timeEnd: fdsTimeEnd
    })
  }

  // 출금 금액 설정 저장
  const handleSaveWithdrawal = () => {
    const finalAmount = Math.max(withdrawalThreshold, MIN_AMOUNT)
    setWithdrawalThreshold(finalAmount)
    setOriginalWithdrawalThreshold(finalAmount)
    setIsEditingWithdrawal(false)

    saveFdsSetting({
      useYn: withdrawalAlertEnabled,
      amount: finalAmount.toString(),
      inOutDv: '2'
    })
  }

  // 입금 금액 설정 저장
  const handleSaveDeposit = () => {
    const finalAmount = Math.max(depositThreshold, MIN_AMOUNT)
    setDepositThreshold(finalAmount)
    setOriginalDepositThreshold(finalAmount)
    setIsEditingDeposit(false)

    saveFdsSetting({
      useYn: depositAlertEnabled,
      amount: finalAmount.toString(),
      inOutDv: '1'
    })
  }

  // 시간 설정 저장
  const handleSaveTime = () => {
    setIsEditingTime(false);
    setOriginalStartTimeValue(prev => prev = startTimeValue);
    setOriginalEndTimeValue(prev => prev = endTimeValue);

    console.log('current save time: ', {
      timeUseYn: timeAlertEnabled,
      timeStart: startTimeValue,
      timeEnd: endTimeValue
    })
    
    saveFdsTime({
      timeUseYn: timeAlertEnabled,
      timeStart: startTimeValue,
      timeEnd: endTimeValue
    })
  }

  // TODO: props 너무 많아서 정리 필요
  return (
    <ModalPortal
      size='sm'
      className='top-1/2 p-2 sm:h-[40rem] md:h-[43.5rem] max-h-screen overflow-auto'
      isOpen={isOpen}

      handleClose={() => setIsOpen(false)}
    >
      <div>
        <div className='border-b border-gray-200'>
          <div className='p-3 flex items-center justify-between'>
            <span className='font-medium'>설정</span>
            <CustomIcons
              name='close'
              onClick={() => setIsOpen(false)}
              className='w-5 h-5 cursor-pointer'
            />
          </div>
        </div>

        {/* 로딩 상태 처리 */}
        {isPending ? (
          <div className='p-4 space-y-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-32 w-full' />
          </div>
        ) : (
          <div className='p-4'>
            {/* 거액 입금 알림 설정 */}
            <div className='mb-6'>
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium'>거액 입금 알림</span>
                <ToggleSwitch
                  isOn={depositAlertEnabled}
                  onToggle={handleToggleDepositAlert}
                  disabled={isSaving}
                />
              </div>
              <AmountSetting
                title='입금 금액이 얼마 초과일 때'
                subtitle='알려드릴까요?'
                amount={depositThreshold}
                unit='원'
                isEditable={true}
                isEditing={isEditingDeposit}
                onEdit={() => {
                  setIsEditingDeposit(true)
                  setOriginalDepositThreshold(depositThreshold)
                }}
                onSave={handleSaveDeposit}
                onCancel={() => {
                  setDepositThreshold(originalDepositThreshold)
                  setIsEditingDeposit(false)
                }}
                onAmountChange={(value) => setDepositThreshold(value)}
                isAmountAlertEnabled={depositAlertEnabled}
                disabled={isSaving}
              />
            </div>
            {/* 거액 출금 알림 설정 */}
            <div className='mb-6'>
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium'>거액 출금 알림</span>
                <ToggleSwitch
                  isOn={withdrawalAlertEnabled}
                  onToggle={handleToggleWithdrawalAlert}
                  disabled={isSaving}
                />
              </div>
              <AmountSetting
                title='출금 금액이 얼마 초과일 때'
                subtitle='알려드릴까요?'
                amount={withdrawalThreshold}
                unit='원'
                isEditable={true}
                isEditing={isEditingWithdrawal}
                isAmountAlertEnabled={withdrawalAlertEnabled}
                onEdit={() => {
                  setIsEditingWithdrawal(true)
                  setOriginalWithdrawalThreshold(withdrawalThreshold)
                }}
                onSave={handleSaveWithdrawal}
                onCancel={() => {
                  setWithdrawalThreshold(originalWithdrawalThreshold)
                  setIsEditingWithdrawal(false)
                }}
                onAmountChange={(value) => setWithdrawalThreshold(value)}
                disabled={isSaving}
              />
            </div>
            {/* 지정시간 외 출금 알림 설정 */}
            <>
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium'>지정시간 외 출금</span>
                <ToggleSwitch
                  isOn={timeAlertEnabled}
                  onToggle={handleToggleTimeAlert}
                  disabled={isSaving}
                />
              </div>
              <TimeSetting
                title='업무시간 외 출금 거래 알림을'
                subtitle='보내드려요'
                isEditable={true}
                isEditing={isEditingTime}
                timeStart={startTimeValue}
                timeEnd={endTimeValue}
                isTimeAlertEnabled={timeAlertEnabled}
                onEdit={() => {
                  setIsEditingTime(true)
                  setOriginalStartTimeValue(startTimeValue)
                  setOriginalEndTimeValue(endTimeValue)
                }}
                onSave={handleSaveTime}
                onCancel={() => {
                  setIsEditingTime(false)
                  setStartTimeValue(originalStartTimeValue)
                  setEndTimeValue(originalEndTimeValue)
                }}
                disabled={isSaving}
                onStartTimeChange={(value) => setStartTimeValue(prev => prev = value)}
                onEndTimeChange={(value) => setEndTimeValue(prev => prev = value)}
              />
            </>
          </div>
        )}
      </div>
    </ModalPortal>
  )
}

export default FinancialSettingsModal