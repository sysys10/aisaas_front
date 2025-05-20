import { recentQuestionStore } from '@stores'

import CustomIcons from '@components/common/CustomIcons'

import { RecentQuestionListProps } from '@types'

import TimeTag from './TimeTag'

export function RecentQuestionList({
  handleSearchSubmit,
  handleRemoveRecentQuestion,
  handleAllRecentQuestionRemove
}: RecentQuestionListProps) {
  const recentQuestions = recentQuestionStore((s) => s.recentQuestions)

  return (
    <>
      <div className='w-full px-3'>
        <div className='flex px-3 py-2 shrink-0 bg-background-secondary items-center justify-between rounded-lg tracking-tight text-sm text-aicfo w-full'>
          최근 질문
          <button
            className='bg-white text-gray-500 border border-gray-500 text-[0.65rem] px-2  rounded-full'
            onClick={handleAllRecentQuestionRemove}
          >
            전체 삭제
          </button>
        </div>
      </div>
      <div
        style={{ scrollbarWidth: 'none', flex: '1 1 0' }}
        className='relative px-1 overflow-y-auto w-full'
      >
        {recentQuestions.length > 0 ? (
          <>
            {recentQuestions.map((item, index) => (
              <div key={item.utteranceDate + index}>
                <TimeTag
                  prev={
                    recentQuestions[index - 1]?.utteranceDate || '2000-01-01'
                  }
                  current={item.utteranceDate}
                />
                <div className='flex group relative items-center justify-between rounded-lg hover:bg-background-secondary cursor-pointer'>
                  <p
                    onClick={() =>
                      handleSearchSubmit({
                        utterance: item.utterance
                      })
                    }
                    className='flex-1 pl-4 pr-4 py-2 tracking-tight leading-5 text-left text-sm h-full text-[var(--aicfo-text)] text-ellipsis overflow-hidden'
                  >
                    {item.utterance}
                  </p>
                  <CustomIcons
                    onClick={() => {
                      handleRemoveRecentQuestion({
                        utterance: item.utterance,
                        intentCd: item.intentCd,
                        utteranceDate: item.utteranceDate
                      })
                    }}
                    className='text-lg absolute right-0 text-gray-400 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2'
                    name='trash'
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='flex justify-center mt-10 items-center h-full'>
            <div className='text-gray-400'>최근 질문이 없습니다.</div>
          </div>
        )}
      </div>
    </>
  )
}
