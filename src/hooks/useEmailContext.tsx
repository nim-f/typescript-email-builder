import React, { FC, ReactNode, useContext, useMemo, useReducer, useState } from 'react'
import {
    EmailBox,
    TBlockChange,
    TEditSettings,
    ContextProps,
    TDelete,
    TChangeRow,
} from '../types'
import { EMAIL } from '../constants'
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

type IAction = {
    type: EMAIL
    payload: any
}

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

const reducer: React.Reducer<EmailBox[], IAction> = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case EMAIL.ChangeSettings:
            return state.map((item) => {
                if (item.id === payload.id) {
                    return {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...payload.settings,
                        },
                    }
                }
                return item
            })
        case EMAIL.Add:
            if (Array.isArray(payload.item)) {
                return [...state, ...payload.item]
            } else {
                return [...state, payload.item]
            }
        case EMAIL.ChangeItem:
            if (Array.isArray(payload.item)) {
                const itemsIds = payload.item.map((val: EmailBox) => val.id)
                return [
                    ...state.filter(
                        (oldItem) => itemsIds.indexOf(oldItem.id) === -1
                    ),
                    ...payload.item,
                ]

            } else {
                return [
                    ...state.filter((oldItem) => oldItem.id !== payload.item.id),
                    payload.item,
                ]
            }
        case EMAIL.ChangeRowLength:
            return changeRowLength(state, payload.rowId, payload.len)
        case EMAIL.Delete:
            return state.filter(
                (item) =>
                    payload.ids.indexOf(item.id) < 0 && payload.ids.indexOf(item.parent) < 0
            )
        default:
            return [...state];
    }
}

export const EmailProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [email, dispatch] = useReducer<React.Reducer<EmailBox[], IAction>>(
        reducer,
        initialState
    )

    const editSettings: TEditSettings = (id, settings) => {
        dispatch({
            type: EMAIL.ChangeSettings,
            payload: { id, settings }
        })
    }

    const deleteItems: TDelete = (ids) => {
        dispatch({
            type: EMAIL.Delete,
            payload: { ids },
        })
    }

    const changeRowLength: TChangeRow = (rowId, len) => {
        dispatch({
            type: EMAIL.ChangeRowLength,
            payload: { rowId, len },
        })
    }

    const addItem: TBlockChange<EmailBox> = (item) => {
        dispatch({
            type: EMAIL.Add,
            payload: { item },
        })
    }

    const changeItem: TBlockChange<EmailBox> = (item) => {
        dispatch({
            type: EMAIL.ChangeItem,
            payload: { item },
        })
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
