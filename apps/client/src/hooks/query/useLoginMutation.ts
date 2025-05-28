import { useMutation } from '@tanstack/react-query'

import { LoginFormValues, LoginResponse } from '@types'

import { setHeader } from '@utils/axiosHeader'

import { postLogin, postLogout } from '@packages/apis'

import { createMutation } from './mutationUtils'

const useLoginMutation = () => {
  return createMutation<LoginResponse, LoginFormValues>({
    mutationFn: postLogin,
    onError: (error: any) => {
      throw new Error(error.response.data)
    },
    onSuccess: (data) => {
      if (!data.success) {
        throw new Error(data.message)
      }
      setHeader(data.body.jwtToken)
    }
  })
}

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: postLogout
  })
}
export { useLoginMutation, useLogoutMutation }
