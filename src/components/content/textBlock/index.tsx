import React, { FC } from 'react'
import { defaultSettings } from 'src/types/defaultSettings'

type TText = typeof defaultSettings.text

export const TextBlock: FC<TText> = ({ text, contentStyle }) => {
    return <p style={contentStyle}>{text}</p>
}
