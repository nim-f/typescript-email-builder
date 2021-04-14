import React, { FC } from 'react'
import { SETTINGS, BLOCK_NAMES } from 'src/constants'

type TImage = typeof SETTINGS[BLOCK_NAMES.logo]

export const ImageBlock: FC<TImage> = ({ url, alt, contentStyle }) => {
    return <img src={url} alt={alt} style={contentStyle} />
}
