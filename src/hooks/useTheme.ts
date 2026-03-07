import { themeContext, type themeContextValue } from "../context/themeContext";
import { useContext } from "react";



export function useTheme(): themeContextValue{
    const context = useContext(themeContext);
    if(!context) throw new Error("useTheme must be used inside theme context provider")
    return context;
}