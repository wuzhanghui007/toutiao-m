/* 1. 存储数据 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  window.localStorage.setItem(key, value)
}

/* 2，取数据 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/* 3， 删除数据 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
