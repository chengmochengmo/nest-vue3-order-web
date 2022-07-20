// 表单非空验证
export const validateEmpty = async (rule: any, value: string) => {
    console.log(rule, value)
    if (value === '') {
        return Promise.reject(`请输入${rule?.lable}`);
    } else {
        return Promise.resolve();
    }
};