import { useAdmin, useRecentQuestions, useSearchHook } from '@hooks'
import { useUserStore } from '@stores'
import { useEffect } from 'react'

import FreeBuyScreen from '@components/layout/FreeScreen'
import Sidebar from '@components/layout/LeftSidebar'
import Topbar from '@components/layout/Topbar'
import AdminScreen from '@components/main/AdminScreen'
import { MainContent } from '@components/main/MainContent'

export default function HomePage() {
  const { user, isBlocked } = useUserStore()

  const { handleGetRecentQuestion, handleRemoveRecentQuestion } =
    useRecentQuestions()

  const {
    handleSearchSubmit,
    handleResetResults,
    recommend,
    searchIsSuccess,
    ...rest
  } = useSearchHook({
    handleGetRecentQuestion
  })

  useEffect(() => {
    if (!user || !user.userId) {
      window.location.href = '/pc/login'
    }
  }, [user])

  const { handleToggleAdmin, adminUrl, handleCloseAdmin } =
    useAdmin(handleResetResults)

  return (
    <div className='flex h-screen text-primary'>
      <Sidebar
        {...{
          handleGetRecentQuestion,
          handleRemoveRecentQuestion,
          handleToggleAdmin,
          handleCloseAdmin,
          user: user!,
          handleSearchSubmit
        }}
      />
      <div className='flex max-h-screen overflow-hidden flex-1 flex-col duration-300'>
        <Topbar
          {...{
            handleToggleAdmin,
            handleSearchSubmit
          }}
        />
        <main className='w-full h-full pt-[var(--topbar-height)]'>
          {adminUrl  ? (
            <AdminScreen {...{ adminUrl, handleCloseAdmin }} />
          ) : isBlocked ? (
            <FreeBuyScreen />
          ) : (
            <MainContent
              {...{ searchIsSuccess, handleSearchSubmit, recommend, ...rest }}
            />
          )}
        </main>
      </div>
    </div>
  )
}
