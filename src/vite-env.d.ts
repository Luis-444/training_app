import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  /* Absolute path */
  resolve: {
    alias: {
      '@': "/src",
      '@components': "/src/components",
      '@views': "/src/views",
      '@layouts': "/src/layouts",
      /* '@assets': "/src/assets", */
      /*'@router': "/src/router", */
    }
  }
})
