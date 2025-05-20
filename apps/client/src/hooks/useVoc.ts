import { useVocMutation } from './query'

export function useVoc() {
  const {
    mutateAsync: saveVoc,
    isPending: saveVocPending,
    isSuccess: saveVocSuccess,
    reset: reset
  } = useVocMutation()

  return { saveVoc, saveVocPending, saveVocSuccess, reset }
}
