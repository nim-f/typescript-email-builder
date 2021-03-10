import React, { FC, CSSProperties, useState } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import uniqid from 'uniqid'
import classNames from 'classnames'

import { BoxProps, Box } from '../../types/box'

import s from './toolblock.module.css'

export const ToolBlock: FC<BoxProps> = ({
    name,
    type,
    children,
    id,
    toggleBlock,
    sidebar,
}) => {
    const [cellsLength, setCellsLength] = useState(3)
    const [{ isDragging }, drag] = useDrag({
        item: { name, type, id },
        end: (item: Box | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                const id = item.id || uniqid()
                const newBlock = { ...item, parent: dropResult.id, id }

                if (type === 'row') {
                    const cells = Array(cellsLength)
                        .fill({
                            parent: id,
                            type: 'row',
                        }).map((val) => ({ ...val, id: uniqid() }))
                    toggleBlock([...cells, newBlock])
                } else {
                    toggleBlock([newBlock])
                }

                // alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.4 : 1

    return (
        <div
            ref={drag}
            style={{ opacity }}
            className={classNames(s.block, { [s.tool]: sidebar })}
        >
            {name}
            {children}

            {sidebar && type === 'row' && (
                <div>
                    <label>Cells: <input type="number" value={cellsLength} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value
                        setCellsLength(parseInt(val))
                    }} /></label>
                    <button>edit</button>
                </div>
            )}
        </div>
    )
}
