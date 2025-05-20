import { useCompanyStore, useUserStore } from '@stores'
import { setHeader } from '@utils'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginFormValues } from '@types'

import { useLoginMutation } from './query'

const useLogin = () => {
  const { mutate: login, isPending, error } = useLoginMutation()
  const setUser = useUserStore((s) => s.setUser)
  const setCompanies = useCompanyStore((s) => s.setCompanies)
  const setIsBolcked = useUserStore((s) => s.setIsBolcked)
  const navigate = useNavigate()

  const handleLogin = useCallback(
    (loginData: LoginFormValues) => {
      login(loginData, {
        onSuccess: (data) => {
          if (data.success) {
            setUser({
              userId: data.body.userId,
              companyId: data.body.companyId,
              mngeYn: data.body.mngeYn,
              useInttId: data.body.useInttId,
              certCnt: data.body.certCnt
            })
            setCompanies(data.body.accessCompanyList)
            setIsBolcked(data.body.planStts === '0' && data.body.freeDDay <= 0)
            setHeader(data.body.jwtToken)
            navigate('/')
          }
        }
      })
    },
    [login, setUser, navigate]
  )

  return {
    handleLogin,
    isPending,
    error
  }
}

export { useLogin }
