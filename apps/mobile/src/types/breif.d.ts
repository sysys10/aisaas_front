interface BreifInfo {
  seq: number
  userId: string
  brfName: string
  brfType: string
  orderNum: number
}
interface breifAlarmSetting {
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
interface Breif {
  brfInfo: BreifInfo
  breifAlarmSetting: breifAlarmSetting
  brfInfoDetailList: brfInfoDetailList[]
  convertAlarmText: string
  convertBrfInfoText: string
  detailCount: number
}

export type { Breif, BreifInfo, breifAlarmSetting, brfInfoDetailList }
