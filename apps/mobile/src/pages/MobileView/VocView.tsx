import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'
import InquiryForm from '@components/form/InquiryForm'

import { useVoc } from '@hooks/useVoc'

import useDevice from '@stores/useDevice'

import handleMobileActions from '@utils/nativeActionHandler'

import { Button } from '@packages/components'

export default function VocView() {
  const { utterance } = useParams()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const { saveVoc, saveVocPending, saveVocSuccess } = useVoc()

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1)
        }
      }
      return null
    }

    const sessionIdFromCookie = getCookieValue('sessionId')
    const chainIdFromCookie = getCookieValue('chainId')

    if (sessionIdFromCookie) setSessionId(sessionIdFromCookie)
    if (chainIdFromCookie) setChainId(chainIdFromCookie)
  }, [])
  const device = useDevice((s) => s.device)

  const [inquiryContent, setInquiryContent] = useState('')
  return (
    <>
      <div className='flex h-[calc(100vh-var(--topbar-height))] w-full flex-col px-4 mt-16'>
        {saveVocSuccess ? (
          <div className='flex flex-col p-4 w-full h-full justify-between'>
            <div className='flex flex-col w-full items-center h-full pb-20 justify-center'>
              <CustomIcons
                name='check'
                className='w-12 h-12 bg-[#45CE7C] rounded-full text-white p-2'
              />
              <p className='text-xl mt-4'>접수가 완료되었습니다</p>
              <div className='flex flex-col items-center justify-center text-base text-secondary text-center'>
                <p className='mt-4'>
                  문의하신 답변이 완료되면 앱 푸시로 알려드릴게요.
                </p>
                <p className='mt-4'>
                  알림이 오지 않는 경우 기기 설정화면에서 알림을 허용해주세요
                </p>
              </div>
            </div>
            <Button
              className='rounded-lg'
              onClick={() => {
                handleMobileActions(device, 'gosuccess')
              }}
              variant='filled'
              size='xl'
            >
              완료
            </Button>
          </div>
        ) : utterance ? (
          <InquiryForm
            utterance={utterance ?? ''}
            onClose={() => {
              handleMobileActions(device, 'godismiss')
            }}
            onSubmit={(content: string, error: 'AM' | 'UT' | 'ET' | 'ER') => {
              saveVoc({
                VocData: {
                  utterance: utterance ?? '',
                  sessionId: sessionId ?? '',
                  chainId: chainId ?? '',
                  channel: 'MO',
                  content: content,
                  type: error
                }
              })
            }}
          />
        ) : (
          <section
            style={{ scrollbarWidth: 'none' }}
            className='flex flex-col h-full overflow-y-auto py-5 justify-between'
          >
            <div>
              <h1 className='mb-2 ml-2 text-lg'>AI CFO에게 말씀해주세요!</h1>
              <textarea
                value={inquiryContent}
                onChange={(e) => {
                  e.preventDefault()
                  setInquiryContent(e.target.value)
                }}
                placeholder='개선사항, 불편사항을 입력해주세요.'
                className={`w-full shrink-0 min-h-[400px] ${inquiryContent.length > 0 ? 'border-aicfo' : 'border-border'} rounded-md border p-4 outline-aicfo`}
              />
              <div className='mb-4 mt-2 text-end text-sm'>
                {inquiryContent.length}/1000자
              </div>
            </div>
            <div className='flex gap-2'>
              <Button
                className='rounded-lg text-base'
                size='lg'
                variant='outline'
                onClick={() => {
                  handleMobileActions(device, 'godismiss')
                }}
              >
                취소
              </Button>
              <Button
                className='rounded-lg text-base'
                disabled={inquiryContent.length === 0}
                variant='filled'
                size='lg'
                loading={saveVocPending}
                onClick={() =>
                  saveVoc({
                    VocData: {
                      utterance: utterance ?? '',
                      sessionId: '',
                      chainId: '',
                      channel: 'MO',
                      content: inquiryContent,
                      type: 'ER'
                    }
                  })
                }
              >
                문의하기
              </Button>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
