import {RouteLocationNormalized} from "vue-router"
import {Page} from "~/modes/Page"

let cachedPages: Page[]

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!cachedPages) {
    const {data: pages} = await useAsyncData('user', () => $fetch('/api/config/pages'))
    if (!cachedPages) cachedPages = pages.value
  }

  const page = matchRoute(cachedPages, to)

  if (!page) {
    useHead({
      title: 'error'
    })
    return navigateTo('/error')
  } else {
    useHead({
      title: page.name
    })
  }
})

const matchRoute = (pages: Page[], route: RouteLocationNormalized) => {
  const isPublicRoutes = ['/', '/error'].includes(route.path)
  if (isPublicRoutes) return pages?.find((page) => page.url === route.path)

  const depth = String(route.name).split('-').at(-1)?.replace('depth', '')

  return pages
      ?.filter((page) => page.activate)
      ?.filter((page) => {
        const pageDepth = page.url.match(/\//g)?.length
        return pageDepth === Number(depth)
      })
      .find((page) => {
        const pageUrlBlock = page.url.split('/').at(Number(depth))
        const toUrlBlock = route.path.split('/').at(Number(depth))

        const prevPageUrlBlock = page.url.split('/').at(Number(depth) - 1)
        const prevToUrlBlock = route.path.split('/').at(Number(depth) - 1)

        return pageUrlBlock?.startsWith(':')
            ? Number(depth) === 1
                ? toUrlBlock
                : prevPageUrlBlock === prevToUrlBlock && toUrlBlock
            : toUrlBlock === pageUrlBlock
      })
}