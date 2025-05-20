// 커스텀 SVG 아이콘
import Fds from '@assets/icons/AICFO_FDS.svg?react'
import Fds_White from '@assets/icons/AICFO_FDS_WHITE.svg?react'
import NewLogo from '@assets/icons/AICFO_NEW_LOGO.svg?react'
import RecentQuestion from '@assets/icons/AICFO_RECENT.svg?react'
import RecentQuestion_White from '@assets/icons/AICFO_RECENT_WHITE.svg?react'
import Breif from '@assets/icons/AICFO_REPORT.svg?react'
import Breif_White from '@assets/icons/AICFO_REPORT_WHITE.svg?react'
import Setting from '@assets/icons/AICFO_SETTING.svg?react'
import Setting_White from '@assets/icons/AICFO_SETTING_WHITE.svg?react'
import NormalSetting from '@assets/icons/Setting.svg?react'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import LockClosedIcon from '@heroicons/react/24/outline/LockClosedIcon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { lazy } from 'react'

const lazyIcon = (importFunc: () => Promise<any>) =>
  lazy(async () => {
    const module = await importFunc()
    return { default: module.default || module }
  })

const ArrowDownTrayIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/ArrowDownTrayIcon')
)
const ArrowRightOnRectangleIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/ArrowRightOnRectangleIcon')
)
const CalendarIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/CalendarIcon')
)
const ChatBubbleBottomCenterTextIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon')
)
const ClockIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/ClockIcon')
)
const MegaphoneIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/MegaphoneIcon')
)
const NewspaperIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/NewspaperIcon')
)
const PaperAirplaneIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/PaperAirplaneIcon')
)
const PencilIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/PencilIcon')
)
const TrashIcon = lazyIcon(
  () => import('@heroicons/react/24/outline/TrashIcon')
)
const UserIcon = lazyIcon(() => import('@heroicons/react/24/solid/UserIcon'))

const Alert = lazyIcon(() => import('@assets/icons/Alert.svg?react'))
const Bad = lazyIcon(() => import('@assets/icons/Bad.svg?react'))
const BellIcon = lazyIcon(() => import('@assets/icons/Bell.svg?react'))
const CsvDownload = lazyIcon(() => import('@assets/icons/csv.svg?react'))
const Headset = lazyIcon(() => import('@assets/icons/Headset.svg?react'))
const Like = lazyIcon(() => import('@assets/icons/Like.svg?react'))
const Logout = lazyIcon(() => import('@assets/icons/Logout.svg?react'))
const UserOutlined = lazyIcon(
  () => import('@heroicons/react/24/outline/UserIcon')
)
const EyeClosed = lazyIcon(
  () => import('@heroicons/react/24/outline/EyeSlashIcon')
)
const EyeOpen = lazyIcon(() => import('@heroicons/react/24/outline/EyeIcon'))

const FdsNew = lazyIcon(() => import('@assets/icons/Fds-New.svg?react'))

// 아이콘 레지스트리 타입
export type IconName = keyof typeof iconRegistry

// 아이콘 레지스트리
export const iconRegistry = {
  // 코어 아이콘 (즉시 로드)
  close: XMarkIcon,
  expandMore: ChevronDownIcon,
  menu: ChevronLeftIcon,
  search: MagnifyingGlassIcon,
  check: CheckIcon,
  newlogo: NewLogo,

  // 지연 로드 아이콘
  recentQuestion: RecentQuestion,
  recentQuestion_white: RecentQuestion_White,
  setting: Setting,
  setting_white: Setting_White,
  normalSetting: NormalSetting,
  back: ChevronLeftIcon,
  download: ArrowDownTrayIcon,
  bell: BellIcon,
  alarm: ClockIcon,
  response: ChatBubbleBottomCenterTextIcon,
  alert: Alert,
  bad: Bad,
  like: Like,
  csvDownload: CsvDownload,
  push: MegaphoneIcon,
  edit: PencilIcon,
  send: PaperAirplaneIcon,
  login: ArrowRightOnRectangleIcon,
  headset: Headset,
  logout: Logout,
  news: NewspaperIcon,
  brf: Breif,
  brf_white: Breif_White,
  calendar: CalendarIcon,
  user: UserIcon,
  trash: TrashIcon,
  fds: Fds,
  user_outlined: UserOutlined,
  fds_white: Fds_White,
  lock: LockClosedIcon,
  eye_closed: EyeClosed,
  eye_open: EyeOpen,
  fdsNew: FdsNew,
}
