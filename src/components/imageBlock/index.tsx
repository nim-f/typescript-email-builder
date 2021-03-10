import React, { FC } from 'react'
import { IImage } from '../../types/image'

export const ImageBlock: FC<IImage> = ({ url, alt }) => {
    return <img src={url} alt={alt} />
}
