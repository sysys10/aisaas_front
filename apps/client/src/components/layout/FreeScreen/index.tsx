import { useAdminToken } from '@hooks'
import { useAdminTokenStore } from '@stores/adminTokenStore';
import useRefreshMutation from '@hooks/query/useRefreshMutation'
import React, { useEffect } from 'react'

const FreeBuyScreen = () => {
  const { getAdminToken } = useAdminToken();
  const { adminToken } = useAdminTokenStore()
  const { mutate: refresh } = useRefreshMutation();
  useEffect(() => {
    getAdminToken()

    // 정기결제 후, 결제 성공 여부를 확인하기 위한 postMessage 수신 이벤트
    // TODO: Url origin
    const handleMessage = (e: MessageEvent) => {
      let data = null;
      console.log('원본 데이터:', e.data);
      // if(e.origin !== 'https://aicfoadm-dev.appplay.co.kr') console.log('origin error: ', e.origin)
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
      <iframe className='w-full h-full scale-125' src={`${adminToken}`} />
    </div>
  )
}

export default FreeBuyScreen
