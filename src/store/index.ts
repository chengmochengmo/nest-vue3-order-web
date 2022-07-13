import { createStore } from 'vuex'
import createPersist from 'vuex-localstorage'
import { StoreState, UserInfo } from "../types/store/interface";
import constant from './constant'
import { getMenu } from "../api/manage";
import { formatMenu } from '../utils/menu'

const persist = createPersist({
    namespace: 'nest-vue3-order',
    initialState: {},
    // ONE_WEEK
    expires: 7 * 24 * 60 * 60 * 1e3
})

export default createStore({
    state<StoreState>() {
        return {
            userInfo: {} as UserInfo, // 用户信息
            menuList: [], // 菜单
            aaa: 1
        }
    },
    getters: {

    },
    mutations: {
        // 设置用户信息
        [constant.SET_TOKEN](state, data) {
            console.log('用户信息', data)
            localStorage.setItem('token', data.token);
            state.userInfo = data;
        },
        // 设置菜单
        [constant.SET_MENULIST](state, data: []) {
            console.log('整理后的菜单', data)
            state.menuList = data;
            console.log(state.menuList)
        }
    },
    actions: {
        // 登录后操作 分发
        [constant.AFTER_LOGIN]({ commit, dispatch }, userInfo) {
            commit(constant.SET_TOKEN, userInfo);
            dispatch(constant.SET_MENU_LIST, userInfo);
        },
        // 设置菜单
        async [constant.SET_MENU_LIST]({ state, commit }) {
            const res = await getMenu({role: state.userInfo.roleId});
            console.log('接口返回菜单配置', res.data.data)
            if (res.errorCode === 0) {
                // 整理菜单
                const menuList = formatMenu(res.data.data);
                commit(constant.SET_MENULIST, menuList)
            }
        }
    },
    plugins: [ persist ]
})