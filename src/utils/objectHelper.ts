export const getObjectValue = <T extends {}, R extends keyof T>(
    obj: T,
    key: R
) => {
    return obj[key]
}
