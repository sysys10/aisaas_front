interface ReportItemProps {
  item: {
    title: string
    subTitle: string
  }
  isActive: boolean
  onSelect: (title: string) => void
}

export function ReportItem({ item, isActive, onSelect }: ReportItemProps) {
  return (
    <div
      onClick={() => {
        onSelect(item.title);
      }}
      className={`flex group hover:bg-background-secondary transition-colors duration-300 cursor-pointer relative items-center justify-between rounded-lg ${
        isActive ? 'bg-background-secondary' : ''
      }`}
    >
      <div className='flex flex-col flex-1 pl-3 py-2.5'>
        <div className='text-sm font-medium'>{item.title}</div>
        <div className='text-[#767676] text-xs'>{item.subTitle}</div>
      </div>
    </div>
  )
}
