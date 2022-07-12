// 新建编辑form
export const formLabelCol = { style: { width: '150px' } };
export const formWrapperCol = { span: 14, offset: 1 };
export const formButtonCol = { span: 14, offset: 4 };

// 帐号表格表头
export const AccountIndexColumns = [
  {
    title: "帐号名",
    dataIndex: "name",
    key: "name",
    ellipsis: { showTitle: true },
  },
  {
    title: "帐号",
    dataIndex: "userName",
    key: "userName",
    ellipsis: { showTitle: true },
  },
  {
    title: "密码",
    dataIndex: "password",
    key: "password",
    ellipsis: { showTitle: true },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    ellipsis: { showTitle: true },
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role"
  },
  {
    title: "操作",
    dataIndex: "handle",
    key: "handle"
  }
]

// 角色表格表头
export const RoleIndexColumns = [
  {
    title: "角色名",
    dataIndex: "name",
    key: "name",
    ellipsis: { showTitle: true },
  },
  {
    title: "可访问菜单",
    dataIndex: "menuIds",
    key: "menuIds"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    ellipsis: { showTitle: true },
  },
  {
    title: "操作",
    dataIndex: "handle",
    key: "handle"
  }
]

// 菜单表格表头
export const MenuIndexColumns = [
  {
    title: "菜单名",
    dataIndex: "name",
    key: "name",
    ellipsis: { showTitle: true },
  },
  {
    title: "路由",
    dataIndex: "auth",
    key: "auth",
    ellipsis: { showTitle: true },
  },
  {
    title: "等级",
    dataIndex: "level",
    key: "level"
  },
  {
    title: "归属",
    dataIndex: "parent",
    key: "parent"
  }
]