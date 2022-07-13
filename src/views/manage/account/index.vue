<template>
  <div class="manage-account">
    <div class="button-line">
      <a-button class="mar-right-15"
        ><router-link to="/manageAccountEdit">新建</router-link></a-button
      >
    </div>
    <a-table
      :columns="columns"
      :data-source="usersList"
      :pagination="pagination"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'createTime'">
          <span v-formatDate>{{ text }}</span>
        </template>
        <template v-if="column.dataIndex === 'role'">
          <span>{{ record.roleId ? record.roleId.name : '暂未绑定' }}</span>
        </template>
        <template v-if="column.dataIndex === 'handle'">
          <a-button type="text" danger @click="delItem(record._id)"
            >删除</a-button
          >
          <a-button type="link" @click="bindRoleModalShow(record)">绑定角色</a-button>
        </template>
      </template>
    </a-table>
    <ModalPopup
      title="绑定角色"
      :visible="visible"
      @close="bindRole"
    >
      <template #content>
        <a-form-item label="角色" :wrapper-col="{ span: 18, offset: 1 }">
          <a-select
            ref="select"
            v-model:value="roleId"
            placeholder="请选择"
          >
            <a-select-option :value="item._id" v-for="item in rolesList" :key="item._id">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </ModalPopup>
  </div>
</template>
<script setup lang='ts'>
import { reactive, onBeforeMount, ref } from "vue";
import { message } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { findUsersList, delUser, findRoleList, userBindRole } from "../../../api/manage";
import { AccountIndexColumns } from "../constant";
import ModalPopup from "../../../components/modalPopup.vue";

onBeforeMount(async () => {
  getUsersList();
  getRolesList();
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

// 删除该帐号
const delItem = async (_id: string) => {
  const res = await delUser({ _id });
  if (res.errorCode === 0) {
    message.success(res.msg);
    getUsersList();
  }
};

// 获取帐号列表
const rolesList = ref<SelectProps["options"]>([]);
const roleId = ref(undefined);
const currentAccountId = ref(undefined);
const getRolesList = async () => {
  const res = await findRoleList();
  if (res.errorCode === 0) {
    rolesList.value = res.data;
  }
};
// 绑定角色弹窗
const visible = ref(false);
const bindRoleModalShow = (record: any) => {
  visible.value = true;
  roleId.value = record.roleId ? record.roleId.id : undefined;
  currentAccountId.value = record._id;
}
// 确认绑定
const bindRole = async (state: boolean) => {
  visible.value = false
  if (state) {
    // 确认
    const res = await userBindRole({
      userId: currentAccountId.value,
      roleId: roleId.value
    })
    if (res.errorCode === 0) {
      message.success(res.msg);
    }
  } else {
    // 取消
  }
  roleId.value = undefined;
  currentAccountId.value = undefined;
};
</script>
<style scoped lang='less'>
</style>