import React, { FC } from 'react'
import { defaultSettings } from 'src/types/defaultSettings'
type TImage = typeof defaultSettings.logo

export const ImageBlock: FC<TImage> = ({ url, alt, contentStyle }) => {
    return <img src={url} alt={alt} style={contentStyle} />
}
