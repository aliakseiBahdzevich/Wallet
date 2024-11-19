import React, { createContext, useContext, useState } from 'react';
import { themes } from '../styles/themes'; // Объекты тем

interface ThemeContextProps {
  theme: typeof themes.light; // Тип текущей темы
  toggleTheme: () => void;    // Функция переключения темы
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: themes.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme: isDarkMode ? themes.dark : themes.light, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
