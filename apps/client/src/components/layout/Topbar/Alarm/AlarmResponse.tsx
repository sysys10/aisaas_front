import { VocDetail } from '@hooks'
import { formatStringToDate } from '@utils'

import { Button } from '@packages/components'

export function AlarmResponse({
  vocDetail,
  handleReset
}: {
  vocDetail: VocDetail
  handleReset: () => void
}) {
  if (!vocDetail) return null
  return (
    <div className='flex flex-col flex-1 justify-between gap-y-2 text-lg px-4'>
      <div>
        <div className='flex flex-col py-4 gap-y-1 text-tertiary text-sm'>
          <h3 className='text-lg font-semibold text-primary'>
            {vocDetail.content}
          </h3>
          {formatStringToDate(vocDetail.regist_datetime)}
        </div>
        <div className='flex flex-col gap-y-3 p-6 text-secondary rounded-lg gap-4 bg-background-secondary'>
          <div className='font-semibold text-primary flex gap-x-2 items-center'>
            답변
            <p className='text-tertiary font-normal text-sm'>
              {formatStringToDate(vocDetail?.answer_datetime || '')}
            </p>
          </div>
          <div className='text-lg w-full text-wrap whitespace-pre-wrap'>
            {vocDetail.answer}
          </div>
        </div>
      </div>
      <div className='flex gap-x-2'>
        <Button onClick={handleReset} variant='outline' size='xl'>
          뒤로가기
        </Button>
      </div>
    </div>
  )
}
