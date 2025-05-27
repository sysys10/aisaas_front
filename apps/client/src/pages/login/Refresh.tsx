import { useEffect } from 'react'

import {  useRefreshMutation } from '@hooks/query'
import { useNavigate } from 'react-router-dom'

export default function LoginRefreshPage() {
  const navigate = useNavigate()
  const {mutate: refresh} = useRefreshMutation(()=>navigate('/'))
  useEffect(() => {
    refresh()
 
  }, [])

  return (
    <main className='h-screen flex items-center justify-center bg-background'>
      
    </main>
  )
}
