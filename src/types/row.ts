import { EmailBox } from './box'
import { defaultSettings } from './defaultSettings'

export interface IRow extends Omit<EmailBox, 'settings'> {
    settings: typeof defaultSettings.row
}

