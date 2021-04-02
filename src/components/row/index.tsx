import React, { FC, useState } from 'react'
import { DNDArea } from '../dnd_area'
import s from './row.module.css'
import { EmailBox } from '../../types/box'

export const Row: FC<EmailBox> = ({ items }) => {
    return (
        <div className={s.row}>
            {items.map((cell: EmailBox) => (
                <div
                    key={cell.id}
                    className={'cell'}
                    style={{
                        width: `${100 / items.length}%`,
                        border: '1px solid #333',
                    }}
                >
                    <DNDArea
                        name={'row-dnd'}
                        width={100}
                        height={30}
                        data={cell.items}
                        id={cell.id}
                    />
                </div>
            ))}
        </div>
    )
}
