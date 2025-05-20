import { getReport } from '@apis'

import { BankDataResponse, DateRangeParams } from '@packages/apis/types'

import { createMutation } from './mutationUtils'

function handleTranslateReport(v: string) {
  if (v === 'ACCT_REC_1') return '1.수시입출예금'
  if (v === 'ACCT_REC_2') return '2.외화수시입출예금'
  if (v === 'ACCT_REC_3') return '3.증권계좌예수금'
  if (v === 'ACCT_REC_4') return '4.원화금융상품'
  if (v === 'ACCT_REC_5') return '5.외화금융상품'
  if (v === 'ACCT_REC_6') return '6.증권금융상품'
  if (v === 'ACCT_REC_7') return '7.원화대출'
  if (v === 'ACCT_REC_8') return '8.외화대출'
  if (v === 'ACCT_REC_9') return '9.증권대출'
  return v
}

const DATA_HEADERS = {
  ACCT_REC_1: {
    BANK_NM: {
      change_title: '은행',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '전일잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '오늘잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    },
  },
  ACCT_REC_2: {
    BANK_NM: {
      change_title: '은행',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '전일잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '오늘잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    },
  },
  ACCT_REC_3: {
    BANK_NM: {
      change_title: '증권사',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '전일잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '오늘잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    },
  },
  ACCT_REC_4: {
    BANK_NM: {
      change_title: '금융기관',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '어제잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '금일잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    DUE_DT: {
      change_title: '만기일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    OPEN_DT: {
      change_title: '신규일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    TOT_FLUC_AMT: {
      change_title: '증감',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    }
  },
  ACCT_REC_5: {
    BANK_NM: {
      change_title: '금융기관',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '어제잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '금일잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    DUE_DT: {
      change_title: '만기일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    OPEN_DT: {
      change_title: '신규일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    TOT_FLUC_AMT: {
      change_title: '증감',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    }
  },
  ACCT_REC_6: {
    BANK_NM: {
      change_title: '증권사',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '어제평가액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '금일평가액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    DUE_DT: {
      change_title: '만기일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    OPEN_DT: {
      change_title: '신규일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    TOT_FLUC_AMT: {
      change_title: '증감',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    STOCK_NM: {
      change_title: '종목(펀드)명',
      align: 'left',
      type: 'string'
    },
  },
  ACCT_REC_7: {
    BANK_NM: {
      change_title: '은행',
      align: 'left',
      type: 'string',
      width: '170px'
    },
    DUE_DT: {
      change_title: '만기일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    OPEN_DT: {
      change_title: '신규일',
      align: 'right',
      type: 'date',
      width: '130px'
    },
    BAL_AMT_DEFAULT: {
      change_title: '기초잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    BAL_AMT_END: {
      change_title: '마감잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_BF: {
      change_title: '어제잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    ACCT_BAL_AMT_AF: {
      change_title: '금일잔액',
      align: 'right',
      type: 'string',
      width: '180px'
    },
    TOT_FLUC_AMT: {
      change_title: '증감',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_RCV_AMT: {
      change_title: '증가',
      align: 'right',
      type: 'string',
      width: '145px'
    },
    TOT_WITHDRAWAL_AMT: {
      change_title: '감소',
      align: 'right',
      type: 'string',
      width: '145px'
    },
  }
}

export const useReportMutation = ({
  setReport
}: {
  setReport: (report: any) => void
}) => {
  return createMutation<BankDataResponse, DateRangeParams>({
    mutationFn: getReport,
    onSuccess: (data) => {
      const keys = Object.keys(data.data)
      const newData = keys.map((key) => {
        return {
          start_date: data.AICFO_HEADER.START_DT,
          end_date: data.AICFO_HEADER.END_DT,
          data: data.data[key],
          data_header: DATA_HEADERS[key as keyof typeof DATA_HEADERS],
          answer: handleTranslateReport(key),
          key: key
        }
      })
      const sortedData = newData.sort((a: any, b: any) => {
        return -b.answer.localeCompare(a.answer)
      })
      setReport(sortedData)
    }
  })
}
;``
