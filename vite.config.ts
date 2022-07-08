import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   hack: `true; @import(reference) "${path.resolve("src/assets/css/base.less")}";`,
        // },
        additionalData:  `@import "${path.resolve("src/assets/css/base.less")}";`,
        javascriptEnabled: true,
      },
    },
  },
})
