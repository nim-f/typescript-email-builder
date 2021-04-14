import { SETTINGS } from '../constants'

export type TBlockName = keyof typeof SETTINGS

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type SettingsPropertiesType = {
    cellsLength?: number,
    blockStyle: Record<string, string | number>,
    contentStyle: Record<string, string | number>,
} //PropertiesType<typeof SETTINGS>


export interface SettingsProps {
    id: string
    settings: SettingsPropertiesType
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

