import { MenuList } from "../types/menu/interface";

export const menuConfig: MenuList[] = [
    // 后台管理
    { pid: '0', name: '首页', id: '1', auth: 'home', icon: '' },
    
    { pid: '1', name: '首页', id: '1.1', auth: 'homeIndex' },

    // 后台管理
    { pid: '0', name: '后台管理', id: '2', auth: 'manage', icon: '' },

    { pid: '2', name: '账号列表', id: '2.1', auth: 'manageAccount' },
    { pid: '2.1', name: '编辑账号', id: '2.1.1', auth: 'manageAccountEdit', isMenu: 'no' },

    { pid: '2', name: '角色列表', id: '2.2', auth: 'manageRole' },
    { pid: '2.2', name: '编辑角色', id: '2.2.1', auth: 'manageRoleEdit', isMenu: 'no' },

    { pid: '2', name: '菜单列表', id: '2.3', auth: 'manageMenu' },

    // 菜品管理
    { pid: '0', name: '菜品管理', id: '3', auth: 'dishes', icon: ''  },

    { pid: '3', name: '分类列表', id: '3.1', auth: 'dishesCates' },
    { pid: '3.1', name: '编辑分类', id: '3.1.1', auth: 'dishesCatesEdit', isMenu: 'no' },

    { pid: '3', name: '菜品列表', id: '3.2', auth: 'dishesFoods' },
    { pid: '3.2', name: '编辑菜品', id: '3.2.1', auth: 'dishesFoodsEdit', isMenu: 'no' },

    // 桌位管理
    { pid: '0', name: '桌位管理', id: '4', auth: 'tables', icon: ''  },

    { pid: '4', name: '桌位列表', id: '4.1', auth: 'tablesTableList' },
    { pid: '4.1', name: '编辑桌位', id: '4.1.1', auth: 'tablesTableListEdit', isMenu: 'no'  }
]