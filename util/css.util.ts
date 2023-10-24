import {Direction, ResponsiveMode, Node} from "~/models/Node"
const getScreenSize = (responsiveMode: ResponsiveMode) => responsiveMode === 'small' ? '0px' : '768px'

export const generateCss = (nodes: Node[]) => generateLayoutCss(nodes)

const generateLayoutCss = (nodes: Node[]) => {
  return generateGap(nodes, 'small')
      + generateGap(nodes, 'large')
      + generateColumns(nodes, 'small')
      + generateColumns(nodes, 'large')
      + generateWidth(nodes, 'small')
      + generateWidth(nodes, 'large')
      + generateHeight(nodes, 'small')
      + generateHeight(nodes, 'large')
      + generateMaxWidth(nodes, 'small')
      + generateMaxWidth(nodes, 'large')
      + generatePadding(nodes, 'small', 'left')
      + generatePadding(nodes, 'small', 'top')
      + generatePadding(nodes, 'small', 'right')
      + generatePadding(nodes, 'small', 'bottom')
      + generatePadding(nodes, 'large', 'left')
      + generatePadding(nodes, 'large', 'top')
      + generatePadding(nodes, 'large', 'right')
      + generatePadding(nodes, 'large', 'bottom')
      + generateInset(nodes, 'small', 'left')
      + generateInset(nodes, 'small', 'top')
      + generateInset(nodes, 'small', 'right')
      + generateInset(nodes, 'small', 'bottom')
      + generateInset(nodes, 'large', 'left')
      + generateInset(nodes, 'large', 'top')
      + generateInset(nodes, 'large', 'right')
      + generateInset(nodes, 'large', 'bottom')
}

const generateGap = (nodes: Node[],
                     responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].gap
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:gap-${current} {
    gap: ${current};
  }
}
`, '')
}

const generateColumns = (nodes: Node[],
                         responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].columns
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:columns-${current} {
    grid-template-columns: repeat(${current}, 1fr);
  }
}
`, '')
}

const generateWidth = (nodes: Node[],
                       responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].width
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')
    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:width-${convertedCurrent} {
    width: ${current};
  }
}
`
  }, '')
}

const generateHeight = (nodes: Node[],
                        responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].height
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:height-${convertedCurrent} {
    height: ${current};
  }
}
`
  }, '')
}

const generateMaxWidth = (nodes: Node[],
                          responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].maxWidth
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:maxWidth-${convertedCurrent} {
    max-width: ${current};
  }
}
`
  }, '')
}

const generatePadding = (nodes: Node[],
                         responsiveMode: ResponsiveMode,
                         direction: Direction) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode][directionToPaddingField(direction)]
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:${flatCapital(directionToPaddingField(direction))}-${convertedCurrent} {
    ${flatCapital(directionToPaddingField(direction))}: ${current};
  }
}
`
  }, '')
}

const generateInset = (nodes: Node[],
                       responsiveMode: ResponsiveMode,
                       direction: Direction) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode][direction]
      if (value && !result.includes(value))
        result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return acc + `
@media(min-width: ${getScreenSize(responsiveMode)}) {
  .${responsiveMode}\\:${direction}-${convertedCurrent} {
    ${direction}: ${current};
  }
}
`
  }, '')
}


const directionToPaddingField = (direction: Direction) => direction === 'left'
    ? 'paddingLeft'
    : direction === 'right'
        ? 'paddingRight'
        : direction === 'top'
            ? 'paddingTop'
            : 'paddingBottom'

const flatCapital = (str: string) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)