export default [
    {
        path: '/dishesCates',
        name: 'dishesCates',
        component: () => import('../views/dishes/cates/index.vue'),
        meta: {
            title: '分类列表'
        }
    },
    {
        path: '/dishesCatesEdit',
        name: 'dishesCatesEdit',
        component: () => import('../views/dishes/cates/edit.vue'),
        meta: {
            title: '编辑分类'
        }
    },
    {
        path: '/dishesFoods',
        name: 'dishesFoods',
        component: () => import('../views/dishes/foods/index.vue'),
        meta: {
            title: '菜品列表'
        }
    },
    {
        path: '/dishesFoodsEdit',
        name: 'dishesFoodsEdit',
        component: () => import('../views/dishes/foods/edit.vue'),
        meta: {
            title: '编辑菜品'
        }
    }
]