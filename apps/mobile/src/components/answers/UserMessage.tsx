import { getCurrentTime } from '@utils/date'

function UserMessage({ utterance }: { utterance: string }) {
  return (
    <div className='mt-8 mb-4 flex flex-col justify-between gap-y-2 w-full text-aicfo'>
      <p className='text-2xl font-bold'>"{utterance}"</p>
      <p className={`text-sm font-normal text-nowrap text-tertiary`}>
        {getCurrentTime()}
      </p>
    </div>
  )
}

export { UserMessage }
