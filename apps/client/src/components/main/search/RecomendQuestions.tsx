import { SearchSubmitType } from '@packages/apis/types'
import { Chip } from '@packages/components'

type RecommendQuestionsProps = {
  handleSearchSubmit: SearchSubmitType
  recommend: string[]
}

export function RecommendQuestions({
  recommend,
  handleSearchSubmit
}: RecommendQuestionsProps) {
  return (
    <div className='w-full'>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`flex justify-start overflow-x-scroll gap-2 transition-all duration-700 md:justify-center`}
      >
        {recommend.map((utterance, index) => (
          <Chip
            key={index}
            size='xs'
            variant='outlined'
            className='flex-shrink-0 text-background-disabled bg-background-primary cursor-pointer shadow-sm hover:bg-primary transition-colors duration-100 hover:text-background-primary text-sm text-[#767676]'
            onClick={() => handleSearchSubmit({ utterance })}
          >
            {utterance}
          </Chip>
        ))}
      </div>
    </div>
  )
}
