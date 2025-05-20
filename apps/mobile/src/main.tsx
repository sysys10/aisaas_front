import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@apis/queryClient'

import '@packages/styles/globals.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename='/webapp'>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
