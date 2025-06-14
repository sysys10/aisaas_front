export type SidebarContent =
  | 'brf'
  | 'recentQuestion'
  | 'default'
  | 'setting'
  | 'fds'
  | null

const SIDE_BAR_TOP_LIST: { text: string; name: SidebarContent }[] = [
  { text: '최근 질문', name: 'recentQuestion' },
]
const SIDE_BAR_BOTTOM_LIST: { text: string; name: SidebarContent }[] = [
  { text: '사용 설정', name: 'setting' }
]
export { SIDE_BAR_TOP_LIST, SIDE_BAR_BOTTOM_LIST }
