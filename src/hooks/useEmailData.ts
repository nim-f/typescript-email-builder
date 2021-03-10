import React, { useState } from 'react'
import { list_to_tree } from '../utils/threeify'
import { Box } from '../types/box'

export const useEmail = () => {
    const [email, setEmail] = useState<Box[]>([])
    const addItem = (item: Box | Box[]) => {
        if (Array.isArray(item)) {
            setEmail([...email, ...item])
        } else {
            setEmail([...email, item])
        }
    }

    const changeItem = (item: Box | Box[]) => {
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
    }
}
