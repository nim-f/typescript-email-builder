import React, { FC, ReactElement, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { renderToString } from 'react-dom/server'

import s from './home.module.css'

import { useEmailContext } from '../../hooks/useEmailContext'
import { ToolBar, Preview, DNDArea } from 'src/components/ui'

export const Home: FC = (): ReactElement => {
    const { tree } = useEmailContext()

    const [settings, setSettings] = useState({
        width: 600,
        height: 600,
    })

    const onRenderEmail = (tree: any) => {
        console.log('OUR NICE EMAIL')
        console.log(
            renderToString(<Preview tree={tree} settings={settings} />)
        )
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={s.main}>
                <div className={s.email}>
                    <Preview
                        tree={tree}
                        settings={settings}
                    />
                    <button onClick={() => onRenderEmail(tree)}>print email code to console</button>
                </div>
                <div className={s.email}>
                    <h4>Constructor</h4>

                    <DNDArea
                        name={'root'}
                        height={settings.height}
                        width={settings.width}
                        data={tree}
                        id={'root'}
                    />
                </div>

                <ToolBar />
            </div>
        </DndProvider>
    )
}
