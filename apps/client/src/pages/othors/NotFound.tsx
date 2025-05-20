import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className='flex h-screen w-full items-center justify-center bg-background-primary'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl'>
            Something's missing.
          </p>
          <p className='mb-4 text-lg font-light text-secondary'>
            일치하는 경로가 존재하지 않습니다.
          </p>
          <Link
            to='/'
            className='my-4 inline-flex rounded-lg bg-aicfo px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary'
          >
            돌아가기
          </Link>
        </div>
      </div>
    </section>
  )
}
