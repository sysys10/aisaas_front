import { SidebarContent } from '@constants'

import {
  AICFOResultType,
  AlarmType,
  BrfType,
  RecentQuestionProps,
  RequestRemoveUtterance,
  SearchSubmitType,
  UserInfo
} from '@types'

interface BaseSearchProps {
  handleSearchSubmit: SearchSubmitType
  isFirstSearch: boolean
}

interface BaseRecentQuestionProps {
  handleRemoveRecentQuestion: (
    params: Pick<
      RequestRemoveUtterance,
      'utterance' | 'intentCd' | 'utteranceDate' | 'type'
    >
  ) => void
  handleGetRecentQuestion: () => void
}
interface LeftSidebarProps
  extends BaseRecentQuestionProps,
    Pick<BaseSearchProps, 'handleSearchSubmit'> {
  handleToggleAdmin: () => void
  handleCloseAdmin: () => void
  user: Omit<UserInfo, 'accessCompanyList' | 'jwtToken'>
}

interface SidebarListProps
  extends BaseRecentQuestionProps,
    Omit<LeftSidebarProps, 'handleCloseAdmin' | 'handleToggleAdmin'> {
  sidebarContent: SidebarContent
  getFdsAlarmCnt: () => void
}
interface RecentQuestionListProps
  extends Omit<BaseRecentQuestionProps, 'handleGetRecentQuestion'> {
  handleSearchSubmit: SearchSubmitType
  handleAllRecentQuestionRemove: () => void
}

interface NavbarProps extends Pick<BaseSearchProps, 'handleSearchSubmit'> {
  handleToggleAdmin: () => void
}
interface BrfListProps {
  brief: BrfType[]
  handleSearchSubmit: SearchSubmitType
}

interface MainContentProps extends BaseSearchProps {
  search: string
  handleSearch: (value: string) => void
  recommend: string[]
  results: AICFOResultType[]
  searchIsLoading: boolean
  searchIsSuccess: boolean
}

interface AnswerSectionProps
  extends Omit<BaseSearchProps, 'handleSearchSubmit'> {
  results: AICFOResultType[]
  searchIsLoading: boolean
}

interface AIResponseProps extends AICFOResultType {
  answer: string
}

interface SearchSectionProps extends BaseSearchProps {
  handleSearch: (value: string) => void
  search: string
}

interface SearchBarProps
  extends Omit<
    SearchSectionProps,
    'handleMoreQuestionClick' | 'isMoreQuestionClicked'
  > {
  searchBarRef: React.RefObject<HTMLDivElement>
  recommend: string[]
}

interface ChatBoxProps {
  isLast: boolean
  searchIsLoading: boolean
  result: AICFOResultType
}

interface MainBannerProps extends BaseSearchProps {
  recommend: string[]
  searchBarRef: React.RefObject<HTMLDivElement>
}

interface ChartsProps {
  answer: string
  table_data: Record<string, any>[]
}

interface AIResponseFooterProps {
  utterance: string
  sqlQuery: string
  sessionId: string
  chainId: string
  dateInfo: string[]
  table_data: Record<string, any>[]
}

export type {
  LeftSidebarProps,
  ChartsProps,
  BrfListProps,
  SidebarListProps,
  AIResponseFooterProps,
  NavbarProps,
  MainContentProps,
  AIResponseProps,
  AnswerSectionProps,
  RecentQuestionListProps,
  ChatBoxProps,
  SearchSectionProps,
  SearchBarProps,
  MainBannerProps
}
