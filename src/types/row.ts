import { EmailBox } from './box'

export interface ITreeRow {
    id?: string
    length: number
    children?: EmailBox[] | null
    parent: string
}
