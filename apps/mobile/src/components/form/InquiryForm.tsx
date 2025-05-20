import { useState } from 'react'

import { Button, RadioGroup } from '@packages/components'

import InputField from '../common/InputField'

interface InquiryFormProps {
  utterance: string
  onClose: () => void
  onSubmit: (content: string, error: 'AM' | 'UT' | 'ET' | 'ER') => void
}

type ErrorType = 'ER' | 'AM' | 'UT' | 'ET'
const ERROR_TYPES: ErrorType[] = ['AM', 'UT', 'ET', 'ER']

const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  AM: '금액',
  UT: '발화',
  ET: '기타',
  ER: '디폴트'
}

export default function InquiryForm({
  utterance,
  onClose,
  onSubmit
}: InquiryFormProps) {
  const [selectedError, setSelectedError] = useState<ErrorType | null>(null)
  const [inquiryContent, setInquiryContent] = useState('')

  const handleRadioChange = (value: string) => {
    setSelectedError(value as ErrorType)
  }
  return (
    <div className='flex h-full w-full flex-col justify-between py-4 overflow-y-auto'>
      <div className='flex flex-col space-y-8'>
        <section>
          <h1 className='mb-3 px-2 text-lg md:mb-2'>질의 내용</h1>
          <InputField
            value={`"${utterance}"`}
            disabled
            className='py-4 text-lg font-medium'
          />
        </section>

        <section>
          <h1 className='mb-3 px-2 text-lg md:mb-2'>오류 항목</h1>
          <RadioGroup<ErrorType>
            options={ERROR_TYPES.map((type) => ({
              value: type,
              label: ERROR_TYPE_LABELS[type]
            }))}
            direction='horizontal'
            value={selectedError}
            name='error-type'
            onChange={handleRadioChange}
            labelClassName=''
            className='mx-auto text-sm flex px-2 text-nowrap flex-wrap'
          />
        </section>

        <section className='flex flex-1 flex-col'>
          <h1 className='mb-2 ml-2 text-lg'>문의 내용</h1>
          <textarea
            value={inquiryContent}
            onChange={(e) => {
              e.preventDefault()
              setInquiryContent(e.target.value)
            }}
            placeholder='개선사항, 불편사항을 입력해주세요.'
            className={`w-full min-h-[300px] ${inquiryContent.length > 0 ? 'border-aicfo' : 'border-border'} flex-1 shrink-0 rounded-md border p-4 outline-aicfo`}
          />
          <div className='mb-8 text-end text-sm'>
            {inquiryContent.length} / 1000
          </div>
        </section>
      </div>

      <div className='flex gap-2'>
        <Button
          size='lg'
          variant='outline'
          className='rounded-lg text-base'
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          size='lg'
          variant='filled'
          className='rounded-lg text-base'
          disabled={inquiryContent.length == 0}
          onClick={() => onSubmit(inquiryContent, selectedError ?? 'ER')}
        >
          문의하기
        </Button>
      </div>
    </div>
  )
}
