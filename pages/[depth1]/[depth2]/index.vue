<template>
  <PageRenderer/>
</template>

<script setup lang="ts">
import PageRenderer from "~/components/PageRenderer.vue"

definePageMeta({
  middleware: ['seo-middleware']
})
</script>

<style scoped lang="scss">

</style>