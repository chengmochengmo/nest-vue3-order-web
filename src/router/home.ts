export default [
    {
        path: '/homeIndex',
        name: 'homeIndex',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页'
        }
    }
]