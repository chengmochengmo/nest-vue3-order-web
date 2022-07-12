import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
import router from '../router/index';
import { baseApiUrl as baseURL, timeout } from "../config/net";
import { Method } from "../types/net/types";

const server = axios.create({
    baseURL,
    timeout
})

export default (url: string, data?: any, method: Method = 'post') => {
    data = data || {}
    const needsQs = method == 'post';
    const token: any = localStorage.getItem('token');
    // 设置token
    server.defaults.headers.common['token'] = token;
    return server[method](url, needsQs ? qs.stringify(data) : { params: data })
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
