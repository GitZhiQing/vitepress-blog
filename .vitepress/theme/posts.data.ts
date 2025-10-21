import { createContentLoader } from 'vitepress'
import type {
  BlogPost,
  CategoryGroup,
  TagGroup,
  YearGroup,
  CategoryYearGroup,
  TagYearGroup,
} from './types'
import { formatDateToLocal, formatDateToLocalDate, formatDateToMonthDay } from './utils/dateUtils'

export default createContentLoader('posts/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true, // 返回文档摘要
  transform(rawData) {
    const posts = rawData
      .map(post => ({
        title: post.frontmatter.title,
        url: post.url,
        excerpt: post.excerpt,
        date: post.frontmatter.date,
        formattedDate: formatDateToLocal(post.frontmatter.date),
        formattedDateOnly: formatDateToLocalDate(post.frontmatter.date),
        formattedMonthDay: formatDateToMonthDay(post.frontmatter.date),
        category: post.url.split('/').filter(Boolean)[1], // 从 URL 提取 category
        tags: post.frontmatter.tags || [],
        year: new Date(post.frontmatter.date).getFullYear(),
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))

    return {
      posts,
      // 按年份分组(用于归档页面)
      byYear: groupByYear(posts),
      // 按分类分组(用于分类页面)
      byCategory: groupByCategory(posts),
      // 按标签分组(用于标签页面)
      byTag: groupByTag(posts),
      // 按分类和年份分组(用于分类页面按年份显示)
      byCategoryAndYear: groupByCategoryAndYear(posts),
      // 按标签和年份分组(用于标签页面按年份显示)
      byTagAndYear: groupByTagAndYear(posts),
    }
  },
})

function groupByYear(posts: BlogPost[]): YearGroup[] {
  const grouped: Record<string, BlogPost[]> = {}
  posts.forEach(post => {
    const year = post.year.toString()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(post)
  })
  // 返回按年份降序排列的数组
  return Object.keys(grouped)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map(year => ({
      year,
      posts: grouped[year],
    }))
}

function groupByCategory(posts: BlogPost[]): CategoryGroup[] {
  const grouped: Record<string, BlogPost[]> = {}
  posts.forEach(post => {
    const category = post.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(post)
  })
  return Object.keys(grouped)
    .sort()
    .map(category => ({
      category,
      posts: grouped[category],
    }))
}

function groupByTag(posts: BlogPost[]): TagGroup[] {
  const grouped: Record<string, BlogPost[]> = {}
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!grouped[tag]) {
        grouped[tag] = []
      }
      grouped[tag].push(post)
    })
  })
  return Object.keys(grouped)
    .sort()
    .map(tag => ({
      tag,
      posts: grouped[tag],
    }))
}

function groupByCategoryAndYear(posts: BlogPost[]): CategoryYearGroup[] {
  const categoryGroups: Record<string, Record<string, BlogPost[]>> = {}

  posts.forEach(post => {
    const category = post.category
    const year = post.year.toString()

    if (!categoryGroups[category]) {
      categoryGroups[category] = {}
    }

    if (!categoryGroups[category][year]) {
      categoryGroups[category][year] = []
    }

    categoryGroups[category][year].push(post)
  })

  return Object.keys(categoryGroups)
    .sort()
    .map(category => {
      const yearGroups = categoryGroups[category]
      const years = Object.keys(yearGroups)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map(year => ({
          year,
          posts: yearGroups[year],
        }))

      return {
        category,
        years,
      }
    })
}

function groupByTagAndYear(posts: BlogPost[]): TagYearGroup[] {
  const tagGroups: Record<string, Record<string, BlogPost[]>> = {}

  posts.forEach(post => {
    post.tags.forEach(tag => {
      const year = post.year.toString()

      if (!tagGroups[tag]) {
        tagGroups[tag] = {}
      }

      if (!tagGroups[tag][year]) {
        tagGroups[tag][year] = []
      }

      tagGroups[tag][year].push(post)
    })
  })

  return Object.keys(tagGroups)
    .sort()
    .map(tag => {
      const yearGroups = tagGroups[tag]
      const years = Object.keys(yearGroups)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map(year => ({
          year,
          posts: yearGroups[year],
        }))

      return {
        tag,
        years,
      }
    })
}
