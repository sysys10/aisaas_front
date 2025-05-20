import { useEffect, useRef, useState } from 'react'

export function useVirtualPagination<T>(data: T[], pageSize: number = 10) {
  const [pageIndex, setPageIndex] = useState(0)
  const lastRowRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && (pageIndex + 1) * pageSize < data.length) {
          setPageIndex((prev) => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    const currentLastRow = lastRowRef.current
    if (currentLastRow) {
      observer.observe(currentLastRow)
    }

    return () => {
      if (currentLastRow) {
        observer.unobserve(currentLastRow)
      }
    }
  }, [pageIndex, data.length, pageSize])

  const slicedData = data.slice(0, (pageIndex + 1) * pageSize)
  const hasNextPage = (pageIndex + 1) * pageSize < data.length

  return { slicedData, hasNextPage, lastRowRef, pageIndex }
}
