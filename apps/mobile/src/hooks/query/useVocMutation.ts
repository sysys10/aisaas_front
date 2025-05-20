import { getVocApi, saveVocApi } from '@packages/apis'
import { SaveVocApiProps } from '@packages/apis/types'

import { createMutation } from './mutationUtils'

const useVocMutation = () => {
  return createMutation({
    mutationFn: saveVocApi
  })
}

const useGetVocMutation = ({
  setVocDetail
}: {
  setVocDetail: (detail: any) => void
}) => {
  return createMutation({
    mutationFn: getVocApi,
    onSuccess: (data) => {
      if (data.success) {
        setVocDetail(data.body.data)
      }
    }
  })
}

export { useVocMutation, useGetVocMutation }
