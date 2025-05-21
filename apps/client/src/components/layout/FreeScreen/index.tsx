
import useRefreshMutation from '@hooks/query/useRefreshMutation'
import React, { useEffect } from 'react'

const FreeBuyScreen = () => {
  const { mutate: refresh } = useRefreshMutation();
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      let data = null;
      console.log('원본 데이터:', e.data);
      try {
        data = JSON.parse(e.data);
        if (data?.isSuccess === true) {
          console.log('data type: ', typeof data);
          console.log('정기 결제 성공: ', data);
          refresh()
        } else {
          console.log('정기 결제 실패: ', e);
        }
      } catch (typeError: unknown) {
        console.log(String(typeError));
      }
    };

    window.addEventListener('message', (e) => {
      handleMessage(e)
    });
    return () => {
      window.removeEventListener('message', (e) => {
        handleMessage(e)
      });
    }
  }, [])

  return (
    <div className='w-full h-full pt-20'>
      <iframe className='w-full h-full scale-125' src={`https://aibranch-dev.aiwebcash.co.kr/adm/usst_main_01.act`} />
    </div>
  )
}

export default FreeBuyScreen
