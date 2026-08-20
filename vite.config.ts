import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubActions = Boolean(
  (globalThis as { process?: { env?: { GITHUB_ACTIONS?: string } } }).process?.env?.GITHUB_ACTIONS,
)

export default defineConfig({
  base: isGitHubActions ? '/MBTI/' : '/',
  plugins: [react()],
})
