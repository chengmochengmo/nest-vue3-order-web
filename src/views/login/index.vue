<template>
  <div class="login">
    <div class="login-box">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          label="用户名"
          name="userName"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.userName" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { login } from "../../api/manage";
import constant from '../../store/constant'

const router = useRouter();
const store = useStore();

interface FormState {
  userName: string;
  password: string;
}
const formState = reactive<FormState>({
  userName: '',
  password: ''
});
// 登录
const onFinish = async (values: any) => {
  const res = await login(values);
  if (res.errorCode === 0) {
    store.dispatch(constant.AFTER_LOGIN, res.data);
    router.back()
  }
};

</script>
<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>