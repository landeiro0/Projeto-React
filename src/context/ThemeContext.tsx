import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

const light = {
  mode: 'light' as ThemeMode,
  background: '#ffffff',
  text: '#000000',
  input: '#f0f0f0',
};

const dark = {
  mode: 'dark' as ThemeMode,
  background: '#121212',
  text: '#ffffff',
  input: '#1e1e1e',
};

const ThemeContext = createContext<{
  theme: typeof light;
  toggleTheme: () => void;
}>({
  theme: light,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('app_theme');
      if (saved === 'dark') {
        setTheme(dark);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.mode === 'light' ? dark : light;
    setTheme(newTheme);
    await AsyncStorage.setItem('app_theme', newTheme.mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
