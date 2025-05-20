interface VocType {
  userId: string
  companyId: string
  channel: string
  content: string
  utterance: string
  type: 'AM' | 'UT' | 'ET' | 'ER'
}

interface AdminDaquvResponse {
  httpStatus: string
  message: string
  success: boolean
  data: {}
}

export interface SaveVocApiProps extends Omit<VocType, 'userId' | 'companyId'> {
  sessionId: string
  chainId: string
}
export type { VocType, AdminDaquvResponse }
