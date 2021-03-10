import React, { FC } from 'react'
import { IImage } from '../../../types/image'

export const ImageBlock: FC<IImage> = ({ url, alt, width, height }) => {
    return <img src={url} alt={alt} width={width} height={height} />
}
