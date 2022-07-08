<template>
  <div class="button-line">
    <a-button class="mar-right-15"><router-link to="/manageAccountEdit">新建</router-link></a-button>
    <a-button @click="uploadMenuFn">上传菜单</a-button>
  </div>
  <a-table :columns="columns" :data-source="usersList" :pagination="pagination">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'createTime'">
        <span v-formatDate>{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'handle'">
        <a>删除</a>
      </template>
    </template>
  </a-table>
</template>
<script setup lang='ts'>
import { reactive, onBeforeMount, ref } from "vue";
import { findUsersList, uploadMenu } from "../../../api/manage";
import { AccountIndexColumns } from '../constant'
import { menuConfig } from '../../../config/menu'

onBeforeMount(async () => {
  getUsersList();
});

// 表头结构
const columns = AccountIndexColumns;
// 表格分页
const pagination = reactive({
  pageSize: 10,
  total: 10,
});
// 表格数据
const usersList = ref([]);
// 获取帐号列表
const getUsersList = async () => {
  const res = await findUsersList();
  if (res.errorCode === 0) {
    usersList.value = res.data;
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