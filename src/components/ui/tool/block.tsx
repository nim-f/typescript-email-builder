import React, { FC, useState } from 'react'
import { useDrag, DragSourceMonitor, DragLayerMonitor } from 'react-dnd'
import uniqid from 'uniqid'
import classNames from 'classnames'

import { SETTINGS } from 'src/constants'
import { Box } from 'src/types'

import s from './toolblock.module.css'

import { getObjectValue } from '../../../utils/objectHelper'
import { useEmailContext } from '../../../hooks/useEmailContext'

export const BlockTool: FC<Box> = ({ name, type }) => {
    const { addItem } = useEmailContext()

    const onEndDrag = (item: Box | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult()

        if (item && dropResult) {
            const id = uniqid()
            const newBlock = {
                ...item,
                parent: dropResult.id,
                id,
            }

            const settings = getObjectValue(SETTINGS, item.name) //[item.name as keyof typeof defaultSettings]
            addItem([{ ...newBlock, settings, items: [] }])

            // alert(`You dropped ${item.name} into ${dropResult.name}!`)
        }
    }

    const [{ isDragging }, drag] = useDrag({
        item: { name, type },
        end: onEndDrag,
        collect: (monitor: DragLayerMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.4 : 1

    return (
        <div
            ref={drag}
            style={{ opacity }}
            className={classNames(s.block, s.tool)}
        >
            {name}
        </div>
    )
}
