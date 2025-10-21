<script setup>
import { useData } from 'vitepress'
import { formatDateToLocalDate } from '../utils/dateUtils'

const { page, frontmatter } = useData()
</script>

<template>
  <article class="max-w-none">
    <header class="mb-8 pb-6 border-b border-[--color-border]">
      <h1 class="text-2xl md:text-3xl font-bold text-[--color-text-primary] mb-4">
        {{ frontmatter.title }}
      </h1>
      <div class="flex flex-wrap gap-4 text-sm text-[--color-text-secondary]">
        <div class="flex items-center gap-2">
          <span class="font-medium">分类:</span>
          <span
            class="px-2 py-1 bg-[--color-bg-secondary] text-[--color-text-primary] rounded-md"
            >{{ page.category }}</span
          >
        </div>
        <div class="flex items-center gap-2" v-if="frontmatter.tags && frontmatter.tags.length">
          <span class="font-medium">标签:</span>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tag in frontmatter.tags" :key="tag">
              <span class="tag">{{ tag }}</span>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-2" v-if="frontmatter.date">
          <span class="font-medium">发布时间:</span>
          <time :datetime="frontmatter.date">{{ formatDateToLocalDate(frontmatter.date) }}</time>
        </div>
      </div>
    </header>

    <div
      class="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:no-underline hover:prose-a:underline prose-a:text-[--color-text-primary] dark:prose-a:text-[--color-text-primary-dark] hover:prose-a:text-[--color-text-secondary] dark:hover:prose-a:text-[--color-text-secondary-dark] prose-img:rounded-lg prose-code:bg-[--color-bg-secondary] prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[--color-bg-secondary] prose-pre:border prose-pre:border-[--color-border]"
    >
      <Content />
    </div>
  </article>
</template>
