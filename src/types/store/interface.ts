// 管理员信息
export interface UserInfo {
  userName: string;
  roleId: string;
}

export interface StoreState {
  userInfo: UserInfo;
  authList: Array<object>;
}