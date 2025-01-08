import React, { createContext, useContext, useState} from 'react';  
import { DarkTheme, DefaultTheme, } from '@react-navigation/native';
 
  

interface Theme {  
  dark: boolean;  

}  
  

const ThemeContext = createContext<{  
  theme: Theme;  
  toggleTheme: () => void;  
}>({  
  theme: DefaultTheme as Theme, 
  toggleTheme: () => {},   
});  
  
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const [theme, setTheme] = useState<Theme>(DefaultTheme as Theme); 
  
  const toggleTheme = () => {  
    setTheme(prevTheme => (prevTheme.dark ? DarkTheme as Theme : DefaultTheme as Theme));  
    
  };  
  
  return (  
    <ThemeContext.Provider value={{ theme, toggleTheme }}>  
      {children}  
    </ThemeContext.Provider>  
  );  
};  
  
export const useTheme = () => useContext(ThemeContext);