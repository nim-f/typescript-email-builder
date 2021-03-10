import React, { FC, useState } from 'react'
import { DNDArea } from '../dnd_area'
import { AppContext } from '../../context'
import s from './row.module.css'
import { EmailBox } from '../../types/box'

export const Row: FC<EmailBox> = ({ children }) => {

    return (
        <AppContext.Consumer>
            {({ changeItem }) => (
                <div className={s.row}>
                    {children.map((cell) => (
                        <div
                            key={cell.id}
                            className={'cell'}
                            style={{
                                width: `${100 / children.length}%`,
                                border: '1px solid #333',
                            }}
                        >
                            <DNDArea
                                name={'row-dnd'}
                                width={100}
                                height={30}
                                data={cell.children}
                                id={cell.id}
                                changeItem={changeItem}
                            />
                        </div>
                    ))}
                </div>
            )}
        </AppContext.Consumer>
    )
}
