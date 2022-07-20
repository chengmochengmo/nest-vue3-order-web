import request from "./request";

// 分类列表
export const findCatesList = (data?: any) => {
    return request(`serve/cates/findCatesList`, data, 'get')
}

// 新建分类
export const editCate = (data?: any) => {
    return request(`serve/cates/editCate`, data)
}
