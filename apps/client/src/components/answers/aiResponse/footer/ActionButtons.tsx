// components/answers/aiResponse/footer/ActionButtons.tsx
import CustomIcons from '@components/common/CustomIcons'

interface ActionButtonsProps {
  handleDownloadCSV: () => void
  handleLikeClick: () => void
  handleDislikeClick: () => void
  handleOpenReportModal: () => void
  likeActive: boolean
  dislikeActive: boolean
}

export const ActionButtons = ({
  handleDownloadCSV,
  handleLikeClick,
  handleDislikeClick,
  handleOpenReportModal,
  likeActive,
  dislikeActive
}: ActionButtonsProps) => {
  return (
    <div className='flex items-center gap-x-4'>
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