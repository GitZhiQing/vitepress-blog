export type BlogPost = {
  title: string
  url: string
  excerpt: string | undefined
  date: string
  formattedDate: string // 格式化后的本地时间 yyyy-mm-dd hh:mm:ss
  formattedDateOnly: string // 仅日期格式 yyyy-mm-dd
  formattedMonthDay: string // 月-日格式 mm-dd
  category: string
  tags: string[]
  year: number
}

export type YearGroup = {
  year: string
  posts: BlogPost[]
}

export type CategoryGroup = {
  category: string
  posts: BlogPost[]
}

export type TagGroup = {
  tag: string
  posts: BlogPost[]
}

export type CategoryYearGroup = {
  category: string
  years: YearGroup[]
}

export type TagYearGroup = {
  tag: string
  years: YearGroup[]
}

export type PostsData = {
  posts: BlogPost[]
  byYear: YearGroup[]
  byCategory: CategoryGroup[]
  byTag: TagGroup[]
  byCategoryAndYear: CategoryYearGroup[]
  byTagAndYear: TagYearGroup[]
}
