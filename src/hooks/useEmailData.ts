import React, { useState } from 'react'
import { list_to_tree } from '../utils/threeify'
import { Box } from '../types/box'

export const useEmail = () => {
    const [email, setEmail] = useState<Box[]>([])
    const addItem = (row: Box) => {
        setEmail([...email, row])
    }
    const changeItem = (item: Box) => {
        const newEmail = [
            ...email.filter((oldItem) => oldItem.id !== item.id),
            item,
        ]
        setEmail(newEmail)
    }
    const three = list_to_tree(email)
    return {
        three,
        changeItem,
        addItem,
    }
}
