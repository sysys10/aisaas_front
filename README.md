AICFO<br/>
<br/>
보고서 생성: 자금일보, 자금주보, 자금월보, 일일시재마감 등의 보고서를 생성합니다.<br/>
FDS(Fraud Detection System): 이상 거래 알림 기능을 제공합니다.<br/>
최근 질문 관리: 이전에 했던 질문을 쉽게 불러올 수 있습니다.<br/>
회사 계정 전환: 여러 회사 계정을 손쉽게 전환할 수 있습니다.<br/>
<br/>
기술 스택<br/>

프레임워크: React 18 + TypeScript + Vite<br/>
상태 관리: Zustand<br/>
데이터 페칭: TanStack Query (React Query)<br/>
스타일링: TailwindCSS<br/>
API 통신: Axios<br/>
패키지 관리: Pnpm Workspace (Monorepo)<br/>
라우팅: React Router<br/>
<br/>
프로젝트 구조<br/>
복사apps/<br/>
  └── client/               # 웹 클라이언트 애플리케이션 <br/>
  └── mobile/               # 모바일 웹 뷰 클라이언트 애플리케이션<br/>
  <br/>
packages/<br/>
  ├── apis/                 # API 클라이언트 패키지<br/>
  ├── components/           # 공통 컴포넌트 패키지<br/>
  ├── eslint-config/        # ESLint 설정 패키지<br/>
  ├── styles/               # 공통 스타일 패키지<br/>
  └── ts-config/            # TypeScript 설정 패키지<br/>
개발 환경 설정<br/>
사전 요구사항<br/>
<br/>
Node.js 16 이상<br/>
Yarn<br/>
<br/>
설치 및 실행<br/>
bash복사# 의존성 설치<br/>
pnpm install<br/>
<br/>
# 개발 서버 실행<br/>
pnpm run dev --port 5173<br/>

# 빌드<br/>
pnpm run build<br/>

# 배포 전 미리보기<br/>
pnpm preview<br/>
주요 디렉토리 구조<br/>
복사src/<br/>
  ├── assets/               # 이미지, 아이콘 등 정적 리소스<br/>
  ├── components/           # 리액트 컴포넌트<br/>
  │   ├── answers/          # 답변 UI 관련 컴포넌트<br/>
  │   ├── common/           # 공통 컴포넌트<br/>
  │   ├── layout/           # 레이아웃 컴포넌트<br/>
  │   ├── main/             # 메인 화면 컴포넌트<br/>
  │   └── ui/               # UI 기본 요소 컴포넌트<br/>
  ├── constants/            # 상수 정의<br/>
  ├── hooks/                # 커스텀 훅<br/>
  │   └── query/            # API 관련 훅<br/>
  ├── pages/                # 페이지 컴포넌트<br/>
  ├── stores/               # Zustand 스토어<br/>
  ├── types/                # 타입 정의<br/>
  └── utils/                # 유틸리티 함수<br/>
주요 컴포넌트<br/>
<br/>
MainContent: 메인 화면의 컨텐츠 영역을 관리합니다.<br/>
SearchSection: 검색 기능을 담당합니다.<br/>
AnswerSection: AI 답변을 표시합니다.<br/>
LeftSidebar: 사이드바 UI를 관리합니다.<br/>
Topbar: 상단 네비게이션 바를 관리합니다.<br/>
<br/>
주요 훅<br/>
<br/>
useSearchHook: 검색 기능 로직을 관리합니다.<br/>
useRecentQuestions: 최근 질문 관련 로직을 관리합니다.<br/>
useReport: 보고서 관련 로직을 관리합니다.<br/>
useFds: FDS(이상거래) 관련 로직을 관리합니다.<br/>
useAlarm: 알림 관련 로직을 관리합니다.<br/>
<br/>
스토어<br/>
<br/>
userStore: 사용자 정보를 관리합니다.<br/>
companyStore: 회사 정보를 관리합니다.<br/>
sidebarStore: 사이드바 상태를 관리합니다.<br/>
recentQuestionStore, <br/>

<br/>
모바일 단 접속방법:
<br/>
로그인하는법: client 를 port 5173 으로 열고 로그인한다. -> 종료 -> mobile을 같은 포트로 로그인한다.
<br/>
* /webapp/  을 처음에 붙여야합니당 예시) localhost:5173/webapp/alarm/fds
<br/>



라이선스<br/>
이 프로젝트는 비공개 소프트웨어입니다.<br/>
