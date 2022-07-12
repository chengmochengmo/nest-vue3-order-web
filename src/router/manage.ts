export default [
    {
        path: '/manageAccount',
        name: 'manageAccount',
        component: () => import('../views/manage/account/index.vue'),
        meta: {
            title: '账号列表'
        }
    },
    {
        path: '/manageAccountEdit',
        name: 'manageAccountEdit',
        component: () => import('../views/manage/account/edit.vue'),
        meta: {
            title: '编辑账号'
        }
    },
    {
        path: '/manageRole',
        name: 'manageRole',
        component: () => import('../views/manage/role/index.vue'),
        meta: {
            title: '角色列表'
        }
    },
    {
        path: '/manageRoleEdit',
        name: 'manageRoleEdit',
        component: () => import('../views/manage/role/edit.vue'),
        meta: {
            title: '编辑角色'
        }
    },
    {
        path: '/manageMenu',
        name: 'manageMenu',
        component: () => import('../views/manage/menu/index.vue'),
        meta: {
            title: '菜单列表'
        }
    }
]