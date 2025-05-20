import { useState } from 'react'

import { useGetVocMutation } from './query'

export interface VocDetail {
  seq: number
  user_id: string
  company_id: string
  channel: string
  utterance_contents: string
  conversation_id: string
  chain_id: string
  type: string
  image_url: string | null
  content: string
  answer: string | null
  regist_datetime: string
  answer_datetime: string | null
}
export function useGetVocDetail() {
  const [vocDetail, setVocDetail] = useState<VocDetail | null>(null)
  const {
    mutate: getVoc,
    isPending: getVocPending,
    isSuccess: getVocSuccess,
    reset
  } = useGetVocMutation({
    setVocDetail
  })
  const handleReset = () => {
    setVocDetail(null)
    reset()
  }

  return { vocDetail, getVoc, getVocPending, getVocSuccess, handleReset }
}
