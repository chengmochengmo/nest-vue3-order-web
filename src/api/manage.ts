import request from "./request";

// 登录
export const login = (data?: any) => {
    return request(`serve/users/login`, data)
}

// 添加新账号
export const regUser = (data?: any) => {
    return request(`serve/users/editUser`, data)
}

// 删除帐号
export const delUser = (data?: any) => {
    return request(`serve/users/delUser`, data)
}

// 账号列表
export const findUsersList = (data?: any) => {
    return request(`serve/users/findUsersList`, data, 'get')
}

// 上传菜单
export const uploadMenu = (data?: any) => {
    return request(`serve/users/uploadMenu`, data)
}

// 获取菜单
export const getMenu = (data?: any) => {
    return request(`serve/users/findMenuList`, data, 'get')
}

// 角色列表
export const findRoleList = (data?: any) => {
    return request(`serve/users/findRoleList`, data, 'get')
}

// 添加、编辑角色
export const editRole = (data?: any) => {
    return request(`serve/users/editRole`, data)
}

// 删除角色
export const delRole = (data?: any) => {
    return request(`serve/users/delRole`, data)
}

// 帐号绑定角色
export const userBindRole = (data?: any) => {
    return request(`serve/users/userBindRole`, data)
}
