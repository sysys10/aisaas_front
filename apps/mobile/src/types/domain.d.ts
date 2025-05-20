interface DefaultResponse {
  status: number // 이건 그냥 200임
  retCd: string
  success: boolean //이걸로 구분함
  message: string
}

interface UserInfo {
  userId: string
  jwtToken: string
}

interface LoginResponse extends DefaultResponse {
  body: UserInfo
}

interface Utterance {
  utterance: string
  utteranceDate: string
}

// 최근 질의 관련
interface RecentQuestionProps extends Utterance {
  intentCd: string
  utteranceDateTab: number
}
interface postRecentQuestionsResponse extends DefaultResponse {
  body: RecentQuestionProps[]
}

interface RecentQuestionsRequest {
  userId: string
}

interface RequestWithUtterance {
  utterance: string
}

interface RequestRemoveUtterance extends Utterance {
  intentCd: string
}

interface BodyStringResponse extends DefaultResponse {
  body: string
}

export type {
  DefaultResponse,
  LoginResponse,
  UserInfo,
  postRecentQuestionsResponse,
  RecentQuestionProps,
  RecentQuestionsRequest,
  RequestWithUtterance,
  BodyStringResponse,
  RequestRemoveUtterance
}
