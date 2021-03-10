export interface IRow {
    id: string
    length: number
    data?: [] | null
}
export interface ITreeRow {
    id: string
    length: number
    children?: [] | null
    parent: string
}
