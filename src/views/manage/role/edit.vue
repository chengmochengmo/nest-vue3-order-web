<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" @finish="onSubmit">
    <a-form-item label="角色名" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="可访问菜单">
        <template v-for="(item, index) in menuList" :key="item.auth">
          <a-checkbox v-model:checked="item.state.checkAll" :indeterminate="item.state.indeterminate" @change="onCheckAllChange($event, index)">{{item.name}}（全选）</a-checkbox>
          <br>
          <a-checkbox-group v-if="item.children.length" v-model:value="item.state.checkedList">
            <a-checkbox :value="subitem.id" name="type" v-for="subitem in item.children" :key="subitem.auth">{{subitem.name}}</a-checkbox>
          </a-checkbox-group>
          <br v-if="index !== (menuList.length - 1)">
          <br v-if="index !== (menuList.length - 1)">
        </template>
    </a-form-item>
    <a-form-item :wrapper-col="buttonCol">
      <a-button type="primary" html-type="submit">确认</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang='ts'>
import { reactive, toRaw, ref, onBeforeMount, watch } from "vue";
import type { UnwrapRef } from "vue";
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { formLabelCol, formWrapperCol, formButtonCol } from '../constant';
import { formatMenu } from '../../../utils/menu';
import { editRole, getMenu } from '../../../api/manage';
import { validateEmpty } from '../../../utils/antd';
import { menuConfig } from '../../../config/menu';
const router = useRouter();

onBeforeMount(() => {
  getMenuList();
})

// 整理选中的id
const formatCheckedIds = (): string[] => {
  const menuIdsArr: string[] = []; 
  for (let i = 0; i < menuList.value.length; i++) {
    const val = menuList.value[i];
    if (val.state.checkAll) {
      // 全选此一级菜单 找到所有对应二级菜单和三级页面
      menuIdsArr.push(
        ...menuConfig.filter(item => item.id.indexOf(val.id) === 0).map(item => item.id)
      )
    } else if (val.state.checkedList.length) {
      // 单选某些二级菜单
      // 先加入对应一级菜单id  
      menuIdsArr.push(
        val.id
      )
      // 找到二级菜单和对应三级页面
      for (let j = 0; j < val.state.checkedList.length; j++) {
        const checkedId = val.state.checkedList[j]
        menuIdsArr.push(
          ...menuConfig.filter(item => item.id.indexOf(checkedId) === 0).map(item => item.id)
        )
      }
    }
  }
  return menuIdsArr;
}

// 表单验证
const rules = ref({
  name: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '角色名' }]
})

// 表单配置
const labelCol = ref(formLabelCol);
const wrapperCol = ref(formWrapperCol);
const buttonCol = ref(formButtonCol);

// 表单字段
interface FormState {
  name: string;
  menuIds: string[];
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  menuIds: []
});

// 提交信息
const onSubmit = async () => {
  formState.menuIds = formatCheckedIds();
  if (!formState.menuIds) return message.warning('请选择可访问菜单');
  const data = toRaw(formState);
  const res = await editRole(data);
  if (res.errorCode === 0) {
    message.success('提交成功', 3);
    router.back();
  }
};

// 获取菜单
const menuList = ref<any[]>([]);
const getMenuList = async () => {
  const res = await getMenu();
  if (res.errorCode === 0) {
    // 整理菜单
    menuList.value = formatMenu(res.data.data).map(item => {
      // 多选使用的字段
      item.state = reactive({
        indeterminate: true,
        checkAll: false,
        checkedList: [],
      })
      return item;
    })
  }
}

// 监听多选
const onCheckAllChange = (e: any, index: number) => {
  Object.assign(menuList.value[index].state, {
    checkedList: e.target.checked ? menuList.value[index].children.map((item: any) => item.id) : [],
    indeterminate: false,
  });
};
watch(
  () => menuList,
  val => {
    for (let i = 0; i < val.value.length; i++) {
      const _val = val.value[i];
      const state = _val.state;
      state.indeterminate = !!state.checkedList.length && state.checkedList.length < _val.children.length;
      state.checkAll = state.checkedList.length === _val.children.length;
    }
  }, {
    deep: true
  }
)

</script>
<style scoped lang='less'>
</style>
<style lang="less">
.ant-checkbox-wrapper {
  margin-bottom: 10px;
}
</style>