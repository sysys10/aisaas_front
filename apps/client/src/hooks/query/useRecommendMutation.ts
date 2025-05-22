import { recommendQuestionApi } from '@apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RecommendProps } from '@types'

export function useRecommendMutation({
  setRecommendQuestions
}: {
  setRecommendQuestions: (questions: RecommendProps[]) => void
}) {
  const queryClient = useQueryClient()

  return useMutation<any, void>({
    mutationFn: recommendQuestionApi,
    mutationKey: ['recommendQuestions'],
    onSuccess: (data) => {
      if (data.success) {
        const recData = data.body.rec.map((item: any) => ({
          ...item,
          recommendquest: item.recommendquest ? item.recommendquest.split('|') : []
        }));
        setRecommendQuestions(recData);
        queryClient.setQueryData(['recommendQuestions'], {
          ...data,
          body: {
            ...data.body,
            rec: recData
          }
        });
      }
    }
  })
}
