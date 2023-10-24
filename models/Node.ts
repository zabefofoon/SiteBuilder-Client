export class Node {
  id?: string
  nodes: Node[] = []

  layout: ResponsiveNodeLayout = {
    small: {
      type: 'stack',
      direction: 'vertical',
      hidden: false
    },
    large: {
      type: 'stack',
      direction: 'vertical',
      hidden: false
    },
  }

  constructor(public parentId?: string) {
  }

  static makeNode(node: Node) {
    return Object.assign(new Node(), node)
  }

  static makeNodes(nodes: Node[]) {
    const recursive = (nodes: Node[]) => {
      return nodes.map((node) => {
        const created = Node.makeNode(node)
        created.nodes = recursive(node.nodes)
        return created
      })
    }
    return recursive(nodes)
  }

  static of(parentId?: string) {
    return new Node(parentId)
  }
}

export type NodeDirection = 'horizontal' | 'vertical'

export type NodeLayoutType = 'stack' | 'grid'

export type MainAxis = 'start' | 'center' | 'end' | 'between'
export type CrossAxis = 'start' | 'center' | 'end'

export type NodeLayout = {
  type?: NodeLayoutType
  direction?: NodeDirection
  columns?: number
  gap?: string
  width?: string
  height?: string
  maxWidth?: string
  mainAxis?: MainAxis
  crossAxis?: CrossAxis
  hidden: boolean
  paddingLeft?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  position?: Position
  top?: string
  left?: string
  right?: string
  bottom?: string
  transparent?: boolean
}

export type Position = 'relative' | 'absolute' | 'sticky' | 'fixed'

export type ResponsiveNodeLayout = {
  small: NodeLayout
  large: NodeLayout
}

export type ResponsiveMode = 'small' | 'large'

export type Direction = 'left' | 'top' | 'right' | 'bottom'