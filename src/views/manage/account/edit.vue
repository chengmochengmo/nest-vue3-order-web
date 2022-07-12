<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" @finish="onSubmit">
    <a-form-item label="账户名" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="帐号" name="userName">
      <a-input v-model:value="formState.userName" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item label="确认密码" name="passwordVerification">
      <a-input v-model:value="formState.passwordVerification" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonCol">
      <a-button type="primary" html-type="submit">确认</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang='ts'>
import { reactive, toRaw, ref } from "vue";
import type { UnwrapRef } from "vue";
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { formLabelCol, formWrapperCol, formButtonCol } from '../constant';
import { regUser } from '../../../api/manage';
import { validateEmpty } from '../../../utils/antd';
const router = useRouter();

// 表单验证
const rules = ref({
  name: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '账户名' }],
  userName: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '帐号' }],
  password: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '密码' }],
  passwordVerification: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '确认密码' }]
})

// 表单配置
const labelCol = ref(formLabelCol);
const wrapperCol = ref(formWrapperCol);
const buttonCol = ref(formButtonCol);

// 表单字段
interface FormState {
  name: string;
  userName: string;
  password: string;
  passwordVerification?: string
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  userName: '',
  password: '',
  passwordVerification: ''
});
// 提交信息
const onSubmit = async () => {
  const data = toRaw(formState);
  if (data.password !== data.passwordVerification) return message.warning('两次输入密码不一致');
  delete data.passwordVerification;
  const res = await regUser(data);
  if (res.errorCode === 0) {
    message.success('提交成功');
    router.back();
  }
};

</script>
<style scoped lang='less'>
</style>