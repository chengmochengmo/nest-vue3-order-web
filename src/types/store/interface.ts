// 管理员信息
export interface userInfo {
  userName: string
}

export interface StoreState {
  userInfo: userInfo,
  authList: Array<object>
}