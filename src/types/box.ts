import React from 'react'
import { SettingsPropertiesType } from './defaultSettings'

import { Settings } from './settings'

// export type TToggleBlock = (item: Box[] | Box) => void
// export type TChangeBlock = (item: EmailBox[] | EmailBox) => void

export type GBlockChange<T> = (item: T[] | T) => void

export interface Box {
    id?: string
    name: string
    type: string
}

export interface BoxProps extends Box {
    toggleBlock: GBlockChange<EmailBox>
    sidebar?: boolean
}

export interface IRowSettings {
    cellsLength: number
}

export interface EmailBox extends Box {
    id: string
    items: EmailBox[]
    parent: string
    settings: SettingsPropertiesType,
}
export interface EmailBoxProps extends EmailBox {
    changeBlock: GBlockChange<EmailBox>
    children: React.ReactNode
}

export interface IRow {

}
