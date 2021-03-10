import React from 'react'
import { Box, TToggleBlock } from '../types/box'

interface ContextProps {
    three: any[]
    addItem: TToggleBlock
    changeItem: TToggleBlock
}

const defaultProps: ContextProps = {
    three: [],
    addItem: (item: Box | Box[]) => {
        console.log(item)
    },
    changeItem: (item: Box | Box[]) => {
        console.log(item)
    },
}

export const AppContext = React.createContext(defaultProps)
