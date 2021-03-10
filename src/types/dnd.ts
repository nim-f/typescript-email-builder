import { Box, TToggleBlock } from './box'

export interface IDndArea {
    name: string
    height: number
    width: number
    id: string
    data: any
    changeItem: TToggleBlock
}
