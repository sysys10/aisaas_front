import { deviceType } from '@/types'

type DaquvActions =
  | 'godismiss'
  | 'goreload'
  | 'gohome'
  | 'gobrflist'
  | 'gotts'
  | 'addbrf'
  | 'goqna'
  | 'logout'
  | 'addrecommend'
  | string

// iOS용 메시지 포맷
interface DaquvMessage {
  action: DaquvActions
  utterance?: string
  sessionId?: string
  chainId?: string
}

// iOS용 인터페이스
interface DaquvHandler {
  postMessage(message: DaquvMessage): void
}

// iOS Webkit 인터페이스
interface WebkitHandler {
  messageHandlers: {
    DaquvInterface: DaquvHandler
  }
}

interface AndroidDaquvInterface {
  postMessage(
    action: string,
    utterance?: string,
    sessionId?: string,
    chainId?: string
  ): void
}
declare global {
  interface Window {
    webkit?: WebkitHandler
    DaquvInterface?: AndroidDaquvInterface
    handleKeyboardHeight: (height: number) => void
    handleMobileSearch: (utterance: string) => void
    handleGetReccomendQuestions: () => string
    handleGetMngeYn: (YN: 'Y' | 'N') => void
    handleGetCertCnt: (count: string) => void
  }
}

const handleMobileActions = (
  device: deviceType,
  action: DaquvActions,
  utterance?: string,
  sessionId?: string,
  chainId?: string
) => {
  if (device === 'ios') {
    if (action === 'goqna') {
      window.webkit?.messageHandlers.DaquvInterface.postMessage({
        action,
        utterance,
        sessionId,
        chainId
      })
    } else if (utterance) {
      window.webkit?.messageHandlers.DaquvInterface.postMessage({
        action,
        utterance
      })
    } else {
      window.webkit?.messageHandlers.DaquvInterface.postMessage({
        action
      })
    }
  } else if (device === 'android') {
    if (action === 'goqna') {
      window.DaquvInterface?.postMessage(action, utterance, sessionId, chainId)
    } else if (utterance) {
      window.DaquvInterface?.postMessage(action, utterance)
    } else {
      window.DaquvInterface?.postMessage(action)
    }
  }
}

export default handleMobileActions
