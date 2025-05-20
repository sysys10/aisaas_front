import { useVoc } from '@hooks'
import { useUserStore } from '@stores'
import { useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'
import { ModalPortal } from '@components/ui'

import { Button, RadioGroup } from '@packages/components'

type ErrorType = 'ER' | 'AM' | 'UT' | 'ET'
const ERROR_TYPES: ErrorType[] = ['AM', 'UT', 'ET', 'ER']

const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  AM: '금액 오류',
  UT: '발화 오류',
  ET: '기타 오류',
  ER: '디폴트 오류'
}

interface VocFormProps {
  isOpen: boolean
  handleClose: () => void
  isDefault?: boolean
  sessionId?: string
  utterance?: string
  chainId?: string
}

export function VocModal({
  isOpen,
  handleClose,
  sessionId,
  isDefault = false,
  utterance = '',
  chainId = ''
}: VocFormProps) {
  const user = useUserStore((s) => s.user)
  const [selectedError, setSelectedError] = useState<ErrorType>('ET')
  const [inquiryContent, setInquiryContent] = useState('')
  const handleRadioChange = (value: ErrorType) => {
    setSelectedError(value as ErrorType)
  }
  const { saveVoc, saveVocPending, saveVocSuccess, reset } = useVoc()

  const handleSubmit = () => {
    if (!user) return
    if (isDefault) {
      saveVoc({
        VocData: {
          channel: 'PC',
          sessionId: sessionId || '',
          chainId: chainId || '',
          content: inquiryContent,
          utterance: utterance,
          type: selectedError ?? 'ET'
        }
      })
    } else {
      saveVoc({
        VocData: {
          sessionId: sessionId || '',
          chainId: chainId || '',
          channel: 'PC',
          content: inquiryContent,
          utterance: utterance,
          type: 'ER'
        }
      })
    }
  }
  const handleConfirm = () => {
    handleClose()
    setInquiryContent('')
    setSelectedError('ET')
    if (saveVocSuccess) {
      reset()
    }
  }

  return (
    <ModalPortal
      isOpen={isOpen}
      handleClose={handleConfirm}
      height='full'
      size='sm'
      className='w-full left-full -translate-x-full p-0 top-0 rounded-none h-full translate-y-0'
    >
      <div className='flex h-full w-full flex-col gap-y-2 md:gap-y-8 items-start'>
        <div className='flex justify-between items-center w-full border-b p-4'>
          <h1 className='text-[1.375rem] text-center'>문의하기</h1>
          <CustomIcons
            name='close'
            iconClassName='w-6 h-6'
            onClick={handleClose}
          />
        </div>
        <div className='flex flex-col w-full h-full justify-between px-4 pb-4'>
          {saveVocSuccess ? (
            <div className='flex flex-col p-4 w-full h-full justify-between'>
              <div className='flex flex-col w-full items-center h-full pb-40 justify-center'>
                <CustomIcons
                  name='check'
                  className='w-12 h-12 bg-[#45CE7C] rounded-full p-2'
                  iconClassName='text-white'
                />
                <p className='text-xl mt-4'>접수가 완료되었습니다</p>
                <div className='flex flex-col items-center justify-center text-lg text-tertiary text-center'>
                  <p className='mt-10'>
                    문의하신 답변이 완료되면 앱 푸시로 알려드릴게요.
                  </p>
                  <p className='mt-4'>
                    알림이 오지 않는 경우 <br /> 기기 설정화면에서 알림을
                    허용해주세요
                  </p>
                </div>
              </div>
              <Button
                className='rounded-lg'
                onClick={handleConfirm}
                variant='filled'
                size='xl'
              >
                완료
              </Button>
            </div>
          ) : (
            <>
              {!isDefault && (
                <>
                  <section className=''>
                    <h1 className='mb-1.5 ml-2 text-lg md:mb-3'>질의 내용</h1>
                    <input
                      value={`"${utterance}"`}
                      disabled
                      className='md-4 md:p-4 flex w-full items-center text-lg rounded-lg border bg-background-primary bg-gray-50'
                    />
                  </section>

                  <section className='mt-4'>
                    <h1 className='mb-1.5 ml-2 text-lg md:mb-3'>오류 항목</h1>
                    <div className='px-4'>
                      <RadioGroup<ErrorType>
                        options={ERROR_TYPES.slice(0, 3).map((type) => ({
                          value: type,
                          label: ERROR_TYPE_LABELS[type]
                        }))}
                        direction='horizontal'
                        value={selectedError}
                        name='error-type'
                        onChange={handleRadioChange}
                        className='items-center text-base'
                      />
                    </div>
                  </section>
                </>
              )}

              <section className='flex flex-1 flex-col w-full mt-4'>
                <h1 className='mb-1.5 ml-2 text-lg'>문의 내용</h1>
                <textarea
                  autoFocus
                  value={inquiryContent}
                  onChange={(e) => {
                    e.preventDefault()
                    setInquiryContent(e.target.value)
                  }}
                  placeholder='개선사항, 불편사항을 입력해주세요.'
                  className={`h-4/5 w-full rounded-md border border-border p-4 text-base outline-aicfo placeholder:font-thin`}
                />
                <div className='mb-4 mt-2 text-end text-sm'>
                  {inquiryContent.length} / 1000
                </div>
                {isDefault && (
                  <div
                    className={`mx-auto my-4 flex h-fit w-full rounded-lg bg-[rgba(79,99,210,0.10)] px-4 py-6 text-sm text-primary`}
                  >
                    문의하신 답변이 완료되면 앱 푸쉬로 알려드릴게요.
                    <br />
                    알림이 오지 않는 경우 기기 설정화면에서 알림을 허용해주세요!
                    <br />
                  </div>
                )}
              </section>

              <div className={`flex w-full gap-2`}>
                <Button
                  size='lg'
                  variant='outline'
                  className='rounded-lg'
                  onClick={handleConfirm}
                >
                  취소
                </Button>
                <Button
                  className='rounded-lg'
                  disabled={inquiryContent.length === 0}
                  variant='filled'
                  size='lg'
                  onClick={handleSubmit}
                >
                  {saveVocPending ? '전송중...' : '문의하기'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalPortal>
  )
}
