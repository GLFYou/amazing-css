import request from '@/utils/request.js'

export const getSlideshow = () => {
  return request('banner', 'get', { limit: 4 })
}

export const ruoyiText = () => {
  return request('/workflow/category/listAll', 'get', {})
}

export const strapiTest = () => {
  return request('/workflow/category/listAll', 'get', {})
}
