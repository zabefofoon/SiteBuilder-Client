import {Page} from "~/modes/Page"

export const usePageStore = defineStore('page', () => {
  const page = ref<Page>()
  const setPage = (pageData?: Page) => page.value = pageData

  return {
    page,
    setPage
  }
})

export type PageStore = ReturnType<typeof usePageStore>;
