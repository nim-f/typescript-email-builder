import React, { FC, ReactElement } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DNDArea } from '../../components/dnd_area'
import { ToolBlock } from '../../components/toolBlock'
import { ITEM_TYPES } from '../../utils/itemTypes'
import { AppContext } from '../../context'

import s from './home.module.css'
import { INSTRUMENTS } from '../../utils/instrument'

export const Home: FC = (): ReactElement => {
    return (
        <DndProvider backend={HTML5Backend}>
            <AppContext.Consumer>
                {({ three, addItem, changeItem }) => (
                    <div className={s.main}>
                        <div className={s.email}>
                            <DNDArea
                                name={'root'}
                                height={600}
                                width={600}
                                data={three}
                                id={'root'}
                                changeItem={changeItem}
                            />
                        </div>

                        <div className={s.tools}>
                            <ToolBlock
                                sidebar={true}
                                name={'row'}
                                type={ITEM_TYPES.row}
                                toggleBlock={addItem}
                            />
                            <div>
                                <div>Blocks:</div>
                                {INSTRUMENTS.map((instrument) => (
                                    <ToolBlock
                                        sidebar={true}
                                        name={instrument}
                                        type={ITEM_TYPES.block}
                                        toggleBlock={addItem}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        </DndProvider>
    )
}
