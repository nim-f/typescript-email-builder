import { defaultSettings, SettingsPropertiesType } from 'src/types/defaultSettings'

export type Settings = Record<
    keyof typeof defaultSettings,
    SettingsPropertiesType
>
export type TEditSettings = (
    id: string | undefined,
    settings: SettingsPropertiesType
) => void

export interface SettingsProps {
    id: string | undefined
    settings: SettingsPropertiesType
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

