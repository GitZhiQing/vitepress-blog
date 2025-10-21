/**
 * 格式化日期为本地时间格式 yyyy-mm-dd hh:mm:ss
 * @param dateString 日期字符串，可以是各种格式
 * @returns 格式化后的本地时间字符串
 */
export function formatDateToLocal(dateString: string): string {
  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return dateString // 如果日期无效，返回原始字符串
  }

  // 获取本地时间的年、月、日、时、分、秒
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 格式化日期为本地日期格式 yyyy-mm-dd
 * @param dateString 日期字符串，可以是各种格式
 * @returns 格式化后的本地日期字符串
 */
export function formatDateToLocalDate(dateString: string): string {
  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return dateString // 如果日期无效，返回原始字符串
  }

  // 获取本地时间的年、月、日
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * 格式化日期为月-日格式 mm-dd
 * @param dateString 日期字符串，可以是各种格式
 * @returns 格式化后的月-日字符串
 */
export function formatDateToMonthDay(dateString: string): string {
  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return dateString // 如果日期无效，返回原始字符串
  }

  // 获取本地时间的月、日
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${month}-${day}`
}
