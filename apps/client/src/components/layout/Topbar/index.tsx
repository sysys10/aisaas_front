import Logo from '@/assets/AICFO_LOGO.png'
import { useMemo } from 'react'

import { NavbarProps } from '@types'

import Alarm from './Alarm'
import Company from './Company'
import Voc from './Voc'

export default function Topbar({ ...props }: NavbarProps) {
  const { handleSearchSubmit, handleToggleAdmin } = props

  return useMemo(
    () => (
      <>
        <header className='fixed z-50 top-0 left-0 right-0 h-topbar-height shrink-0 md:flex'>
          <nav className='mx-auto flex h-full w-full items-center justify-between px-4'>
            <div className='hidden md:flex'>
              <div className='mb-2 hidden md:flex mt-2 absolute top-0 py-3 left-28'>
                <img
                  onClick={() => {
                    window.location.href = '/'
                  }}
                  src={Logo}
                  alt='logo'
                  className='cursor-pointer w-24'
                  loading='lazy'
                  width='96'
                  height='24'
                />
              </div>
            </div>
            <div></div>
            <div className='flex items-center gap-2 md:gap-4 px-4'>
              <Company />
              <Voc />
              <Alarm />
            </div>
          </nav>
        </header>
      </>
    ),
    [handleSearchSubmit, handleToggleAdmin]
  )
}
