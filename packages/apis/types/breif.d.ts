import { DefaultResponse } from './domain'

interface BrfInfo {
  seq: number
  userId: string
  brfName: string
  brfType: string
  orderNum: number
}

interface brfAlarmSetting {
  seq: number
  brfSeq: number
  alarmYn: string
  alarmFrequency: string
  alarmTime: string
  alarmWeekdays: string
  alarmMonthday: number
}

interface brfInfoDetailList {
  seq: number
  brfSeq: number
  utteranceContents: string
  orderNum: number
}
interface BrfType {
  brfInfo: BrfInfo
  brfAlarmSetting: brfAlarmSetting
  brfInfoDetailList: brfInfoDetailList[]
  convertAlarmText: string
  convertBrfInfoText: string
  detailCount: number
}

interface BriefResponse extends DefaultResponse {
  body: BrfType[]
}

export type {
  BrfInfo,
  BrfType,
  BrfInfo,
  brfAlarmSetting,
  brfInfoDetailList,
  BriefResponse
}
