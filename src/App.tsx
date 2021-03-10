import React, { FC } from 'react'
import { Home } from './pages/home'
import { AppContext } from './context'
import { useEmail } from './hooks/useEmailData'
import { Header } from './components/header'

export const App: FC = (): React.ReactElement => {
    const { addItem, changeItem, three } = useEmail()
    return (
        <AppContext.Provider value={{ three, addItem, changeItem }}>
            <Header />
            <Home />
        </AppContext.Provider>
    )
}
