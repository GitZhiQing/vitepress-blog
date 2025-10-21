<script setup>
import { useData, useRoute } from 'vitepress'
import Home from './components/Home.vue'
import Archive from './components/Archive.vue'
import Post from './components/Post.vue'
import Categories from './components/Categories.vue'
import Tags from './components/Tags.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const { site, page, frontmatter } = useData()

// 检查导航项是否为激活状态
const isActive = path => {
  const layout = frontmatter.value?.layout
  if (path === '/') {
    return !layout || layout === 'home'
  }
  if (path === '/archive' && layout === 'archive') return true
  if (path === '/categories' && layout === 'categories') return true
  if (path === '/tags' && layout === 'tags') return true
  const current = page.value?.relativePath || ''
  const pathWithoutSlash = path.startsWith('/') ? path.substring(1) : path
  return current.startsWith(pathWithoutSlash)
}
</script>

<template>
  <div
    class="min-h-screen bg-[--color-bg-primary] text-[--color-text-primary] transition-colors duration-300"
  >
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <ThemeToggle />

      <header class="mb-8 text-left">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">
          <a
            href="/"
            class="text-[--color-text-primary] hover:text-[--color-text-secondary] hover:underline transition-all duration-300"
          >
            {{ site.title }}
          </a>
        </h1>
        <p class="text-xl text-[--color-text-secondary]">{{ site.description }}</p>
      </header>

      <nav class="mb-8 border-t border-[--color-border] pt-4">
        <ul class="flex justify-start space-x-6 border-b border-[--color-border] pb-4">
          <li>
            <a
              href="/"
              :class="isActive('/') ? 'nav-link-active' : 'nav-link-inactive'"
              class="nav-link"
            >
              首页
            </a>
          </li>
          <li>
            <a
              href="/archive"
              :class="isActive('/archive') ? 'nav-link-active' : 'nav-link-inactive'"
              class="nav-link"
            >
              归档
            </a>
          </li>
          <li>
            <a
              href="/categories"
              :class="isActive('/categories') ? 'nav-link-active' : 'nav-link-inactive'"
              class="nav-link"
            >
              分类
            </a>
          </li>
          <li>
            <a
              href="/tags"
              :class="isActive('/tags') ? 'nav-link-active' : 'nav-link-inactive'"
              class="nav-link"
            >
              标签
            </a>
          </li>
        </ul>
      </nav>

      <main class="mb-12 min-h-[55vh]">
        <div v-if="page.isNotFound" class="text-center py-12">
          <h1 class="text-3xl font-bold text-[--color-text-primary] mb-4">404</h1>
          <p class="text-xl text-[--color-text-secondary]">页面未找到</p>
        </div>
        <Home v-else-if="frontmatter.layout === 'home'" />
        <Archive v-else-if="frontmatter.layout === 'archive'" />
        <Categories v-else-if="frontmatter.layout === 'categories'" />
        <Tags v-else-if="frontmatter.layout === 'tags'" />
        <Post v-else-if="frontmatter.layout === 'post'" />
        <Content
          v-else
          class="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:no-underline hover:prose-a:underline prose-a:text-[--color-text-primary] dark:prose-a:text-[--color-text-primary-dark] hover:prose-a:text-[--color-text-secondary] dark:hover:prose-a:text-[--color-text-secondary-dark]"
        />
      </main>

      <!-- 简化的页脚区域 -->
      <footer class="pt-8 text-center">
        <small class="text-[--color-text-tertiary]">Copyright © 2025 {{ site.title }}</small>
      </footer>
    </div>
  </div>
</template>
