import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPagesBuild ? '/HIT_KNOWLEDGE_STACK/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
