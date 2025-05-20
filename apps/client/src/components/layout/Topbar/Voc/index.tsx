import { useUserStore } from '@stores'
import { useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { VocModal } from './VocModal'

export default function Voc() {
  const isBlocked = useUserStore((s) => s.isBlocked)
  const [isOpenVocModal, setIsOpenVocModal] = useState(false)
  const handleCloseVocModal = () => {
    setIsOpenVocModal(false)
  }

  const handleOpenVocModal = () => {
    if (isBlocked) {
      return
    }
    setIsOpenVocModal(true)
  }

  return (
    <>
      <VocModal
        isOpen={isOpenVocModal}
        handleClose={handleCloseVocModal}
        isDefault={true}
      />
      <CustomIcons
        onClick={handleOpenVocModal}
        name='headset'
        row={true}
        description='문의하기'
        className='border-x border-border px-4'
        iconClassName='cursor-pointer w-6 h-6'
      />
    </>
  )
}
