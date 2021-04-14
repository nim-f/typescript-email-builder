import React, { FC } from 'react'
import { useDrop } from 'react-dnd'

import { IDndArea, EmailBox } from 'src/types'
import { BLOCK_TYPES } from 'src/constants'

import { Row } from 'src/components/row'
import { TableBlock } from 'src/components/ui'
import { Content } from 'src/components/content'

import s from './dndarea.module.css'

export const DNDArea: FC<IDndArea> = ({
    name,
    height,
    width,
    id,
    data,
}) => {
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept:
            id === 'root'
                ? [BLOCK_TYPES.Row]
                : [BLOCK_TYPES.Row, BLOCK_TYPES.Block],

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

    let backgroundColor = '#fff'
    if (isOverCurrent || isOver) {
        backgroundColor = 'darkgreen'
    }
    return (
        <div
            className={s.dndarea}
            style={{
                backgroundColor,
                minHeight: height,
                minWidth: width,
            }}
            ref={drop}
        >
            {!data.length &&
                <>{ isOverCurrent ? <div>Release to drop</div> : <div>Drag a box here</div> }</>
            }
            {data?.map((item: EmailBox) => {
                if (item.type === 'row') {
                    return (
                        <TableBlock {...item}>
                            <Row {...item} />
                        </TableBlock>
                    )
                }
                return (
                    <TableBlock {...item}>
                        <Content {...item} />
                    </TableBlock>
                )
            })}
        </div>
    )
}
