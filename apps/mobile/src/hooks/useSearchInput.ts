import { useEffect, useState } from 'react'

type useSearchProps = {
  ref: React.RefObject<HTMLInputElement>
}

/**
 * 검색 관련 상태 관리 훅
 * @param ref - 검색 입력 요소의 ref
 * @returns 검색 문자열, 검색 상태, 검색 초기화 함수, 검색 함수
 */
const useSearchInput = ({ ref }: useSearchProps) => {
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (value: string) => {
    setSearch(value)
    setIsSearching(true)
  }
  const handleClear = () => {
    setSearch('')
    setIsSearching(false)
  }
  // 문자열이 1 이상이거나, 현재 focus 되어있는 상태이면.
  useEffect(() => {
    if (document.activeElement === ref.current || search.length > 0)
      setIsSearching(true)
    else setIsSearching(false)
  }, [ref.current?.click, search])

  useEffect(() => {
    document.addEventListener('mousedown', clickSearchOutside)

    return () => {
      document.removeEventListener('mousedown', clickSearchOutside)
    }
  }, [])

  const clickSearchOutside = (event: MouseEvent) => {
    if (ref.current?.contains(event.target as Node)) {
      setIsSearching(true)
    } else setIsSearching(false)
  }

  return {
    search,
    isSearching,
    handleSearch,
    handleClear
  }
}

export default useSearchInput
