export const settingsToArray = (settings: {[ key: string ]: any}): Array<{[key: string]: any}> => {
    return Object.keys(settings).map((key) => {
        return {
            name: key,
            value: settings[key],
        }
    })
}
