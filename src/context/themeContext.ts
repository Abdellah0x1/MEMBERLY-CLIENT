import { createContext,  } from "react";

export type themeContextValue = {
    theme: string,
    toggleTheme: () => void
}

export const themeContext = createContext<themeContextValue | undefined>( undefined);




