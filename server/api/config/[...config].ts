import {createRouter, defineEventHandler, useBase} from "h3"

const router = createRouter()

router.get('/pages', defineEventHandler(() => {
  return [
    {
      'url': '/',
      'title': '홈페이지',
      'depth': 1
    },
    {
      'url': '/error',
      'title': '에러 페이지',
      'depth': 1
    },
    {
      'url': '/product/:itemCode',
      'title': '상품상세 페이지',
      'depth': 2
    },
    {
      'url': '/category',
      'title': '카테고리 페이지',
      'depth': 1
    },
    {
      'url': '/category/:categoryCode',
      'title': '카테고리 페이지',
      'depth': 2
    }
  ]
}))
export default useBase('/api/config', router.handler)