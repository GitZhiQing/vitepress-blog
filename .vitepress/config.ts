import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Blog',
  description: 'A VitePress Blog',
  cleanUrls: true,
  rewrites: {
    'pages/:page.md': ':page.md',
  },
  transformPageData(pageData) {
    const pathParts = pageData.relativePath.split('/')
    if (pathParts.length > 1) {
      pageData.category = pathParts[pathParts.length - 2]
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
