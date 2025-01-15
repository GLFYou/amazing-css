import request from '@/utils/request.js'

export const getUserInfo = () => {
  return request('/user-info', 'get', {})
}

export const getArticleList = (params) => {
  return request('/articles', 'get', params)
}

export const getTag = (params) => {
  return request('/tags', 'get', params)
}
