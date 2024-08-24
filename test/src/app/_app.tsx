 
import React from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@/contexts/UserContexts';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
};

export default App;
