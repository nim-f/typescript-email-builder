import React, { FC, useContext } from 'react'
import ReactDOM from 'react-dom'
import { SettingsProps } from 'src/types/settings'

import s from './settings.module.css'
import { settingsToArray } from 'src/utils/settingsHelper'
import { useEmailContext } from '../../../hooks/useEmailContext'

export const SettingsPopup: FC<SettingsProps> = ({
    id,
    settings,
    isOpen,
    setIsOpen,
}) => {
    if (!isOpen) return null
    const { editSettings, changeRowLength } = useEmailContext();
    console.log({settings})

    const { blockStyle, contentStyle, cellsLength, ...rest } = settings

    const renderSettingsFields = (el: { [key: string]: string | number }) => {
        const { name, value } = el
        return (
            <div>
                {name}:{' '}
                <input
                    type={'text'}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value
                        editSettings(id, { ...settings, [name]: val })
                    }}
                />
            </div>
        )
    }

    const popup = (
        <div className={s.popup}>
            <button onClick={() => setIsOpen(false)}>close</button>
            {cellsLength &&
                <input
                    type="number"
                    value={cellsLength}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val: number = parseInt(e.target.value)
                        changeRowLength(id, val)
                    }}
                />
            }
            <p>Settings</p>
            {settingsToArray(rest).map(renderSettingsFields)}
            <p>Block styles </p>
            {settingsToArray(blockStyle).map(renderSettingsFields)}
            <p>Content styles </p>
            {settingsToArray(contentStyle).map(renderSettingsFields)}
        </div>
    )
    const modalContainer = document.querySelector('#modal-root')
    return ReactDOM.createPortal(popup, modalContainer as Element)
}
