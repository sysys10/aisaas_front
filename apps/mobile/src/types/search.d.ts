interface tempDefaultResponse {
  status: string
  trace_id: string
}
export interface SearchTempResultType {
  answer: string
  table: string[]
}

export interface SearchAnswerResponse extends tempDefaultResponse {
  raw_data: Record<string, any>[]
  result: SearchTempResultType
}
