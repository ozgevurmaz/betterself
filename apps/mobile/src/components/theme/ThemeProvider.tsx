import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTokens, lightTokens, radii, space, fontSize, Tokens } from './tokens';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  isDark: boolean;
  colors: Tokens;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'theme:mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setModeState(saved);
      }
    })();
  }, []);

  const setMode = async (m: ThemeMode) => {
    setModeState(m);
    await AsyncStorage.setItem(STORAGE_KEY, m);
  };

  const isDark = useMemo<boolean>(() => {
    const effective: ColorSchemeName = mode === 'system' ? systemScheme : mode;
    return effective === 'dark';
  }, [mode, systemScheme]);

  const colors: Tokens = useMemo(() => {
    const base = isDark ? darkTokens : lightTokens;
    return { ...base, radii, space, fontSize };
  }, [isDark]);

  const value = useMemo(() => ({ mode, setMode, isDark, colors }), [mode, isDark, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};