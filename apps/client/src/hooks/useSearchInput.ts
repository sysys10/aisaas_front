import { useCallback, useMemo, useState } from 'react'

/**
 * 검색 관련 상태 관리 훅 (최적화 버전)
 * @param ref - 검색 입력 요소의 ref
 * @returns 검색 문자열, 검색 상태, 검색 초기화 함수, 검색 함수
 */
const useSearchInput = () => {
  const [search, setSearch] = useState('')

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const returnValue = useMemo(
    () => ({
      search,
      handleSearch
    }),
    [search, handleSearch]
  )

  return returnValue
}

export { useSearchInput }
