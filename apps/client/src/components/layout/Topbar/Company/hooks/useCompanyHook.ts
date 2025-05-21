import { UserStoreType, useCompanyStore, useUserStore } from '@stores'

import { createMutation } from '@hooks/query/mutationUtils'

import { Company } from '@types'

import { changeInttId, changeMainCompany } from '@packages/apis'

function useCompanyMutation({
  setUser,
  setCompanies
}: {
  setUser: (user: UserStoreType) => void
  setCompanies: (companies: Company[]) => void
}) {
  const setIsBolcked = useUserStore((s) => s.setIsBolcked)
  return createMutation({
    mutationFn: changeInttId,
    onSuccess: (data) => {
      if (data.success) {
        setUser({
          userId: data.body.userId,
          companyId: data.body.companyId,
          mngeYn: data.body.mngeYn,
          useInttId: data.body.useInttId,
          prodCd: data.body.prodCd,
          companyNm: data.body.companyNm,
          certCnt: data.body.certCnt
        })
        setCompanies(data.body.accessCompanyList)
        setIsBolcked(data.body.planStts === '0' && data.body.freeDDay <= 0)
        window.location.reload()
      }
    }
  })
}
function useMainCompanyMutation({
  changeInttId
}: {
  changeInttId: (data: { useInttId: string; useTokenYn: string }) => void
}) {
  return createMutation({
    mutationFn: changeMainCompany,
    onSuccess: (data, variables) => {
      if (data.success) {
        changeInttId({
          useInttId: variables.useInttId,
          useTokenYn: 'Y'
        })
      }
    }
  })
}

export const useCompanyHook = () => {
  const { user, setUser } = useUserStore((s) => s)
  const { companies, setCompanies } = useCompanyStore((s) => s)
  
  function handleChangeInttID({ c }: { c: Company }) {
    
  }
  function handleChangeMainCompany({ c }: { c: Company }) {
    const newUser = {
      ...user,
      companyNm: c.custNm,
      companyId: c.custCd,
    }
    setUser(newUser as UserStoreType)
  }
  return { companies, handleChangeInttID, user, handleChangeMainCompany }
}
