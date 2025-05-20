import CustomIcons from '@components/common/CustomIcons'

import { AlarmType } from '@types'

export function AlarmItem({
  v,
  onClick
}: {
  v: AlarmType
  onClick: () => void
}) {
  return (
    <div
      style={{
        backgroundColor: `${v.useReadYn === 'Y' ? 'transparent' : 'rgba(79, 99, 210, 0.1)'}`
      }}
      onClick={() => {
        if (v.type === 'P0004') onClick()
      }}
      className='flex justify-between cursor-pointer w-full p-5 border-b border-border gap-x-3'
    >
      <CustomIcons
        name={v.type === 'P0004' ? 'headset' : 'brief'}
        className='bg-white w-10 h-10 p-2 border-border border rounded-full'
        badge={v.useReadYn === 'Y' ? false : true}
        iconClassName='w-full h-full'
      />
      <div className='flex-1 font-disabled'>
        <p className='text-sm'>{v.bodyText1}</p>
        <p className='text-xs font-normal'>{v.pushNotificationSendDate}</p>
      </div>
      <CustomIcons name='expandMore' iconClassName='w-5 h-5 -rotate-90' />
    </div>
  )
}
