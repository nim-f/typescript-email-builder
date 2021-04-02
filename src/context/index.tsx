import React from 'react'
import { Box, EmailBox, GBlockChange } from '../types/box'
import { TEditSettings, Settings } from '../types/settings'

interface ContextProps {
    three: any[]
    addItem: GBlockChange<EmailBox>
    changeItem: GBlockChange<EmailBox>
    editSettings: TEditSettings
}

const addItem: GBlockChange<EmailBox> = (item) => {
    console.log(item)
}

const changeItem: GBlockChange<EmailBox> = (item) => {
    console.log(item)
}
const editSettings: TEditSettings = (id, settings) => {
    console.log({ id, settings })
}

const defaultProps: ContextProps = {
    three: [],
    addItem,
    changeItem,
    editSettings,
}

export const AppContext = React.createContext(defaultProps)
