import CustomIcons from "@components/common/CustomIcons";

const FeedbackButtons = ({ handleLikeClick, handleDislikeClick, likeActive, dislikeActive }: { handleLikeClick: () => void, handleDislikeClick: () => void, likeActive: boolean, dislikeActive: boolean }) => (
  <>
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
  </>
);

export default FeedbackButtons;