import { useState } from 'react'

import {
  FdsSettingResponse,
  FdsTimeProps,
  SaveFdsSettingResponse,
  getFdsSettingApi,
  saveFdsSettingApi,
  saveFdsTimeApi
} from '@apis/fdsSettingApi'

import { createMutation } from '@hooks/query/mutationUtils'

export interface FdsSettingProps {
  inAmount: number
  outAmount: number
  inYn: boolean 
  outYn: boolean
}
function useFdsSettingQuery({
  setFdsAmount,
  setFdsTime
}: {
  setFdsAmount: (fdsSetting: FdsSettingProps) => void
  setFdsTime: (fdsTime: FdsTimeProps) => void
}) {
  return createMutation<FdsSettingResponse>({
    mutationFn: getFdsSettingApi,
    onSuccess: (data) => {
      if (data.success){
        setFdsAmount({
          inAmount: Number(data.body.inAmount),
          outAmount: Number(data.body.outAmount),
          inYn: (data.body.inYn as unknown as string) === 'Y',
          outYn: (data.body.outYn as unknown as string) === 'Y',
        })
        setFdsTime({
          timeUseYn: data.body.timeUseYn,
          timeStart: data.body.timeStart,
          timeEnd: data.body.timeEnd
        })
      } else {
        throw new Error('FDS 설정 불러오기 실패')
      }
    }
  })
}

function useFdsSettingSaveMutation({ setFdsAmount }: { setFdsAmount: any }) {
  return createMutation<
    SaveFdsSettingResponse,
    {
      useYn: boolean
      amount: string
      inOutDv: '1' | '2'
    }
  >({
    mutationFn: saveFdsSettingApi,
    onSuccess: (data) => {
      if (data.body.inOutDv === '1') {
        setFdsAmount((prev: FdsSettingProps) => ({
          ...prev,
          inAmount: Number(data.body.amount),
          inYn: data.body.useYn === 'Y',
        }))
      } else {
        setFdsAmount((prev: FdsSettingProps) => ({
          ...prev,
          outAmount: Number(data.body.amount),
          outYn: data.body.useYn === 'Y'
        }))
      }
    }
  })
}
function useFdsTimeSaveMutation({ setFdsTime }: { setFdsTime: any }) {
  return createMutation({
    mutationFn: saveFdsTimeApi,
    onSuccess: (data) => {
      setFdsTime({
        timeUseYn: data.body.fdsTimeUseYn,
        timeStart: data.body.fdsTimeStart,
        timeEnd: data.body.fdsTimeEnd
      })
    }
  })
}
export function useFdsSetting() {
  const [fdsAmount, setFdsAmount] = useState<FdsSettingProps>({
    inAmount: 0,
    outAmount: 0,
    inYn: true,
    outYn: true,
  })
  const [fdsTime, setFdsTime] = useState<FdsTimeProps>({
    timeUseYn: 'Y',
    timeStart: '0000',
    timeEnd: '0000'
  })

  const { mutate: saveFdsSetting, isPending: isSaving } =
    useFdsSettingSaveMutation({ setFdsAmount })
  const { mutate: saveFdsTime, isPending: isSavingTime } =
    useFdsTimeSaveMutation({ setFdsTime })
  const { mutate: getFdsSetting, isPending } = useFdsSettingQuery({
    setFdsAmount, setFdsTime
  })
  return { fdsAmount, fdsTime, getFdsSetting, isPending, saveFdsSetting, isSaving,saveFdsTime,isSavingTime }
}
