import {RouteLocationNormalized} from "vue-router"
import {Page} from "~/modes/Page"
import {useRequestHeaders} from "#imports"
import {usePageStore} from "~/store/page.store"

let cachedPages: Page[]

export default defineNuxtRouteMiddleware(async (to, from) => {
  const pageStore = usePageStore()

  if (!cachedPages) {
    const {data: pages} = await useAsyncData('pages', () => $fetch('/api/config/pages'))
    if (!cachedPages) cachedPages = pages.value
  }

  const requestHeaders = useRequestHeaders()

  const page = matchRoute(cachedPages, to)
  pageStore.setPage(page)
  if (!page) {
    useHead({
      title: 'Error'
    })
    return navigateTo('/error')
  } else {
    useHead({
      title: page.seo?.title || page.name,
      meta: [
        {name: 'description', content: page.seo?.description},
        {name: 'keywords', content: page.seo?.keyword},
        {name: 'robots', content: page.seo?.expose ? '' : 'noindex, nofollow'},
        {name: 'og:type', content: 'website'},
        {name: 'og:url', content: requestHeaders.referer},
        {name: 'og:title', content: page.seo?.title || page.name},
        {name: 'og:image', content: page.seo?.image},
        {name: 'og:description', content: page.seo?.description},
        {name: 'og:site_name', content: 'SiteBuilderClient'},
        {name: 'og:locale', content: 'en_US'}
      ]
    })
  }
})

const matchRoute = (pages: Page[],
                    route: RouteLocationNormalized) => {
  return pages
      .find((page) => {
        const urlPattern = new RegExp(`^${page.url?.replace(/:\w+/g, '\\w+')}$`)
        return urlPattern.test(route.path)
      })

}