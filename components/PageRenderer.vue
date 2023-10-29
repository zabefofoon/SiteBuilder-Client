<template>
  <UiStyle>{{ generatedCss }}</UiStyle>
  <Node v-for="node in nodes"
        :key="node.id"
        :node="node"/>
</template>

<script setup lang="ts">
import {usePageStore} from "~/store/page.store"
import {Node as NodeClass} from "~/models/Node"
import Node from "~/components/Node.vue"
import {computed} from "#imports"
import {generateCss} from "~/util/css.util"
import UiStyle from "~/components/UiStyle.vue"

const pageStore = usePageStore()

const {data: pageDetail} = await useFetch('/api/page/detail', {query: {id: pageStore.page?.id}})

const nodes = computed(() => NodeClass.makeNodes(JSON.parse(pageDetail.value.detail)?.nodes || []))

const generatedCss = computed(() => generateCss(nodes.value || []))
</script>

<style scoped lang="scss">

</style>