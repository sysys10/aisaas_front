import CustomIcons from '@components/common/CustomIcons'

import { AlarmType } from '@types'

export default function FdsItem({
  alarm,
  onClick,
  onDeleteClick
}: {
  alarm: AlarmType
  onClick: () => void
  onDeleteClick: () => void
}) {
  const isReadFds = alarm.useReadYn === 'N' ? false : true;
  return (
    <div
      onClick={onClick}
      key={alarm.pushNotificationHistorySeq}
      className={`rounded-md shadow-sm m-[4px_4px_9px_4px] border ${isReadFds && 'bg-[#F5F5F5]'}
        }`}
    >
      <div className='p-2'>
        <div className='flex items-center justify-between p-2'>
          <div className={`flex items-center text-ellipsis overflow-hidden ${!isReadFds && 'gap-2 pl-[2px] '}`}>
              {!isReadFds && (
                <CustomIcons name="fdsNew" iconClassName='w-4 h-4' />
              )}
            <span className='w-35 text-gray-900 text-sm overflow-hidden text-ellipsis'>{alarm.bodyText3}</span>
          </div>
          {/* </span> */}
          <span className='text-xs font-thin text-[#4B5563] leading-4 tracking-tight'>
            {alarm.pushNotificationSendDate}
          </span>
        </div>
        {/* <div className={`space-x-1 ${alarm.useReadYn === 'N' ? 'bg-white' : 'bg-[#F5F5F5]'} rounded-md p-2 flex justify-between`}> */}
        <div className={`space-x-1 ${isReadFds && 'bg-[#F5F5F5]'} rounded-md flex justify-between`}>
          <div className='p-4 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.10)]'>
            <div className='flex flex-col text-left rounded-md gap-[3px]'>
              <span className='text-[#7D7D7D] text-sm'>{alarm.bodyText1}</span>
              <span className='text-ellipsis'>{alarm.bodyText2.startsWith('-') ? "출금" : "입금"} {alarm.bodyText2}</span>
              <div className='text-xs font-thin tracking-tight text-gray-400'>
                {alarm.bodyText4}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between p-4 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.10)] text-gray-600 cursor-pointer min-w-[84px] hover:bg-gray-300 hover:text-white' onClick={() => onDeleteClick()}>
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
