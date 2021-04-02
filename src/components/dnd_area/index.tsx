import React, { FC, useContext } from 'react'
import { useDrop } from 'react-dnd'
import { ITEM_TYPES } from '../../utils/itemTypes'
import { Row } from '../row'
import { TableBlock } from '../tableBlock'
import { IDndArea } from '../../types/dnd'
import { EmailBox } from '../../types/box'
import { Content } from '../content'
import s from './dndarea.module.css'
import { AppContext } from '../../context'

export const DNDArea: FC<IDndArea> = ({
    name,
    height,
    width,
    id,
    data,
}) => {
    const { changeItem } = useContext(AppContext)
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
                        <TableBlock
                            {...item}
                            changeBlock={changeItem}
                        >
                            <Row
                                {...item}
                            />
                        </TableBlock>
                    )
                }
                return (
                    <TableBlock
                        {...item}
                        changeBlock={changeItem}
                    >
                        <div style={{ border: '1px solid #000', width: '100%' }}>
                            block {item.name}
                            <Content name={item.name} settings={item.settings}/>
                        </div>
                    </TableBlock>
                )
            })}
        </div>
    )
}
