import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import { timeUtils } from '@utils'

function UserMessage({ utterance }: { utterance: string }) {
  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const copyEvent = new ClipboardEvent('copy')
      window.dispatchEvent(copyEvent)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }
  return (
    <div className='flex items-end justify-between w-full text-aicfo'>
      <div className='flex items-center gap-x-2 group'>
        <p className='text-xl font-bold'>"{utterance}"</p>
        <button
          onClick={() => handleCopyClick(utterance)}
          className='opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <DocumentDuplicateIcon className='w-5 h-5' />
        </button>
      </div>
      <p className={`text-sm font-normal text-nowrap text-tertiary`}>
        {timeUtils.getCurrentTime()}
      </p>
    </div>
  )
}

export { UserMessage }
