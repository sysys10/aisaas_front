import { useState } from 'react'
import { VocModal } from '@components/layout/Topbar/Voc/VocModal'
import { ActionButtons } from './ActionButtons'
import { InfoPopover } from './InfoPopover'
import { SqlDebugInfo } from './SqlDebugInfo'
import { CsvExporter } from './CsvExporter'
import { SearchSubmitType } from '@types'
interface AIResponseFooterProps {
  utterance?: string
  sqlQuery?: string
  sessionId?: string
  chainId?: string
  dateInfo?: string[]
  table_data?: Record<string, any>[]
  has_next?: boolean
  handleSearchSubmit: SearchSubmitType
}

function AIResponseFooter({
  utterance,
  sqlQuery,
  sessionId,
  chainId,
  handleSearchSubmit, 
  dateInfo,
  table_data,
  has_next
}: AIResponseFooterProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [likeActive, setLikeActive] = useState(false)
  const [dislikeActive, setDislikeActive] = useState(false)

  const handleDownloadCSV = () => {
    const exporter = new CsvExporter(utterance, table_data);
    exporter.exportCsv();
  }

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true)
  }
  
  const handleCloseReportModal = () => {
    setIsReportModalOpen(false)
  }

  const handleLikeClick = () => {
    if (dislikeActive) {
      setDislikeActive(false)
    }
    setLikeActive(!likeActive)
  }

  const handleDislikeClick = () => {
    if (likeActive) {
      setLikeActive(false)
    }
    setDislikeActive(!dislikeActive)
  }

  return (
    <>
      <VocModal
        isOpen={isReportModalOpen}
        handleClose={handleCloseReportModal}
        isDefault={false}
        chainId={chainId}
        sessionId={sessionId}
        utterance={utterance}
      />
      <div className='flex flex-col justify-between items-end'>
        {has_next && (
          <button className='bg-blue-500 text-white px-3 py-1 rounded-md' onClick={()=>handleSearchSubmit({utterance: 'next_page', session_id: sessionId})}>계속하기</button>
        )}
        <div className='flex justify-between px-1'>
          <InfoPopover dateInfo={dateInfo} />
          <ActionButtons
            handleDownloadCSV={handleDownloadCSV}
            handleLikeClick={handleLikeClick}
            handleDislikeClick={handleDislikeClick}
            handleOpenReportModal={handleOpenReportModal}
            likeActive={likeActive}
            dislikeActive={dislikeActive}
          />
        </div>
        <SqlDebugInfo 
          sqlQuery={sqlQuery}
          sessionId={sessionId}
          chainId={chainId}
        />
      </div>
    </>
  )
}

export { AIResponseFooter }