type UserInfo = {
  userId: string
  companyId: string
}

type LoginRequest = UserInfo & {
  password: string
}

export type { LoginRequest }
