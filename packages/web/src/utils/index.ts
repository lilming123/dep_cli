import type { ECharts } from 'echarts/core'
import type { ILinks, INodes, IRelations, ITree } from '@truth-cli/shared'
import { assign, categories, isEmptyObj } from '@truth-cli/shared'

export async function initData() {
  const graph = await fetch('graph.json')
  const { nodes, links } = await graph.json()
  const treeJSON = await fetch('tree.json')
  const tree = await treeJSON.json()
  const relationsJSON = await fetch('relations.json')
  const relations = await relationsJSON.json()

  return {
    nodes,
    links,
    tree,
    relations,
  }
}

export class Chart {
  private nodes: INodes[]
  private links: ILinks[]
  private tree: ITree[]
  private relations: IRelations
  private graphSet = new Set()
  private nodesSet: Set<string>
  private echart: ECharts | undefined
  private rootName: string
  constructor(nodes: INodes[], links: ILinks[], tree: ITree[], relations: IRelations) {
    this.nodes = nodes
    this.links = links
    this.tree = tree
    this.relations = relations
    this.nodesSet = new Set(nodes.map((item: any) => item.name))
    this.rootName = links[0].source
  }

  addGraph(name: string) {
    if (name === this.rootName || this.graphSet.has(name))
      return
    this.graphSet.add(name)
    if (!this.relations[name])
      return
    const { devDependencies, dependencies } = this.relations[name]
    const deps = Object.assign({}, devDependencies, dependencies)
    if (isEmptyObj(deps))
      return
    for (const [pkgName, pkgVersion] of Object.entries(deps)) {
      this.links.push({
        source: pkgName,
        target: name,
        v: pkgVersion as string,
      })
      if (!this.nodesSet.has(pkgName)) {
        this.nodes.push({
          name: pkgName,
          value: pkgVersion as string,
          category: 0,
        })
        this.nodesSet.add(pkgName)
      }
    }
    this.echart?.setOption({
      series: [
        {
          name: '引力关系图',
          nodes: this.nodes,
          links: this.links,
        },
      ],
    })
  }

  mountChart(chart: ECharts) {
    this.echart = chart
    const options = {
      legend: {
        data: ['树状图1', '树状图2', '引力关系图'],
        selectedMode: 'single',
        zlevel: 3,
      },
      animationThreshold: 2 ** 32,
      hoverLayerThreshold: 2 ** 32,
      tooltip: {},
      series: [
        {
          name: '引力关系图',
          zlevel: 1,
          type: 'graph',
          layout: 'force',
          nodes: this.nodes,
          links: this.links,
          categories,
          draggable: false,
          label: {
            show: true,
            position: 'right',
          },
          force: {
            repulsion: 150,
            layoutAnimation: true,
          },
          roam: true,
        },
        {
          name: '树状图1',
          zlevel: 2,
          type: 'tree',
          data: [this.tree[0]],
          roam: true,
          label: {
            show: true,
          },
          initialTreeDepth: 1,
          expandAndCollapse: true,
        },
        {
          name: '树状图2',
          zlevel: 2,
          type: 'tree',
          data: [this.tree[1]],
          roam: true,
          label: {
            show: true,
          },
          initialTreeDepth: 1,
          expandAndCollapse: true,
        },
      ],
    }
    this.echart.setOption(options)
  }

  getRelation(name: string) {
    const relation = this.relations[name]
    return relation
  }

  circulatedPkg(name: string) {
    const { devDependencies, dependencies } = this.relations[name]
    const pkgs = assign(devDependencies, dependencies)
    const result = []
    for (const pkg of Object.keys(pkgs) as any) {
      if (this.relations[pkg]) {
        const { devDependencies, dependencies } = this.relations[pkg]
        const relationPkg = assign(devDependencies, dependencies)
        if (Object.keys(relationPkg).includes(name))
          result.push(pkg)
      }
    }
    return result
  }
}
