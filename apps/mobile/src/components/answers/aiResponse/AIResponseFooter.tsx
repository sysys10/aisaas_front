import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'

import useDevice from '@stores/useDevice'

import handleMobileActions from '@utils/nativeActionHandler'

import { Popover } from '@packages/components'

interface AIResponseFooterProps {
  utterance: string
  sessionId: string
  chainId: string
  dateInfo: string[]
}

function AIResponseFooter({
  utterance,
  sessionId,
  chainId,
  dateInfo
}: AIResponseFooterProps) {
  const device = useDevice((s) => s.device)
  const [likeActive, setLikeActive] = useState(false)
  const [dislikeActive, setDislikeActive] = useState(false)

  const handleLikeClick = () => {
    if (dislikeActive) {
      setDislikeActive(false)
    }
    setLikeActive(!likeActive)
  }

  const handleDislikeClick = () => {
    if (likeActive) {
      setLikeActive(false)
    }
    setDislikeActive(!dislikeActive)
  }

  return (
    <>
      <div className='flex flex-col w-full justify-between'>
        <div className='flex justify-between mb-2 px-2'>
          <div>
            {dateInfo && (
              <Popover
                trigger={
                  <CustomIcons
                    name='info'
                    className='w-6 h-6 cursor-pointer text-gray-500'
                  />
                }
                className='border-[#767676] border rounded-lg'
              >
                <div className='flex flex-col gap-y-2 w-80'>
                  <h2 className='text-lg font-semibold text-[#0F0F0F]'>
                    출처 정보
                  </h2>
                  <div className='flex flex-col gap-y-2 text-disabled'>
                    {dateInfo?.length ? (
                      <>
                        조회 기준 시점{' '}
                        {dateInfo[0]?.replace(
                          /(\d{4})(\d{2})(\d{2})/,
                          '$1-$2-$3'
                        )}{' '}
                        ~{' '}
                        {dateInfo[1]?.replace(
                          /(\d{4})(\d{2})(\d{2})/,
                          '$1-$2-$3'
                        )}
                      </>
                    ) : (
                      <p>조회 기준 시점이 없습니다.</p>
                    )}
                  </div>
                </div>
              </Popover>
            )}
          </div>
          <div className='flex items-center gap-x-2'>
            <CustomIcons
              name='like'
              className={`w-6 h-6 ${likeActive ? 'text-blue-500 fill-blue-500' : ''}`}
              onClick={handleLikeClick}
            />
            <CustomIcons
              name='bad'
              className={`w-6 h-6 ${dislikeActive ? 'text-red-500 fill-red-500' : ''}`}
              onClick={handleDislikeClick}
            />
            <CustomIcons
              className='w-6 h-6'
              onClick={() => {
                handleMobileActions(
                  device,
                  'goqna',
                  utterance,
                  sessionId,
                  chainId
                )
              }}
              name='alert'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export { AIResponseFooter }
