import React, { FC, ReactElement } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DNDArea } from '../../components/dnd_area'
import { ToolBlock } from '../../components/toolBlock'
import { ITEM_TYPES } from '../../utils/itemTypes'
import { AppContext } from '../../context'

export const Home: FC = (): ReactElement => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <AppContext.Consumer>
                    {({ three, addItem, changeItem }) => (
                        <div style={{ display: 'flex' }}>
                            <DNDArea
                                name={'root'}
                                height={600}
                                width={600}
                                data={three}
                                id={'root'}
                                changeItem={changeItem}
                            />
                            <div>
                                <ToolBlock
                                    name={'row'}
                                    type={ITEM_TYPES.row}
                                    toggleBlock={addItem}
                                />
                                <ToolBlock
                                    name={'logo'}
                                    type={ITEM_TYPES.block}
                                    toggleBlock={addItem}
                                />
                            </div>
                        </div>
                    )}
                </AppContext.Consumer>
            </DndProvider>
        </div>
    )
}
