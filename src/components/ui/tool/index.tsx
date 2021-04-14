import React, { FC } from 'react'

import { Box } from 'src/types'

import { BlockTool } from './block'
import { RowTool } from './row'

export const Tool: FC<Box> = (props) => {

    if (props.type === 'row') {
        return <RowTool {...props} />
    }
    return (
        <BlockTool {...props} />
    )

}
