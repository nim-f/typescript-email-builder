import React, { FC } from 'react'
import { Home } from './pages/home'
import { AppContext } from './context'
import { useEmail } from './hooks/useEmailData'

export const App: FC = (): React.ReactElement => {
    const { addItem, changeItem, three } = useEmail()
    return (
        <AppContext.Provider value={{ three, addItem, changeItem }}>
            <div>Mailer app</div>
            <Home />
        </AppContext.Provider>
    )
}
