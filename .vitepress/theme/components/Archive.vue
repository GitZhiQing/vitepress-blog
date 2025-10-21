<script setup>
import { data } from '../posts.data.js'

const { byYear } = data
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-[--color-text-primary] mb-8">归档</h1>
    <div v-for="yearGroup in byYear" :key="yearGroup.year" class="mb-12">
      <h2
        class="text-xl font-semibold text-[--color-text-primary] mb-4 pb-2 border-b border-[--color-border]"
      >
        {{ yearGroup.year }}
      </h2>
      <ul class="list-disc space-y-2 ml-4 pl-2">
        <li v-for="post in yearGroup.posts" :key="post.url" class="py-1">
          <span class="text-sm text-[--color-text-tertiary] inline-block w-12 mr-2">{{
            post.formattedMonthDay
          }}</span>
          <a
            :href="post.url"
            class="text-[--color-text-primary] hover:text-[--color-text-secondary] hover:underline transition-all duration-300"
            >{{ post.title }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
