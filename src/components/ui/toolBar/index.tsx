import React, { FC } from 'react'

import { BLOCK_TYPES, INSTRUMENTS } from 'src/constants'


import { Tool } from 'src/components/ui'
import { useEmailContext } from 'src/hooks/useEmailContext'

import s from './toolbar.module.css'


export const ToolBar: FC = () => {

    return (
        <div className={s.tools}>
            <Tool
                name={'row'}
                type={BLOCK_TYPES.Row}
            />
            <div>
                <div>Blocks:</div>
                {INSTRUMENTS.map((instrument) => (
                    <Tool
                        name={instrument}
                        type={BLOCK_TYPES.Block}
                    />
                ))}
            </div>
        </div>
    )
}
