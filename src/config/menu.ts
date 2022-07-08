import { MenuList } from "../types/menu/interface";

export const menuConfig: MenuList[] = [
    // 后台管理
    { pid: '0', name: '后台管理', id: '1', auth: 'manage', icon: '' },

    { pid: '1', name: '账号列表', id: '1.1', auth: 'manageAccount' },
    { pid: '1.1', name: '编辑账号', id: '1.1.1', auth: 'manageAccountEdit', isMenu: 'no' },

    { pid: '1', name: '角色列表', id: '1.2', auth: 'manageRole' },
    { pid: '1.2', name: '编辑角色', id: '1.2.1', auth: 'manageRoleEdit', isMenu: 'no' },

    // 菜品管理
    { pid: '0', name: '菜品管理', id: '2', auth: 'dishes', icon: ''  },

    { pid: '2', name: '分类列表', id: '2.1', auth: 'dishesCates' },
    { pid: '2.1', name: '编辑分类', id: '2.1.1', auth: 'dishesCatesEdit', isMenu: 'no' },

    { pid: '2', name: '菜品列表', id: '2.2', auth: 'dishesFoods' },
    { pid: '2.2', name: '编辑菜品', id: '2.2.1', auth: 'dishesFoodsEdit', isMenu: 'no' },

    // 桌位管理
    { pid: '0', name: '桌位管理', id: '3', auth: 'tables', icon: ''  },

    { pid: '3', name: '桌位列表', id: '3.1', auth: 'tablesTableList' },
    { pid: '3.1', name: '编辑桌位', id: '3.1.1', auth: 'tablesTableListEdit', isMenu: 'no'  }
]