export default [
    {
        path: '/tablesTableList',
        name: 'tablesTableList',
        component: () => import('../views/tables/tableList/index.vue'),
        meta: {
            title: '桌位列表'
        }
    },
    {
        path: '/tablesTableListEdit',
        name: 'tablesTableListEdit',
        component: () => import('../views/tables/tableList/edit.vue'),
        meta: {
            title: '编辑桌位'
        }
    }
]