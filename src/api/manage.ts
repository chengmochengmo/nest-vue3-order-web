import request from "./request";

// 登录
export const login = (data: any) => {
    return request(`serve/users/login`, data)
}

// 添加新账号
export const reg = (data: any) => {
    return request(`serve/users/editUser`, data)
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