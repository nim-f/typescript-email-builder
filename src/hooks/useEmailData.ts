import React, { useState } from 'react'
import { list_to_tree } from '../utils/threeify'
import { EmailBox, GBlockChange } from '../types/box'
import { Settings, TEditSettings } from '../types/settings'

export const useEmail = () => {
    const [email, setEmail] = useState<EmailBox[]>([])

    const editSettings: TEditSettings = (id, settings) => {
        const newEmail = email.map((item) => {
            if (item.id === id) {
                return { ...item, settings }
            }
            return item
        })
        setEmail(newEmail)
    }

    const addItem: GBlockChange<EmailBox> = (item) => {
        if (Array.isArray(item)) {
            setEmail([...email, ...item])
        } else {
            setEmail([...email, item])
        }
    }

    const changeItem: GBlockChange<EmailBox> = (item) => {
        if (Array.isArray(item)) {
            const itemsIds = item.map((val) => val.id)
            const newEmail = [
                ...email.filter((oldItem) => itemsIds.indexOf(oldItem.id) === -1),
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
    const three = list_to_tree(email)
    console.log({three})

    return {
        three,
        changeItem,
        addItem,
        editSettings,
    }
}
