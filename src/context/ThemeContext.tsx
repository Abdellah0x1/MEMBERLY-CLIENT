import { useEffect, useState } from 'react'
import {themeContext, type themeContextValue} from './themeContext'
import { type ReactNode } from 'react'



export const ThemeProvider = ({children}: {children: ReactNode})=> {
    const [theme, setTheme] = useState<string>('light')
    function toggleTheme(){
        return theme == 'light' ? setTheme('dark') : setTheme('light');
    }

    useEffect(()=> {
        if(theme == 'light') document.documentElement.classList.remove('dark')
        if(theme == 'dark') document.documentElement.classList.add('dark')
    },[theme])
    const value : themeContextValue ={ 
        theme,
        toggleTheme
    }
    
    return <themeContext.Provider value={value}>
        {children}
    </themeContext.Provider>
}





