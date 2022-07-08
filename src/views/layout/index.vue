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
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
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
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { menuConfig } from '../../config/menu'
import { MenuList } from '../../types/menu/interface';
const store = useStore();
const route = useRoute();
// 当前路由名
const currentRouteName = route.name;

// 菜单
const menuList = store.state.menuList;
// 横向导航选中
const selectedKeysTransverse = ref(['1']);
// 竖向导航选中、展开
const openKeysVerticalMenu = (): string => {
  const currentMenuConfig = menuConfig.find((item: any) => item.auth === currentRouteName) as MenuList;
  const currentMenuConfigPid = menuConfig.find((item: any) => currentMenuConfig.pid === item.id) as MenuList;
  if (currentMenuConfig?.isMenu !== 'no') return currentMenuConfigPid.auth;
  return (menuConfig.find((item: any) => currentMenuConfigPid.pid === item.id) as MenuList).auth;
}
const selectedKeysVerticalMenu = (): string => {
  const currentMenuConfig = menuConfig.find((item: any) => item.auth === currentRouteName) as MenuList;
  if (currentMenuConfig?.isMenu !== 'no') return currentMenuConfig.auth;
  return (menuConfig.find((item: any) => currentMenuConfig.pid === item.id) as MenuList).auth;
}
const selectedKeysVertical = ref([selectedKeysVerticalMenu()]);
const openKeysVertical = ref([openKeysVerticalMenu()]);

// 面包屑
const breadcrumbList = () => {
  
}

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