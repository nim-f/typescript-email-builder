import { SettingsPropertiesType, TBlockName } from './settings'

export interface Box {
    name: TBlockName
    type: string
}

export interface EmailBox extends Box {
    id: string
    items: EmailBox[]
    parent: string
    settings: SettingsPropertiesType,
}

export interface EmailBoxProps extends EmailBox {
    children: React.ReactNode
}
