import axios from 'axios'
// import qs from 'qs'
import { message } from 'ant-design-vue';
import router from '../router/index';
import { baseApiUrl as baseURL, timeout } from "../config/net";
import { Method } from "../types/net/types";

const server = axios.create({
    baseURL,
    timeout
})

export default (url: string, data: any = {}, method: Method = 'post', headers: any = {'content-type': 'application/json;charset=UTF-8'}) => {
    const needsQs = method == 'post';
    const token: string | null = localStorage.getItem('token');
    // 设置token
    const param = needsQs ? { data } : { params: data };
    return server.request({
        url,
        method,
        headers: {
            token,
            ...headers
        },
        ...param
    })
        .then(res => {
            const { data } = res;
            // 服务端返回错误信息
            if (data.errorCode !== 0) message.error(data.msg);
            // 登录
            if (data.errorCode === 401) router.push('/login');
            return data;
        }).catch((e) => {
            message.error(`接口异常：${url}`);
            return e;
        })
}
