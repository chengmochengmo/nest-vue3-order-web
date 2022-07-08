import { App } from "vue";
import moment from 'moment'

export default {
    install: (app: App) => {
        // 格式化时间指令
        app.directive('formatDate', {
            created(el: Element, { value = 'YYYY-MM-DD HH:mm:ss' }) {
                el.innerHTML = moment(el.innerHTML).format(value)
            }
        })
    }
};