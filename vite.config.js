import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // 각 스크립트 파일 및 HTML 파일을 빌드 입력으로 설정
        popup: resolve(__dirname, 'popup.html'),
        content: resolve(__dirname, 'src/content.js'),
        controller: resolve(__dirname, 'src/controller.js'),
      },
      output: {
        entryFileNames: '[name].js',  // 각 entry 파일에 대해 파일 이름 그대로 사용
        chunkFileNames: '[name]-[hash].js',  // 청크 파일 이름 지정
        assetFileNames: '[name]-[hash][extname]',  // 정적 자산 파일 이름 지정
      }
    },
    outDir: 'dist',  // 빌드된 결과물이 저장될 폴더
    emptyOutDir: true,  // 빌드 시 기존 dist 폴더를 비우고 새로 덮어씌움
  },
  publicDir: 'public',  // manifest.json, 아이콘 등 public 폴더에 있는 정적 파일을 dist 폴더로 복사
});
