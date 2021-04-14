import { EmailBox } from './box'
import { SettingsPropertiesType } from './settings'

export type TBlockChange<T> = (item: T[] | T) => void

export type TEditSettings = (
    id: string | undefined,
    settings: Partial<SettingsPropertiesType>
) => void

export type TDelete = (ids: string[]) => void
export type TChangeRow = (rowId: string, len: number) => void


export type ContextProps = {
    tree: EmailBox[]
    addItem: TBlockChange<EmailBox>
    changeItem: TBlockChange<EmailBox>
    editSettings: TEditSettings
    deleteItems: TDelete
    changeRowLength: TChangeRow
}
