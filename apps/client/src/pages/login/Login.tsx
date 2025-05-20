import Logo from '@assets/AICFO_LOGO.png'
import Cube from '@assets/icons/AICFO_CUBE_LOGO.png'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'

import { useLogin } from '@hooks/index'

import { useUserStore } from '@stores/index'

import LoginInput from './components/LoginInput'

export default function LoginPage() {
  const navigate = useNavigate()
  const user = useUserStore((s) => s.user)
  const { handleLogin, error } = useLogin()
  useEffect(() => {
    if (user?.userId) {
      navigate('/')
    }
  }, [user, navigate])

  const [loginInput, setLoginInput] = useState({
    userId: '',
    password: ''
  })

  // 유효성 검사 상태 관리
  const [validationErrors, setValidationErrors] = useState({
    userId: '',
    password: ''
  })

  // 이메일 형식 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 비밀번호 형식 검사 (영문, 숫자, 특수문자 조합 8자리 이상)
  const validatePassword = (password: string) => {
    // 영문, 숫자, 특수문자 포함 8자리 이상 검사
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return passwordRegex.test(password)
  }

  // 아이디(이메일) 입력 변경 핸들러
  const handleUserIdChange = (value: string) => {
    setLoginInput({ ...loginInput, userId: value })

    if (!value) {
      setValidationErrors({ ...validationErrors, userId: '' })
    } else if (!validateEmail(value)) {
      setValidationErrors({
        ...validationErrors,
        userId: '이메일 형식으로 입력해주세요.'
      })
    } else {
      setValidationErrors({ ...validationErrors, userId: '' })
    }
  }

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (value: string) => {
    setLoginInput({ ...loginInput, password: value })

    if (!value) {
      setValidationErrors({ ...validationErrors, password: '' })
    } else if (!validatePassword(value)) {
      setValidationErrors({
        ...validationErrors,
        password: '영문, 숫자, 특수문자 조합의 8자리 이상 입력해주세요.'
      })
    } else {
      setValidationErrors({ ...validationErrors, password: '' })
    }
  }

  // 폼 제출 전 유효성 검사
  const validateForm = () => {
    const isUserIdValid = validateEmail(loginInput.userId)
    const isPasswordValid = validatePassword(loginInput.password)

    setValidationErrors({
      userId: isUserIdValid ? '' : '이메일 형식으로 입력해주세요.',
      password: isPasswordValid
        ? ''
        : '영문, 숫자, 특수문자 조합의 8자리 이상 입력해주세요.'
    })

    return isUserIdValid && isPasswordValid
  }

  const onSubmit = (data: { userId: string; password: string }) => {
    if (validateForm()) {
      handleLogin(data)
    }
  }

  const isProduction = import.meta.env.VITE_DAQUV_ENV === 'production'
  const currentUrl = isProduction ? 'https://admin.webcashaicfo.com' : 'https://aicfoadm-dev.appplay.co.kr';

  return (
    <div className='bg-background flex min-h-screen text-base items-center justify-center px-4'>
      <div className='w-full flex flex-col items-center justify-center'>
        <Link
          tabIndex={-1}
          to='https://www.webcashaicfo.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='flex justify-center items-center gap-6 pb-8 cursor-pointer'
        >
          <img src={Cube} alt='cube logo' loading='lazy' className='w-8 h-8' />
          <img src={Logo} alt='logo' loading='lazy' className='w-40' />
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(loginInput)
          }}
          autoComplete='on'
          className='w-full max-w-md'
        >
          <div className='space-y-2'>
            <LoginInput
              id='id'
              placeholder='아이디'
              value={loginInput.userId}
              onChange={(e) => handleUserIdChange(e.target.value)}
              type='email'
              autoComplete='email'
              icon={<CustomIcons name='user_outlined' className='w-4 h-4' />}
              setValue={handleUserIdChange}
            />
            {validationErrors.userId && (
              <div className='items-center text-sm px-2 text-red-500'>
                {validationErrors.userId}
              </div>
            )}
            <LoginInput
              id='password'
              placeholder='비밀번호'
              value={loginInput.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              icon={<CustomIcons name='lock' className='w-4 h-4' />}
              type='password'
              setValue={handlePasswordChange}
            />
            {validationErrors.password && (
              <div className='items-center text-sm px-2 text-red-500'>
                {validationErrors.password}
              </div>
            )}
            {error && (
              <div className='items-center text-sm px-2 text-red-500'>
                {error.message}
              </div>
            )}
          </div>

          <div className='flex justify-between mt-3 text-sm text-gray-500'>
            <a
              target='_blank'
              className='px-2 text-primary'
              href={`${currentUrl}/acfo_adm_subscrpn_display.act`}
            >
              회원가입
            </a>
            <div className='flex divide-x-[0.5px] divide-gray-400'>
              <a
                target='_blank'
                className='px-2'
                href={`${currentUrl}/acfo_adm_0001_02.act`}
              >
                아이디 찾기
              </a>
              <a
                target='_blank'
                className='px-2'
                href={`${currentUrl}/acfo_adm_0001_04.act`}
              >
                비밀번호 찾기
              </a>
            </div>
          </div>
          <button
            type='submit'
            className={`flex ${loginInput.userId &&
                loginInput.password &&
                !validationErrors.userId &&
                !validationErrors.password
                ? 'bg-aicfo text-white'
                : 'bg-background-disabled text-white/50'
              } w-full items-center justify-center gap-2 rounded-lg p-4 mt-8 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <span>로그인</span>
          </button>
        </form>
      </div>
    </div>
  )
}
