export interface Box {
    name: string
    type: string
    parent?: string
    id?: string
}
export interface BoxProps extends Box {
    toggleBlock: (item: Box) => void
}
