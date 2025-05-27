type pendingAnswer = string | null

type AICFOResultType = {
  utterance: string
  answer: PendingAnswer | string
  table_data?: TableData[]
  sql_query?: string
  session_id?: string
  chain_id?: string
  is_api: boolean
  has_next: boolean
}

export type { pendingAnswer, AICFOResultType }
