<template>
  <div class="node | border border-dashed"
       :class="[gridClass, flexClass, layoutClass]">
    <div v-if="node.nodes.length === 0"
         class="text-xs">
      id: {{ node.id }}<br/>
      parent: {{ node.parentId }}<br/>
    </div>
    <Node v-for="node in node.nodes"
          :key="node.id"
          :node="node"/>
  </div>
</template>

<script setup lang="ts">
import {Node as NodeClass, ResponsiveMode} from '~/models/Node'

const props = defineProps<{
  node: NodeClass
}>()

const gridClass = computed(() => (<ResponsiveMode[]>Object.keys(props.node.layout))
    .reduce<string>((acc, current) => {
      let result = ''
      if (props.node.layout[current].type === 'grid')
        result = result + `${current}:type-${props.node.layout[current].type} `
      if (props.node.layout[current].columns)
        result = result + `${current}:columns-${props.node.layout[current].columns} `
      return acc + result
    }, ''))

const flexClass = computed(() => (<ResponsiveMode[]>Object.keys(props.node.layout))
    .reduce<string>((acc, current) => {
      let result = ''
      if (props.node.layout[current].direction === 'horizontal')
        result = result + `${current}:direction-${props.node.layout[current].direction} `
      if (props.node.layout[current].gap)
        result = result + `${current}:gap-${props.node.layout[current].gap} `
      if (props.node.layout[current].mainAxis !== undefined)
        result = result + `${current}:mainAxis-${props.node.layout[current].mainAxis} `
      if (props.node.layout[current].crossAxis !== undefined)
        result = result + `${current}:crossAxis-${props.node.layout[current].crossAxis} `

      return acc + result
    }, ''))

const layoutClass = computed(() => (<ResponsiveMode[]>Object.keys(props.node.layout))
    .reduce<string>((acc, current) => {
      let result = ''
      if (props.node.layout[current].width)
        result = result + `${current}:width-${props.node.layout[current].width} `
      if (props.node.layout[current].height)
        result = result + `${current}:height-${props.node.layout[current].height} `
      if (props.node.layout[current].maxWidth)
        result = result + `${current}:maxWidth-${props.node.layout[current].maxWidth} `

      if (props.node.layout[current].position !== undefined)
        result = result + `${current}:position-${props.node.layout[current].position} `

      if (props.node.layout[current].hidden)
        result = result + `${current}:hidden-${props.node.layout[current].hidden || false} `

      if (props.node.layout[current].paddingLeft !== undefined)
        result = result + `${current}:padding-left-${props.node.layout[current].paddingLeft} `
      if (props.node.layout[current].paddingTop !== undefined)
        result = result + `${current}:padding-top-${props.node.layout[current].paddingTop} `
      if (props.node.layout[current].paddingRight !== undefined)
        result = result + `${current}:padding-right-${props.node.layout[current].paddingRight} `
      if (props.node.layout[current].paddingBottom !== undefined)
        result = result + `${current}:padding-bottom-${props.node.layout[current].paddingBottom} `

      if (props.node.layout[current].left !== undefined)
        result = result + `${current}:left-${props.node.layout[current].left} `
      if (props.node.layout[current].top !== undefined)
        result = result + `${current}:top-${props.node.layout[current].top} `
      if (props.node.layout[current].right !== undefined)
        result = result + `${current}:right-${props.node.layout[current].right} `
      if (props.node.layout[current].bottom !== undefined)
        result = result + `${current}:bottom-${props.node.layout[current].bottom} `

      if (props.node.layout[current].transparent)
        result = result + `${current}:transparent `

      return acc + result
    }, ''))
</script>

<style scoped lang="scss">

</style>