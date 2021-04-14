import React, { FC } from 'react'
import { SETTINGS } from 'src/constants'

type TText = typeof SETTINGS.text

export const TextBlock: FC<TText> = ({ text, contentStyle }) => {
    return <p style={contentStyle}>{text}</p>
}
