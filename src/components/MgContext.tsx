import React, { ReactNode, createContext } from 'react';
import { SnackbarProvider } from '../utils/SnackBar';

interface MyContextType
{
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MgProvider = createContext<MyContextType | null>(null);


const MgContext: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    const [loading, setLoading] = React.useState<boolean>(false);

    return (
        <SnackbarProvider>

            <MgProvider.Provider value={ { loading, setLoading } }>
                { children }
            </MgProvider.Provider>
        </SnackbarProvider>

    )
}

export default MgContext;

