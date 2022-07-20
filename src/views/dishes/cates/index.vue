<template>
  <div class="button-line">
    <a-input-group compact>
      <a-button class="mar-right-15"><router-link to="/dishesCatesEdit">新建</router-link></a-button>
      <a-input v-model:value="queryObj.name" placeholder="分类名" style="width: 200px" class="mar-right-15" />
      <a-button @click="getCatesList" >搜索</a-button>
    </a-input-group>
  </div>
  <a-table :columns="columns" :data-source="catesList" :pagination="pagination" @change="paginationChange">
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
import { findCatesList } from "../../../api/dishes";
import { CatesIndexColumns } from '../constant';

onBeforeMount(async () => {
  getCatesList();
});

// 表头结构
const columns = CatesIndexColumns;

// 搜索条件
const queryObj = reactive({
  name: '',
  page: 1,
  size: 10
});

// 分页跳转
const paginationChange = (_pagination: any) => {
  queryObj.page = _pagination.current;
  getCatesList()
}
// 表格分页
const pagination = reactive({
  pageSize: queryObj.size,
  total: 0
});
// 表格数据
const catesList = ref([]);
// 获取分类列表
const getCatesList = async () => {
  const res = await findCatesList(queryObj);
  if (res.errorCode === 0) {
    catesList.value = res.data.data;
    pagination.total = res.data.count
  }
}

</script>
<style scoped lang='less'>

</style>