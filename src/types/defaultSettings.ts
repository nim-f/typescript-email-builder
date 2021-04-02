import { EmailBox } from './box'

export const defaultSettings = {
    row: {
        cellsLength: 3,
        blockStyle: {
            height: 100,
        },
        contentStyle: {

        }
    },
    text: {
        text: 'lorem ipsum',
        blockStyle: {
            width: 140,
            height: 100,
        },
        contentStyle: {
            fontSize: 16,
        },
    },
    logo: {
        url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
        alt: 'lorem ipsum',
        blockStyle: {
            width: 140,
            height: 100,
        },
        contentStyle: {
            width: 140,
            height: 100,
        },

    },

}

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type SettingsPropertiesType = PropertiesType<typeof defaultSettings>

export type BlockStyleType = SettingsPropertiesType['blockStyle']

export interface ContentBlock<T> extends Omit<EmailBox, 'settings'> {
    settings: T
}


// const rowSettings: SettingsPropertiesType = {
//     cellsLength: 3,
//     height: 200,
// }
