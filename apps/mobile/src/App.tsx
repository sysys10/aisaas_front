import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from '@components/Layout'

import InitialFailScreen from '@pages/InitialFail'
import InitialStartScreen from '@pages/InitialStart'
import AlarmDetail from '@pages/MobileView/Alarm/AlarmDetail'
import AlarmView from '@pages/MobileView/AlarmView'
import MobileView from '@pages/MobileView/MobileView'
import ReportView from '@pages/MobileView/ReportView'
import VocView from '@pages/MobileView/VocView'
import NotFound from '@pages/NotFound'

// import Test from '@pages/Test'

import useDeviceStore from '@stores/useDevice'

function App() {
  const setDevie = useDeviceStore((s) => s.setDevice)
  useEffect(() => {
    const getUserAgent = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      if (userAgent.indexOf('android') > -1) {
        return 'android'
      }
      if (
        userAgent.indexOf('iphone') > -1 ||
        userAgent.indexOf('ipad') > -1 ||
        userAgent.indexOf('ipod') > -1
      ) {
        return 'ios'
      }
      return 'other'
    }
    setDevie(getUserAgent())
  }, [])

  return (
    <Routes>
      {/* <Route path='/test' element={<Test />} /> */}
      <Route element={<Layout />}>
        <Route path='/mobile/:utterance' element={<MobileView />} />
        <Route path='/report' element={<VocView />} />
        <Route path='/report/:utterance' element={<VocView />} />
        <Route path='/alarm/:type' element={<AlarmView />} />
        <Route path='/alarm/:type/:seq' element={<AlarmDetail />} />
        <Route path='/alarm/report/:type' element={<ReportView />} />
        <Route path='/initial/start' element={<InitialStartScreen />} />
        <Route path='/initial/fail' element={<InitialFailScreen />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
