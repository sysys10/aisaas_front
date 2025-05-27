// components/answers/aiResponse/footer/ActionButtons.tsx
import CustomIcons from '@components/common/CustomIcons'
import { SearchSubmitType } from '@types'
interface ActionButtonsProps {
  handleDownloadCSV: () => void
  handleLikeClick: () => void
  handleSearchSubmit: SearchSubmitType
  handleDislikeClick: () => void
  handleOpenReportModal: () => void
  sessionId: string
  likeActive: boolean
  dislikeActive: boolean
  has_next?: boolean
}

export const ActionButtons = ({
  handleDownloadCSV,  
  handleSearchSubmit,
  handleLikeClick,
  handleDislikeClick,
  handleOpenReportModal,
  likeActive,
  sessionId,
  dislikeActive,
  has_next
}: ActionButtonsProps) => {
  return (
    <div className='flex items-center gap-x-4'>
      {has_next && (
        <div className='px-3 text-base text-gray-500' onClick={()=>handleSearchSubmit({
          utterance: 'next_page',
          session_id: sessionId
          })}>계속하기</div>
      )}
      <CustomIcons
        name='csvDownload'
        iconClassName='w-5 h-5 text-gray-100'
        onClick={handleDownloadCSV}
      />
      <CustomIcons
        name='like'
        onClick={handleLikeClick}
        fill={`${likeActive ? 'text-blue-500 fill-current' : 'text-gray-100'}`}
      />
      <CustomIcons
        name='bad'
        onClick={handleDislikeClick}
        fill={`${dislikeActive ? 'text-red-500 fill-current' : 'text-gray-100'}`}
      />
      <CustomIcons
        onClick={handleOpenReportModal}
        name='alert'
        description='답변신고'
        tooltipWidth='w-20'
      />
    </div>
  );
};