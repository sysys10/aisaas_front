import { AICFOResultType, SearchSubmitType } from '@types'

import { Charts } from '../charts'
import { AIResponseFooter } from './footer/AIResponseFooter'

function AIResponse({
  isTypingComplete,
  result,
  handleSearchSubmit
}: {
  isTypingComplete: boolean
  result: AICFOResultType
  handleSearchSubmit: SearchSubmitType
}) {
  const {
    table_data = [],
    utterance,
    sql_query = '',
    session_id = '',
    chain_id = '',
    is_api = false,
    date_info = [],
    has_next
  } = result

  return (
    <div className='flex flex-col gap-y-2'>
      {isTypingComplete && (
        <>
          <article
            className={`flex w-full flex-col gap-y-2 bg-background-primary`}
          >
            {table_data?.length > 0 && (
              <Charts table_data={table_data} is_api={is_api} />
            )}
          </article>

          <AIResponseFooter
            table_data={table_data}
            dateInfo={date_info}
            sqlQuery={sql_query}
            utterance={utterance}
            chainId={chain_id}
            sessionId={session_id}
            has_next={has_next}
            handleSearchSubmit={handleSearchSubmit}
          />
        </>
      )}
    </div>
  )
}

export { AIResponse }
