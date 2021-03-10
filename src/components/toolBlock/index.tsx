import React, { FC, CSSProperties } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import uniqid from 'uniqid'

import { BoxProps, Box } from '../../types/box'

const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export const ToolBlock: FC<BoxProps> = ({
    name,
    type,
    children,
    id,
    toggleBlock,
}) => {
    const [{ isDragging }, drag] = useDrag({
        item: { name, type, id },
        end: (item: Box | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                const id = item.id || uniqid()
                toggleBlock({ ...item, parent: dropResult.id, id })
                // alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.4 : 1

    return (
        <div ref={drag} style={{ ...style, opacity }}>
            {name}
            {children}
        </div>
    )
}
