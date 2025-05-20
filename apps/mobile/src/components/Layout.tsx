import { Outlet } from 'react-router-dom'

import { TopNav } from './TopNav'

const Layout = () => {
  return (
    <div
      className='flex h-screen overflow-y-auto flex-col'
      style={{ scrollbarWidth: 'none' }}
    >
      <TopNav />
      <main className='flex-1 max-w-5xl mx-auto w-full'>
        <Outlet />
      </main>
    </div>
  )
}
export { Layout }
