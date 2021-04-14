import React, { FC } from 'react'
import { useDrag, DragSourceMonitor, DragLayerMonitor } from 'react-dnd'
import uniqid from 'uniqid'
import classNames from 'classnames'

import { SETTINGS } from 'src/constants'
import { Box } from 'src/types'

import s from './toolblock.module.css'
import { useEmailContext } from 'src/hooks/useEmailContext'


export const RowTool: FC<Box> = ({ name, type }) => {
    const { addItem } = useEmailContext()


    const onEndDrag = (item: Box | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult()

        if (item && dropResult) {
            const id = uniqid()
            const newBlock = {
                ...item,
                parent: dropResult.id,
                id,
                settings: {
                    ...SETTINGS.row,
                },
            }

            const cells = Array(SETTINGS.row.cellsLength)
                .fill({
                    parent: id,
                    type: 'row',
                })
                .map((val) => ({
                    ...val,
                    id: uniqid(),
                }))

            addItem([...cells, newBlock])

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
