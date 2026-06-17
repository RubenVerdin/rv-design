import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      cleanVueFileName: true,
      exclude: ['stories/**', '.storybook/**'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'RVDesign',
      fileName: 'rv-design',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: 'rv-design.[ext]',
        exports: 'named',
      },
    },
  },
})
