<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" @finish="onSubmit">
    <a-form-item label="分类名" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="描述" name="desc">
      <a-input v-model:value="formState.desc" />
    </a-form-item>
    <a-form-item label="图标" name="icon">
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :customRequest="customUploadRequest"
        :before-upload="beforeUpload"
      >
        <img v-if="formState.icon" :src="resUrl + formState.icon" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">上传</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="排序" name="sort">
      <a-input v-model:value="formState.sort" />
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
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { formLabelCol, formWrapperCol, formButtonCol } from '../constant';
import { baseResUrl } from '../../../config/net';
import { editCate } from '../../../api/dishes';
import { uploadImage } from '../../../api/upload';
import { validateEmpty } from '../../../utils/antd';
const router = useRouter();
// 资源服务器域名
const resUrl = ref(baseResUrl);

// 表单验证
const rules = ref({
  name: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '分类名' }],
  desc: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '描述' }],
  icon: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '图标' }],
  sort: [{ required: true, validator: validateEmpty, trigger: 'change', lable: '排序' }]
})

// 表单配置
const labelCol = ref(formLabelCol);
const wrapperCol = ref(formWrapperCol);
const buttonCol = ref(formButtonCol);

const beforeUpload = () => {
  loading.value = true;
  formState.icon = '';
}

// 图片上传
const loading = ref<boolean>(false);
const customUploadRequest = async (uploadData: any) => {
  const file = uploadData.file;
  // 图类型
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    loading.value = false;
    return message.warning('只支持.jpg和.png格式');
  }
  // 图大小
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    loading.value = false;
    return message.warning('大小要在2M以下');
  }
  const res = await uploadImage({
    file,
    folder: 'cates'
  })
  if (res.errorCode === 0) {
    loading.value = false;
    formState.icon = res.data.filePath;
  }
}

// 表单字段
interface FormState {
  name: string;
  desc: string;
  icon: string;
  sort: number
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  desc: '',
  icon: '',
  sort: 0
});
// 提交信息
const onSubmit = async () => {
  const data = toRaw(formState);
  const res = await editCate(data);
  if (res.errorCode === 0) {
    message.success('提交成功');
    router.back();
  }
};

</script>
<style scoped lang='less'>
</style>
<style lang="less">
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>