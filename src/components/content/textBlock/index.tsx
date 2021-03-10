import React, { FC } from 'react'
import { IText } from '../../../types/text'

export const TextBlock: FC<IText> = ({ text, fontSize }) => {
    return <p style={{ fontSize }}>{text}</p>
}
