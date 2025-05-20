import { useState } from 'react'
import { useCallback } from 'react'

export function createResourceHook<TData, TParams>(options: {
  useMutation: (config: any) => {
    mutate: (params: TParams) => Promise<TData>
    isPending: boolean
    isSuccess: boolean
    reset: () => void
  }
  initialDataTransform?: (data: any) => TData
}) {
  return (customConfig?: any) => {
    const [data, setData] = useState<TData | undefined>(undefined)

    const { mutate, isPending, isSuccess, reset } = options.useMutation({
      ...customConfig,
      onSuccess: (result: any) => {
        if (result.success) {
          const transformedData = options.initialDataTransform
            ? options.initialDataTransform(result)
            : result.body
          setData(transformedData)
        }
        customConfig?.onSuccess?.(result)
      }
    })

    const handleFetch = useCallback(
      (params: TParams) => {
        return mutate(params)
      },
      [mutate]
    )

    return {
      data,
      setData,
      fetch: handleFetch,
      isLoading: isPending,
      isSuccess,
      reset
    }
  }
}
