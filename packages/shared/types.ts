export interface INodes {
  name: string
  category: number
  value: string
  symbolSize?: number
}

export interface ILinks {
  source: string
  target: string
  v: string
}

export enum EDeps {
  DEPENDENCY,
  ROOT_DEPENDENCY,
  ROOT,
}
export interface ITree {
  name: string
  value: string
  children?: ITree[]
}

interface IRelationRepository {
  type: string
  url: string
  [key: string]: string
}

export interface IRelations {
  name: string
  description: string
  version: string
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
  repository: IRelationRepository[]
  author: string
  homepage: string
  [key: string]: any
}

export enum EDep {
  'DEVDEPENDENCY',
  'DEPENDENCY',
}

export interface IPkgs {
  name: string
  version: string
  type: EDep
  packages: IPkgs
  [key: string]: any
}

export interface IVersions {
  [key: string]: {
    [key: string]: string[]
  }
}

interface ICategories {
  name: '依赖' | '项目名' | '项目依赖'
}

export const categories: ICategories[] = [
  {
    name: '依赖',
  },
  {
    name: '项目依赖',
  },
  {
    name: '项目名',
  },
]
