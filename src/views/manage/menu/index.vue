<template>
  <div class="button-line">
    <a-input-group compact>
      <a-input v-model:value="queryObj.name" placeholder="菜单名" style="width: 200px" class="mar-right-15" />
      <a-input v-model:value="queryObj.auth" placeholder="路由" style="width: 200px" class="mar-right-15" />
      <a-button @click="getMenuList" class="mar-right-15">搜索</a-button>
      <a-button @click="uploadMenuFn">更新菜单</a-button>
    </a-input-group>
  </div>
  <a-table :columns="columns" :data-source="menusList" :pagination="pagination" @change="paginationChange">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'createTime'">
        <span v-formatDate>{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'level'">
        <span>{{menuLevel(record)}}</span>
      </template>
      <template v-if="column.dataIndex === 'parent'">
        <span>{{menuParent(record)}}</span>
      </template>
    </template>
  </a-table>
</template>
<script setup lang='ts'>
import { reactive, onBeforeMount, ref } from "vue";
import { getMenu, uploadMenu } from "../../../api/manage";
import { MenuIndexColumns } from '../constant';
import { menuConfig } from '../../../config/menu';

onBeforeMount(async () => {
  getMenuList();
});

const menuLevelmap = ['一级菜单', '二级菜单', '三级页面'];
// 获取菜单等级 展示
const menuLevel = (menu: any): string => menuLevelmap[menu.id.split('.').length - 1];
// 获取菜单归属 展示
const menuParent = (menu: any): string => menuConfig.find(item => item.id === menu.pid)?.name || '无';

// 搜索条件
const queryObj = reactive({
  name: '',
  auth: '',
  page: 1,
  size: 10
});

// 分页跳转
const paginationChange = (_pagination: any) => {
  queryObj.page = _pagination.current;
  getMenuList()
}
// 表格分页
const pagination = reactive({
  pageSize: queryObj.size,
  total: 0
});
// 表头结构
const columns = MenuIndexColumns;

// 表格数据
const menusList = ref([]);
// 获取菜单列表
const getMenuList = async () => {
  const res = await getMenu(queryObj);
  if (res.errorCode === 0) {
    menusList.value = res.data.data;
    pagination.total = res.data.count
  }
};

// 上传菜单
const uploadMenuFn = async () => {
  for (let i = 0; i < menuConfig.length; i++) {
    uploadMenu({menu: menuConfig[i]})
  }
}

</script>
<style scoped lang='less'>
</style>