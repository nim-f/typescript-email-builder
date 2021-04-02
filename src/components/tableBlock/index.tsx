import React, { FC, useState } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import classNames from 'classnames'

import { EmailBox, EmailBoxProps } from '../../types/box'

import s from './tableblock.module.css'
import { SettingsPopup } from '../settings/popup'

export const TableBlock: FC<EmailBoxProps> = ({
    name,
    type,
    children,
    items,
    parent,
    id,
    changeBlock,
    settings,
}) => {
    const [isSettingsOpen, setSettingsOpen] = useState(false)

    const onEndDrag = (
        item: EmailBox | undefined,
        monitor: DragSourceMonitor
    ) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
            const newBlock = {
                ...item,
                parent: dropResult.id,
            }

            changeBlock([newBlock])
            // alert(`You dropped ${item.name} into ${dropResult.name}!`)
        }
    }

    const [{ isDragging }, drag] = useDrag({
        item: { name, type, id, items, parent, settings },
        end: onEndDrag,
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.4 : 1

    return (
        <div
            ref={drag}
            style={{ opacity }}
            className={classNames(s.block)}
        >
            <button onClick={() => setSettingsOpen(true)}>settings</button>

            {children}

            <SettingsPopup
                id={id}
                settings={settings}
                isOpen={isSettingsOpen}
                setIsOpen={(val: boolean) => setSettingsOpen(val)}
            />
        </div>
    )
}
