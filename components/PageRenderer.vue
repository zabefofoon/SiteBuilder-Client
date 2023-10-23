<template>
  PageRenderer <br/>
  <router-link to="/somePage/1">productDetail</router-link>
</template>

<script setup lang="ts">
import {usePageStore} from "~/store/page.store"

const pageStore = usePageStore()
console.log(pageStore.page)
</script>

<style scoped lang="scss">

</style>