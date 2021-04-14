import { EmailBox } from './box'
import { SettingsPropertiesType } from './settings'

export type TBlockChange<T> = (item: T[] | T) => void
export type TBlockAdd<T> = (item: T) => void

export type TEditSettings = (
    id: string,
    settings: Partial<SettingsPropertiesType>
) => void

export type TDelete = (ids: string[]) => void
export type TChangeRow = (rowId: string, len: number) => void


export type ContextProps = {
    tree: EmailBox[]
    addItem: TBlockChange<EmailBox>
    changeItem: TBlockAdd<EmailBox>
    editSettings: TEditSettings
    deleteItems: TDelete
    changeRowLength: TChangeRow
}
