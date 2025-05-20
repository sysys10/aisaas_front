import { useEffect } from 'react'
import { useRef } from 'react'

export default function useClipboardEvent(
  handleSearch: (text: string) => void
) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleCopy = async () => {
      try {
        const selectedText = await window.navigator.clipboard.readText()
        if (selectedText) {
          handleSearch(selectedText)
        }
        inputRef.current?.focus()
      } catch (error) {
        console.error('클립보드 접근 오류:', error)
      }
    }

    window.addEventListener('copy', handleCopy)
    return () => {
      window.removeEventListener('copy', handleCopy)
    }
  }, [handleSearch])

  return inputRef
}
