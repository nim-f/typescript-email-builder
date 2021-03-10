export type TToggleBlock = (item: Box[] | Box) => void

export interface Box {
    name: string
    type: string
    parent?: string
    id?: string
    settings?: Record<string, unknown>
}
export interface BoxProps extends Box {
    toggleBlock: TToggleBlock
    sidebar?: boolean
}

export interface IRowSettings {
    cellsLength: number
}

export interface EmailBox extends Box {
    id: string
    children: EmailBox[]
    parent: string
}

export interface IRow {

}
