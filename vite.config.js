import { defineConfig } from 'vite';

export default defineConfig({
  base: './',  // 확장 프로그램에서는 상대 경로를 사용해야 하므로 './'로 설정
  build: {
    outDir: 'dist', // 빌드 결과물의 출력 경로 설정
    rollupOptions: {
      input: 'index.html'  // 빌드에 사용할 HTML 파일 설정
    }
  }
});