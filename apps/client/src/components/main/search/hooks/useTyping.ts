import { MAIN_SEARCHBAR_CONSTANTS } from '@constants'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useRotatingPlaceholder(isFocused: boolean) {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const placeholderTimeoutRef = useRef<number>(0)

  const startRotation = useCallback(() => {
    if (placeholderTimeoutRef.current) {
      window.clearTimeout(placeholderTimeoutRef.current)
    }

    placeholderTimeoutRef.current = window.setTimeout(() => {
      setCurrentPlaceholderIndex(
        (prev) => (prev + 1) % MAIN_SEARCHBAR_CONSTANTS.length
      )
    }, 5000)
  }, [])

  const clearRotation = useCallback(() => {
    if (placeholderTimeoutRef.current) {
      window.clearTimeout(placeholderTimeoutRef.current)
      placeholderTimeoutRef.current = 0
    }
  }, [])

  useEffect(() => {
    if (!isFocused) {
      startRotation()
    } else {
      clearRotation()
    }

    return clearRotation
  }, [isFocused, currentPlaceholderIndex, startRotation, clearRotation])

  useEffect(() => {
    return clearRotation
  }, [clearRotation])

  return {
    currentPlaceholder: MAIN_SEARCHBAR_CONSTANTS[currentPlaceholderIndex],
    currentPlaceholderIndex
  }
}
