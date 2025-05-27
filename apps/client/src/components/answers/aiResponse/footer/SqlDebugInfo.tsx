import { Link } from 'react-router-dom'
import { Accordion } from '@packages/components'

interface SqlDebugInfoProps {
  sqlQuery?: string
  sessionId?: string
  chainId?: string
}

export const SqlDebugInfo = ({ sqlQuery, sessionId, chainId }: SqlDebugInfoProps) => {
  const isProduction = import.meta.env.VITE_DAQUV_ENV === 'production'
  
  if (isProduction) return null;
  
  return (
    <div className='flex flex-col pb-2 ml-3 gap-y-2 mt-2'>
      {sqlQuery ? (
        <Accordion
          items={[
            {
              title: 'SQL Query',
              content: (
                <div>
                  {sqlQuery ? (
                    <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
                      <code>{sqlQuery}</code>
                    </pre>
                  ) : (
                    <p>SQL Query가 없습니다.</p>
                  )}
                </div>
              )
            }
          ]}
        />
      ) : (
        <p>SQL Query가 없습니다.</p>
      )}
    </div>
  );
};