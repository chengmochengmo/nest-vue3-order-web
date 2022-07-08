// 把菜单按父子关系整理
export const formatMenu = (menuList: any[]) => {
    const menu: any[] = [];
    const routeMap: any = {}
    // 需要服务端整理menuid顺序
    menuList.forEach(item => {
        if (item.isMenu === 'no') return;
        console.log(item)
        item.children = [];
        routeMap[item.id] = item;
        // 根节点
        if (item.pid === '0') {
            menu.push(item);
        } else if (routeMap[item.pid]) {
            routeMap[item.pid].children.push(item);
        }
    })
    return menu;
}