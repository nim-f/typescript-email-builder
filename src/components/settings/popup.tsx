import React, { FC, useContext } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '../../context'
import { SettingsProps } from '../../types/settings'

import s from './settings.module.css'
import { settingsToArray } from 'src/utils/settingsHelper'

export const SettingsPopup: FC<SettingsProps> = ({
    id,
    settings,
    isOpen,
    setIsOpen,
}) => {
    if (!isOpen) return null
    const { editSettings } = useContext(AppContext);

    const { blockStyle, contentStyle, ...rest } = settings

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
