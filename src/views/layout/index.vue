<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeysTransverse"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeysVertical"
          v-model:openKeys="openKeysVertical"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="item in menuList" :key="item.auth">
            <template #title>
              <span>
                <user-outlined />
                {{item.name}}
              </span>
            </template>
            <a-menu-item v-for="subItem in item.children" :key="subItem.auth">
              <router-link :to="{name: subItem.auth}">{{subItem.name}}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.auth">
            <router-link :to="{name: item.auth}">{{item.name}}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang='ts'>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { ref, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { menuConfig } from '../../config/menu'
import { MenuList } from '../../types/menu/interface';
const store = useStore();
const route = useRoute();

// 当前路由名
const currentRouteName = reactive(route);
// 根据路由名 找到当前菜单配置
const findMenuConfig = () => menuConfig.find((item: any) => item.auth === currentRouteName.name) as MenuList;
// 根据当前菜单配置 找到父菜单配置
const findParetMenuConfig = (currentMenuConfig: any) => menuConfig.find((item: any) => currentMenuConfig.pid === item.id) as MenuList;

// 菜单
const menuList = store.state.menuList;

// 横向导航选中
const selectedKeysTransverse = ref(['1']);

// 竖向导航展开
const openKeysVerticalMenu = (): string => {
  const currentMenuConfig = findMenuConfig();
  const currentMenuConfigParent = findParetMenuConfig(currentMenuConfig);
  if (currentMenuConfig?.isMenu !== 'no') return currentMenuConfigParent.auth;
  return (menuConfig.find((item: any) => currentMenuConfigParent.pid === item.id) as MenuList).auth;
}
const openKeysVertical = ref([openKeysVerticalMenu()]);
// 竖向导航选中
const selectedKeysVerticalMenu = (): string => {
  const currentMenuConfig = findMenuConfig();
  if (currentMenuConfig?.isMenu !== 'no') return currentMenuConfig.auth;
  const currentMenuConfigParent = findParetMenuConfig(currentMenuConfig);
  return currentMenuConfigParent.auth;
}
const selectedKeysVertical = ref([selectedKeysVerticalMenu()]);

// 面包屑
const breadcrumbList = (): object[] => {
  const currentMenuConfig = findMenuConfig();
  if (currentMenuConfig?.isMenu !== 'no') {
    if (currentMenuConfig?.auth === 'homeIndex') return [currentMenuConfig];
    return [{ name: '首页', auth: 'homeIndex' }, currentMenuConfig];
  }
  const currentMenuConfigParent = findParetMenuConfig(currentMenuConfig);
  return [{ name: '首页', auth: 'homeIndex' }, currentMenuConfigParent, currentMenuConfig];
}
const breadcrumb = ref(breadcrumbList());

// 路由变化触发导航&面包屑变化
watch(route, () => {
  console.log('当前路由名：', currentRouteName.name)
  if (currentRouteName.name === 'login') return;
  breadcrumb.value = breadcrumbList();
  selectedKeysVertical.value = [selectedKeysVerticalMenu()];
  openKeysVertical.value = [openKeysVerticalMenu()];
}, {
  immediate: true
})

</script>
<style scoped lang='less'>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>