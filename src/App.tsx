import React, { FC } from 'react'
import { Home } from './pages/home'
import { EmailProvider } from './hooks/useEmailContext'
import { Header } from './components/header'

export const App: FC = (): React.ReactElement => {
    return (
        <EmailProvider>
            <Header />
            <Home />
        </EmailProvider>
    )
}
