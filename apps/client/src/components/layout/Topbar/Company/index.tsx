import { useMemo } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import type { Company } from '@types'

import { Popover } from '@packages/components'

import { useCompanyHook } from './hooks/useCompanyHook'

export default function Company() {
  const { companies, handleChangeMainCompany, user, handleChangeInttID } =
    useCompanyHook()

  const currentCompany = useMemo(
    () => companies.find((company) => company.useInttId === user?.useInttId),
    [companies, user?.useInttId]
  )
  if (!user?.useInttId) {
    return (
      <div className='flex items-center gap-1 min-w-20 cursor-pointer p-2 px-4 rounded-[6.25rem] border border-[#EAEAEA] text-gray-700 hover:text-gray-900'>
        <span className='text-sm border-r border-gray-200'>
          재로그인 해주세요.
        </span>
      </div>
    )
  }
  const renderFreeDDay = (freeDay: number) => {
    if (freeDay > 0) {
      return '무료체험 D-' + freeDay
    }
    return null
  }
  return (
    <Popover
      trigger={
        <div className='flex items-center gap-1 min-w-32 cursor-pointer p-2 px-4 rounded-[6.25rem] border border-[#EAEAEA] text-gray-700 hover:text-gray-900'>
          <span className='text-sm border-r border-gray-200 pr-2'>
            {currentCompany?.custNm || '사업자 선택'}
          </span>
          <span className='flex items-center pl-2 gap-3 text-xs font-semibold text-aicfo'>
            {renderFreeDDay(currentCompany?.freeDDay ?? 0)}
            <CustomIcons name='expandMore' className='w-4 h-4' />
          </span>
        </div>
      }
      align='center'
      className='rounded-lg shadow-lg mt-1'
    >
      <div className='min-w-64 whitespace-nowrap'>
        <ul className='space-y-4'>
          {companies?.map((company) => (
            <li
              key={company.useInttId}
              onClick={() => handleChangeInttID({ c: company })}
              className='space-y-1 p-2 cursor-pointer hover:bg-[#F9F9F9]'
            >
              <div
                className={`flex items-center text-base space-x-2 ${currentCompany?.custNm === company.custNm ? 'text-blue-600' : ''}`}
              >
                <span>{company.custNm}</span>
                {company.isMainYn === 'Y' ? (
                  <span className='text-blue-600 bg-[#EDEFFB] rounded-[0.25rem] p-1 text-xs'>
                    기본
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleChangeMainCompany({ c: company })
                    }}
                    className='text-[#767676] underline text-xs'
                  >
                    기본 설정
                  </button>
                )}
              </div>
              <div className='flex text-xs items-center'>
                <span className='text-[#4f4f4f] relative z-10 border-r border-gray-200 pr-2'>
                  담당자 : {company.mngrNm ?? '없음'}
                </span>
                <span className='text-aicfo pl-2'>
                  {renderFreeDDay(company.freeDDay)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Popover>
  )
}
