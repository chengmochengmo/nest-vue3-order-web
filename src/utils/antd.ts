// 表单非空验证
export const validateEmpty = async (_rule: any, value: string) => {
    if (value === '') {
        return Promise.reject(`请输入${_rule?.lable}`);
    } else {
        return Promise.resolve();
    }
};