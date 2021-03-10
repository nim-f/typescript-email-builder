import { Settings } from '../types/settings'

export const defaultSettings: Record<string, Settings> = {
    text: {
        fontSize: 16,
        text: 'lorem ipsum',
    },
    logo: {
        url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
        alt: 'lorem ipsum',
        width: 140,
        height: 100,
    },
}
