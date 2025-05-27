import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePageSkeleton from '@pages/home/HomePageSkeleton'

const HomePage = lazy(() => import('@pages/home/Home'))
const LoginPage = lazy(() => import('@pages/login/Login'))
const NotFoundPage = lazy(() => import('@pages/othors/NotFound'))
const LoginRefreshPage = lazy(() => import('@pages/login/Refresh'))
const LogoutRedirectPage = lazy(() => import('@pages/othors/Redirect'))

function App() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/login/refresh' element={<LoginRefreshPage />} />
        <Route path='/logout/redirect' element={<LogoutRedirectPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
