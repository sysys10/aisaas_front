import { DefaultResponse } from './domain'

interface AlarmType {
  pushNotificationHistorySeq: number
  pushNotificationSendDate: string
  title: string
  useReadYn: 'Y' | 'N'
  type: string
  bodyTitle: string
  bodyText1: string
  bodyText2: string
  bodyText3: string
  bodyText4: string
  vocSeq?: number
}

interface AlarmResponse extends DefaultResponse {
  body: {
    data: Alarm[]
  }
}

export type { AlarmType, AlarmResponse }
