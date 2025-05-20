import { RecommendProps } from "./recommendType"

interface DefaultResponse {
  status: number // 이건 그냥 200임
  retCd: string
  success: boolean //이걸로 구분함
  message: string
}

export interface Company {
  mngrNm: string
  custNm: string
  isMainYn: 'Y' | 'N'
  useInttId: string
  freeDDay: number
}

export interface UserInfo {
  userId: string
  companyId: string
  mngeYn: 'Y' | 'N' | 'S'
  jwtToken: string
  useInttId: string
  accessCompanyList: Company[]
  certCnt: number
}

interface LoginFormValues {
  userId: string
  password: string
}

interface LoginResponse extends DefaultResponse {
  body: UserInfo & {
    freeDDay: number
    planStts: string
  }
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


interface RequestWithUtterance {
  utterance: string
}

interface RequestRemoveUtterance {
  utterance?: string
  utteranceDate?: string
  intentCd?: string
  type?: 'ALL'
  userId: string
}

interface BodyStringResponse extends DefaultResponse {
  body: string
}
interface RecommendQuestionResponse extends DefaultResponse {
  body: {
    body: RecommendProps[]
  }
}

export type {
  ErrorResponse,
  DefaultResponse,
  LoginFormValues,
  LoginResponse,
  UserInfo,
  postRecentQuestionsResponse,
  RecentQuestionProps,
  RecentQuestionsRequest,
  RequestWithUtterance,
  BodyStringResponse,
  RequestRemoveUtterance,
  RecommendQuestionResponse
}
