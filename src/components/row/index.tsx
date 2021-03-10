import React, { FC } from 'react'
import { IRow } from '../../types/row'
import { DNDArea } from '../dnd_area'
import { AppContext } from '../../context'

export const Row: FC<IRow> = ({ length, id, data }) => {
    const cells = new Array(length).fill(0)

    return (
        <AppContext.Consumer>
            {({ changeItem }) => (
                <div style={{ display: 'flex', width: '100%', padding: 10 }}>
                    {cells.map((value, index) => (
                        <div
                            style={{
                                width: `${100 / length}%`,
                                border: '1px solid #333',
                            }}
                        >
                            <DNDArea
                                name={'row-dnd'}
                                width={100}
                                height={30}
                                data={data}
                                id={id}
                                changeItem={changeItem}
                            />
                        </div>
                    ))}
                </div>
            )}
        </AppContext.Consumer>
    )
}
