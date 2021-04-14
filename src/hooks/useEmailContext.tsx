import React, { FC, ReactNode, useContext, useMemo, useState } from 'react'
import {
    EmailBox,
    TBlockChange,
    TEditSettings,
    ContextProps,
    TDelete,
    TChangeRow,
} from '../types'
import { list_to_tree } from '../utils/threeify'
import uniqid from 'uniqid'

const defaultProps: ContextProps = {
    tree: [],
    addItem: () => {},
    changeItem: () => {},
    editSettings: () => {},
    deleteItems: () => {},
    changeRowLength: () => {},
}

export const EmailContext = React.createContext(defaultProps)

export const EmailProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<EmailBox[]>([])

    const editSettings: TEditSettings = (id, settings) => {
        setEmail((oldEmail) => {
            const newEmail = oldEmail.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        settings: { ...item.settings, ...settings },
                    }
                }
                return item
            })

            return newEmail
        })
    }

    const deleteItems: TDelete = (ids) => {
        setEmail((oldEmail) => {
            return oldEmail.filter(
                (item) =>
                    ids.indexOf(item.id) < 0 && ids.indexOf(item.parent) < 0
            )
        })
    }

    const changeRowLength: TChangeRow = (rowId, len) => {
        setEmail((oldEmail) => {
            const row = oldEmail.find((item) => item.id === rowId)

            if (row?.settings?.cellsLength) {
                const diff = len - row?.settings?.cellsLength
                editSettings(rowId, { cellsLength: len })

                if (diff < 0) {
                    const toDelete = row.items.splice(diff).map((i) => i.id)
                    deleteItems(toDelete)
                }
                if (diff > 0) {
                    const cells = Array(diff)
                        .fill({
                            parent: rowId,
                            type: 'row',
                        })
                        .map((val) => ({
                            ...val,
                            id: uniqid(),
                        }))
                    addItem(cells)
                }
            }

            return oldEmail
        })
    }

    const addItem: TBlockChange<EmailBox> = (item) => {
        if (Array.isArray(item)) {
            setEmail([...email, ...item])
        } else {
            setEmail([...email, item])
        }
    }

    const changeItem: TBlockChange<EmailBox> = (item) => {
        if (Array.isArray(item)) {
            const itemsIds = item.map((val) => val.id)
            const newEmail = [
                ...email.filter(
                    (oldItem) => itemsIds.indexOf(oldItem.id) === -1
                ),
                ...item,
            ]
            setEmail(newEmail)
        } else {
            const newEmail = [
                ...email.filter((oldItem) => oldItem.id !== item.id),
                item,
            ]
            setEmail(newEmail)
        }
    }
    // const three = useMemo(() => {
    //     return list_to_tree(email)
    // }, [email])

    const tree = list_to_tree(email)

    return (
        <EmailContext.Provider
            value={{
                tree,
                addItem,
                changeItem,
                editSettings,
                deleteItems,
                changeRowLength,
            }}
        >
            {children}
        </EmailContext.Provider>
    )
}

export const useEmailContext = (): ContextProps => {
    return useContext(EmailContext)
}
