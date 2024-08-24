// src/hooks/useUser.ts
import { UserContext } from '@/contexts/UserContexts';
import { useContext } from 'react';

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default useUser;
