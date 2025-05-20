import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AnswerSection } from '@components/answers/AnswerSection'

import useSearchResult from '@hooks/useSearchResult'

export default function MobileView() {
  const { utterance } = useParams()
  useEffect(() => {
    if (utterance) {
      handleSearchSubmit(utterance)
    }
  }, [utterance])

  const { results, handleSearchSubmit, searchIsLoading } = useSearchResult()

  window.handleMobileSearch = (utterance: string) => {
    handleSearchSubmit(utterance)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex max-h-screen flex-1 flex-col pt-16'>
        <AnswerSection results={results} searchIsLoading={searchIsLoading} />
      </div>
    </div>
  )
}
