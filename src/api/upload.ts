import request from "./request";

// 图片上传
export const uploadImage = async (data?: any) => {
    // 平台
    data.platform = 'admin';
    return request(`base/uploadImage`, data, 'post', {
        'content-type': 'multipart/form-data'
    })
}
