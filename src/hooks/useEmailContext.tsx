import React, { FC, ReactNode, useContext, useMemo, useReducer } from 'react'
import uniqid from 'uniqid'

import {
    EmailBox,
    TBlockChange,
    TBlockAdd,
    TEditSettings,
    ContextProps,
    TDelete,
    TChangeRow, SettingsPropertiesType,
} from 'src/types'
import { EMAIL } from 'src/constants'
import { list_to_tree } from 'src/utils/threeify'

const defaultProps: ContextProps = {
    tree: [],
    addItem: () => {},
    changeItem: () => {},
    editSettings: () => {},
    deleteItems: () => {},
    changeRowLength: () => {},
}

const AC = {
    delete: (ids: string[]) => ({
        type: EMAIL.Delete,
        payload: { ids },
    }),
    changeRowLength: ( rowId: string, len: number ) => ({
        type: EMAIL.ChangeRowLength,
        payload: { rowId, len },
    }),
    add: (item: EmailBox | EmailBox[]) => ({
        type: EMAIL.Add,
        payload: { item },
    }),
    changeItem: (item: EmailBox) => ({
        type: EMAIL.ChangeItem,
        payload: { item },
    }),
    changeSettings: (
        id: string,
        settings: Partial<SettingsPropertiesType>
    ) => ({
        type: EMAIL.ChangeSettings,
        payload: { id, settings },
    })
}

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

type ActionType = ReturnType<PropertiesType<typeof AC>>

export const EmailContext = React.createContext(defaultProps)

const initialState: EmailBox[] = []

const changeRowLength = (state: EmailBox[], rowId: string, len: number) => {
    const row = state.find((item) => item.id === rowId)

    if (row?.settings?.cellsLength) {
        const diff = len - row?.settings?.cellsLength
        // editSettings(rowId, { cellsLength: len })
        const newState = state.map((item) => {
            if (item.id === rowId) {
                return {
                    ...item,
                    settings: {
                        ...item.settings,
                        cellsLength: len,
                    },
                }
            }
            return item
        })

        if (diff < 0) {
            const toDelete = row.items.splice(diff).map((i) => i.id)
            return newState.filter(
                (item) =>
                    toDelete.indexOf(item.id) < 0 && toDelete.indexOf(item.parent) < 0
            )
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
            return [...newState, ...cells]
        }
    }
    return { ...state }
}

const reducer = (state: EmailBox[], action: ActionType): EmailBox[] => {
    switch (action.type) {
        case EMAIL.ChangeSettings:
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...action.payload.settings,
                        },
                    }
                }
                return item
            })
        case EMAIL.Add:
            if (Array.isArray(action.payload.item)) {
                return [...state, ...action.payload.item]
            } else {
                return [...state, action.payload.item]
            }
        case EMAIL.ChangeItem:
            if (Array.isArray(action.payload.item)) {
                const itemsIds = action.payload.item.map((val: EmailBox) => val.id)
                return [
                    ...state.filter(
                        (oldItem) => itemsIds.indexOf(oldItem.id) === -1
                    ),
                    ...action.payload.item,
                ]
            } else {
                return [
                    ...state.filter((oldItem) => oldItem.id !== action.payload.item.id),
                    action.payload.item,
                ]
            }
        case EMAIL.ChangeRowLength:
            return changeRowLength(
                state,
                action.payload.rowId,
                action.payload.len
            )
        case EMAIL.Delete:
            return state.filter(
                (item) =>
                    action.payload.ids.indexOf(item.id) < 0 && action.payload.ids.indexOf(item.parent) < 0
            )
        default:
            throw new Error()
    }
}

export const EmailProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [email, dispatch] = useReducer<React.Reducer<EmailBox[], ActionType>>(
        reducer,
        initialState
    )

    const editSettings: TEditSettings = (id, settings) => {
        dispatch(AC.changeSettings(id, settings))
    }

    const deleteItems: TDelete = (ids) => {
        dispatch(AC.delete(ids))
    }

    const changeRowLength: TChangeRow = (rowId, len) => {
        dispatch(AC.changeRowLength(rowId, len))
    }

    const addItem: TBlockChange<EmailBox> = (item) => {
        dispatch(AC.add(item))
    }

    const changeItem: TBlockAdd<EmailBox> = (item) => {
        dispatch(AC.changeItem(item))
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
