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
          {has_next && (
              <div className="flex w-full items-center justify-end pb-3">
                <button 
                  className="rounded-md ml-2 flex items-center gap-2 text-white bg-blue-500 py-2 px-3 text-sm"
                  onClick={()=>handleSearchSubmit({utterance: 'next_page', session_id: session_id})}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fff" className="bi bi-arrow-right-square-fill " viewBox="0 0 16 16">
                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"></path>
                  </svg>
                  다음 페이지
                </button>
              </div>
            )}
          <AIResponseFooter
            table_data={table_data}
            dateInfo={date_info}
            sqlQuery={sql_query}
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
