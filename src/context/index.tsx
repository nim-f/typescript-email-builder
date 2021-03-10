import React from 'react'
import { Box } from '../types/box'

interface ContextProps {
    three: any[]
    addItem: (row: Box) => void
    changeItem: (item: Box) => void
}

const defaultProps: ContextProps = {
    three: [],
    addItem: (row: Box) => {
        console.log(row)
    },
    changeItem: (item: Box) => {
        console.log(item)
    },
}

export const AppContext = React.createContext(defaultProps)
