import CustomIcons from '@components/common/CustomIcons'

import { AlarmType } from '@types'

export default function FdsItem(
  {
    alarm,
    onClick,
    onDeleteClick
  }: {
    alarm: AlarmType
    onClick: () => void
    onDeleteClick: () => void
  }
) {
  const isReadFds = alarm.useReadYn === 'N' ? false : true;
  return (
    <div
      onClick={onClick}
      key={`key-${alarm.pushNotificationHistorySeq}`}
      className={`rounded-md shadow-sm border ${isReadFds ? 'bg-[#F5F5F5]' : 'bg-white'
        }`}
    >
      <div className='p-2'>
        <div className='flex items-center justify-between p-2'>
          <div className={`flex items-center ${!isReadFds && 'gap-2'}`}>
            {!isReadFds && (
              <CustomIcons name="fdsNew" className='w-4 h-4' />
            )}
            <span className='w-35 text-gray-900 text-[15.125px] overflow-hidden text-ellipsis'>{alarm.bodyText3}</span>
          </div>
          <span className='text-xs font-thin text-[#4B5563] leading-4 tracking-tight'>
            {alarm.pushNotificationSendDate}
          </span>
        </div>
        <div className={`space-x-1 ${isReadFds && 'bg-[#F5F5F5]'} rounded-md flex gap-1 justify-between`}>
          <div className='p-4 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.10)] w-full '>
            <div className='flex flex-col text-left rounded-md gap-[5px] text-sm'>
              <span>{alarm.bodyText1}</span>
              <span>
                {alarm.bodyText2.startsWith('-') ? '출금' : '입금'}{' '}
                {alarm.bodyText2}
              </span>
              <div className='text-xs font-thin tracking-tight text-gray-400'>
                {alarm.bodyText4}
              </div>
            </div>
          </div>
          {/* <div className='flex flex-col items-center justify-between px-3 py-4 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.10)] text-gray-600 cursor-pointer min-w-[84px]  hover:text-white' onClick={() => onDeleteClick()}>
            <div className='text-sm max-w-20 text-center text-[#111827]  hover:bg-gray-300 hover:text-white'>
              {alarm.bodyTitle.replace('발생', '')}
            </div>
            <CustomIcons name='trash' iconClassName='w-4 h-4' className='w-4 h-4' />
          </div> */}
          <div className='flex flex-col items-center justify-between px-3 py-4 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.10)] text-gray-600 cursor-pointer min-w-[84px] hover:bg-gray-300 hover:text-white' onClick={() => onDeleteClick()}>
            <div className='text-sm font-medium max-w-20 whitespace-normal hover:text-white'>
              {alarm.bodyTitle.replace('발생', '')}
            </div>
            <CustomIcons name='trash' iconClassName='w-4 h-4' className='w-4 h-4' />
          </div>
        </div>
      </div>
    </div>
  )
}
