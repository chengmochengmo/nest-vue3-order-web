import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'
import Home from "./home";
import Manage from "./manage";
import Dishes from "./dishes";
import Tables from "./tables";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/homeIndex'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/index.vue')
        },
        {
            path: '/',
            name: 'home',
            component: Layout,
            children: [
              // 首页
              ...Home
            ]
        },
        {
            path: '/',
            name: 'manage',
            component: Layout,
            children: [
              // 企业管理
              ...Manage
            ]
        },
        {
            path: '/',
            name: 'dishes',
            component: Layout,
            children: [
              // 企业管理
              ...Dishes
            ]
        },
        {
            path: '/',
            name: 'tables',
            component: Layout,
            children: [
              // 企业管理
              ...Tables
            ]
        }
    ]     
})