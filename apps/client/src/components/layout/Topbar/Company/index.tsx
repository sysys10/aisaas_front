import type { Company } from '@types'

import { Popover } from '@packages/components'

import { useCompanyHook } from './hooks/useCompanyHook'
import { useUserStore } from '@stores'

export default function Company() {
  const { companies, handleChangeMainCompany } =
    useCompanyHook()
  const user = useUserStore((s) => s.user)

  const currentCompany = user?.companyNm
  
  if (!user?.useInttId) {
    return (
      <div className='flex items-center gap-1 min-w-20 cursor-pointer p-2 px-4 rounded-[6.25rem] border border-[#EAEAEA] text-gray-700 hover:text-gray-900'>
        <span className='text-sm border-r border-gray-200'>
          재로그인 해주세요.
        </span>
      </div>
    )
  }
  return (
    <Popover
      trigger={
        <div className='flex items-center gap-1 min-w-32 cursor-pointer p-2 px-4 rounded-[6.25rem] border border-[#EAEAEA] text-gray-700 hover:text-gray-900'>
          <span className='text-sm border-r border-gray-200 pr-2'>
            {currentCompany || '사업자 선택'}
          </span>
        
        </div>
      }
      align='center'
      className='rounded-lg shadow-lg mt-1'
    >
      <div className='min-w-64 whitespace-nowrap'>
        <ul className='space-y-4 overflow-y-auto max-h-[800px]'>
          {companies?.map((company) => (
            <li
              key={company.custCd}
              onClick={() => {
                handleChangeMainCompany({ c: company });
                window.location.reload();
              }}
              className='space-y-1 p-2 cursor-pointer hover:bg-[#F9F9F9]'
            >
              <div
                className={`flex items-center text-base space-x-2 ${currentCompany === company.custNm ? 'text-blue-600' : ''}`}
              >
                <span>{company.custNm}</span>
                {company.isMainYn === 'Y' && (
                  <span className='text-blue-600 bg-[#EDEFFB] rounded-[0.25rem] p-1 text-xs'>
                    기본
                  </span>
                )}
              </div>
              <div className='flex text-xs items-center'>
                <span className='text-[#4f4f4f] relative z-10 border-r border-gray-200 pr-2'>
                  {company.custCd}
                </span>
                {/* <span className='text-aicfo pl-2'>
                  {renderFreeDDay(company.freeDDay)}
                </span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Popover>
  )
}
