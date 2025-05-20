const formatDate = (value: string) => {
  if (!value) return value
  // yyyyMMddHHmmss 형식 체크
  if (value.length === 14) {
    const year = value.substring(0, 4)
    const month = value.substring(4, 6)
    const day = value.substring(6, 8)
    return `${year}-${month}-${day}`
  }
  // yyyyMMdd 형식 체크
  if (value.length === 8) {
    const year = value.substring(0, 4)
    const month = value.substring(4, 6)
    const day = value.substring(6, 8)
    return `${year}-${month}-${day}`
  }
  return value
}

const formatTime = (value: string) => {
  if (!value || value.length !== 6) return value
  const hour = value.substring(0, 2)
  const minute = value.substring(2, 4)
  const second = value.substring(4, 6)
  return `${hour}:${minute}:${second}`
}

const formatNumber = (value: string, curr_cd = 'KRW') => {
  if (value === null || value === undefined) return ''

  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return value

  // KRW인 경우만 소수점 제거
  const finalDecimals = curr_cd === 'KRW' ? 0 : 2

  const withDecimals = num.toFixed(finalDecimals)
  const [whole, decimal] = withDecimals.split('.')

  const formatted = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal ? `${formatted}.${decimal}` : formatted
}

const leftAlignFields = [
  'view_dv',
  'com_nm',
  'bank_nm',
  'acct_no',
  'curr_cd',
  'acct_nick_nm',
  'trmn_yn',
  'acct_dv',
  'stock_nm',
  'note1',
  'in_out_dv'
]

const centerAlignFields = [
  'reg_dt',
  'open_dt',
  'due_dt',
  'trmn_dt',
  'acct_bal_upd_dtm',
  'mnth_pay_dt',
  'trsc_dt'
]

const decimalFields = ['intr_rate', 'loan_rate', 'return_rate']

const currencyFields = [
  'acct_bal_amt',
  'acct_bal_won',
  'real_amt',
  'cntrct_amt',
  'mnth_pay_amt',
  'prchs_price',
  'prchs_amt',
  'tot_prchs_amt',
  'curr_amt',
  'valu_gain_loss',
  'appr_amt',
  'tot_appr_amt',
  'trsc_amt',
  'trsc_bal',
  'loan_trsc_amt',
  'fee_amt',
  'pres_amt',
  'deposit_foreign',
  'purchase_amt_foreign',
  'evaluation_amt_foreign',
  'tot_asset_amt',
  'deposit_amt'
]
export {
  formatDate,
  formatTime,
  formatNumber,
  leftAlignFields,
  centerAlignFields,
  decimalFields,
  currencyFields
}
