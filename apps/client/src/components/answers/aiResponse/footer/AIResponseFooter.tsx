import { useState } from 'react'
import { VocModal } from '@components/layout/Topbar/Voc/VocModal'
import { ActionButtons } from './ActionButtons'
import { InfoPopover } from './InfoPopover'
import { SqlDebugInfo } from './SqlDebugInfo'
import { CsvExporter } from './CsvExporter'
interface AIResponseFooterProps {
  utterance?: string
  sqlQuery?: string
  sessionId?: string
  chainId?: string
  dateInfo?: string[]
  table_data?: Record<string, any>[]
}

function AIResponseFooter({
  utterance,
  sqlQuery,
  sessionId,
  chainId,
  dateInfo,
  table_data,
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
      <div className='flex flex-col justify-between'>
        
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