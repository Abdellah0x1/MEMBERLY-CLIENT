import { useState } from 'react'
import {themeContext, type themeContextValue} from './themeContext'
import { type ReactNode } from 'react'



export const ThemeProvider = ({children}: {children: ReactNode})=> {
    const [theme, setTheme] = useState<string>('light')
    function toggleTheme(){
        return theme == 'light' ? setTheme('dark') : setTheme('light');
    }
    const value : themeContextValue ={ 
        theme,
        toggleTheme
    }
    
    return <themeContext.Provider value={value}>
        {children}
    </themeContext.Provider>
}





