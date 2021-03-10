import React, { FC } from 'react'
import {TextBlock} from './textBlock'
import {ImageBlock} from './imageBlock'

export const Content: FC<{name: string, settings?: any}> = ({name, settings }) => {
    const getContentBlock = (name: string): React.ReactElement => {
        switch (name) {
            case 'text':
                return <TextBlock {...settings} />
            case 'logo':
                return <ImageBlock {...settings} />
            default:
                return <></>
        }
    }

    return (
        <div>{getContentBlock(name)}</div>
    )
}
