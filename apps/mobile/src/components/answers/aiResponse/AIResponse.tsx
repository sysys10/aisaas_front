import { Charts } from '../charts'
import { AIResponseFooter } from './AIResponseFooter'

function AIResponse(
  { isTypingComplete, result }: { isTypingComplete: boolean; result: any }
) {
  const {
    table_data = [],
    utterance,
    session_id = '',
    chain_id = '',
    is_api,
    has_next,
    date_info
  } = result

  return (
    <div className='flex flex-col gap-y-2'>
      {isTypingComplete && (
        <>
          <article
            className={`flex w-full flex-col gap-y-2 rounded-xl  border-border bg-background-primary`}
          >
            <Charts table_data={table_data} is_api={is_api} />
          </article>

          <AIResponseFooter
            has_next={has_next}
            dateInfo={date_info}
            utterance={utterance}
            chainId={chain_id}
            sessionId={session_id}
          />
        </>
      )}
    </div>
  )
}

export { AIResponse }
