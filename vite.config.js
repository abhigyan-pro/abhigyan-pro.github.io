import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' suits a GitHub *user* site served at the domain root
// (e.g. abhigyan-pro.github.io). For a project repo served at
// username.github.io/<repo>/, change this to '/<repo>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
