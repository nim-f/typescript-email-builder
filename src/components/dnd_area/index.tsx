import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { ITEM_TYPES } from '../../utils/itemTypes'
import { Row } from '../row'
import { ToolBlock } from '../toolBlock'
import { IDndArea } from '../../types/dnd'
import { EmailBox } from '../../types/box'

export const DNDArea: FC<IDndArea> = ({
    name,
    height,
    width,
    id,
    data,
    changeItem,
}) => {
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept:
            id === 'root'
                ? [ITEM_TYPES.row]
                : [ITEM_TYPES.row, ITEM_TYPES.block],

        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            } else {
                return { name, id }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    })

    let backgroundColor = '#222'
    if (isOverCurrent || isOver) {
        backgroundColor = 'darkgreen'
    }
    return (
        <div
            style={{
                minHeight: height,
                minWidth: width,
                border: '1px solid #ddd',
                display: 'flex',
                flexDirection: id === 'root' ? 'column' : 'row',
            }}
            ref={drop}
        >
            {isOverCurrent ? 'Release to drop' : 'Drag a box here'}
            {data?.map((item: EmailBox) => {
                if (item.type === 'row') {
                    return (
                        <ToolBlock
                            {...item}
                            toggleBlock={changeItem}
                        >
                            <Row
                                {...item}
                            />
                        </ToolBlock>
                    )
                }
                return (
                    <ToolBlock
                        {...item}
                        toggleBlock={changeItem}
                    >
                        <div style={{ border: '1px solid #000' }}>
                            block {item.name}
                        </div>
                    </ToolBlock>
                )
            })}
        </div>
    )
}
