<template>
  <div class="button-line">
    <a-button class="mar-right-15"><router-link to="/manageRoleEdit">新建</router-link></a-button>
  </div>
  <a-table :columns="columns" :data-source="rolesList" :pagination="pagination">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'createTime'">
        <span v-formatDate>{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'menuIds'">
        <span>{{ record.menuNames.map(item => item.menu.name).join('; ') }}</span>
      </template>
      <template v-if="column.dataIndex === 'handle'">
        <a-button type="text" danger @click="delItem(record._id)">删除</a-button>
      </template>
    </template>
  </a-table>
</template>
<script setup lang='ts'>
import { reactive, onBeforeMount, ref } from "vue";
import { message } from "ant-design-vue";
import { findRoleList, delRole } from "../../../api/manage";
import { RoleIndexColumns } from '../constant';

onBeforeMount(async () => {
  getRolesList();
});

// 表头结构
const columns = RoleIndexColumns;
// 表格分页
const pagination = reactive({
  pageSize: 10,
  total: 10
});
// 表格数据
const rolesList = ref([]);

// 获取帐号列表
const getRolesList = async () => {
  const res = await findRoleList();
  if (res.errorCode === 0) {
    rolesList.value = res.data;
  }
};

// 删除该帐号
const delItem = async (_id: string) => {
  const res = await delRole({ _id });
  if (res.errorCode === 0) {
    message.success(res.msg);
    getRolesList();
  }
}

</script>
<style scoped lang='less'>
</style>