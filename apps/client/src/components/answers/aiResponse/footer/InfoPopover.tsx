import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Popover } from '@packages/components'

interface InfoPopoverProps {
  dateInfo?: string[]
}

export const InfoPopover = ({ dateInfo }: InfoPopoverProps) => {
  if (!dateInfo) return null;
  
  return (
    <Popover
      trigger={
        <ExclamationCircleIcon className='w-6 h-6 cursor-pointer text-gray-500' />
      }
      className='border-[#767676] border rounded-lg'
    >
      <div className='flex flex-col gap-y-2 w-80'>
        <h2 className='text-lg font-semibold text-[#0F0F0F]'>
          출처 정보
        </h2>
        <div className='flex flex-col gap-y-2 text-disabled'>
          {dateInfo?.length ? (
            <>
              조회 기준 시점{' '}
              {dateInfo[0]?.replace(
                /(\d{4})(\d{2})(\d{2})/,
                '$1-$2-$3'
              )}{' '}
              ~{' '}
              {dateInfo[1]?.replace(
                /(\d{4})(\d{2})(\d{2})/,
                '$1-$2-$3'
              )}
            </>
          ) : (
            <p>조회 기준 시점이 없습니다.</p>
          )}
        </div>
      </div>
    </Popover>
  );
};