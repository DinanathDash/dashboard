import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  toggleColorMode: () => void;
  changeThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const themeColors = {
  blue: {
    light: '#2563eb',
    dark: '#1d4ed8',
    hsl: '221 83% 53%',
    gradient: 'from-blue-500 to-indigo-600'
  },
  green: {
    light: '#10b981',
    dark: '#059669',
    hsl: '162 84% 39%',
    gradient: 'from-emerald-500 to-teal-600'
  },
  purple: {
    light: '#8b5cf6',
    dark: '#7c3aed',
    hsl: '256 94% 66%',
    gradient: 'from-violet-500 to-purple-600'
  },
  orange: {
    light: '#f97316',
    dark: '#ea580c',
    hsl: '24 95% 53%',
    gradient: 'from-orange-500 to-amber-600'
  },
  red: {
    light: '#ef4444',
    dark: '#dc2626',
    hsl: '0 84% 60%',
    gradient: 'from-rose-500 to-red-600'
  },
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [color, setColor] = useState<ThemeColor>('blue');

  useEffect(() => {
    // Load theme settings from localStorage if available
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    const savedColor = localStorage.getItem('themeColor') as ThemeColor;

    if (savedMode) setMode(savedMode);
    if (savedColor) setColor(savedColor);

    // Apply theme to document
    document.documentElement.classList.toggle('dark', mode === 'dark');
    
    // Apply theme color and gradient classes
    const colorGradient = themeColors[color].gradient;
    document.documentElement.dataset.colorGradient = colorGradient;

    // Apply theme color using CSS variables
    document.documentElement.style.setProperty('--primary', themeColors[color].hsl);
    
    // Light/dark mode base colors
    if (mode === 'light') {
      document.documentElement.style.setProperty('--background', 'hsl(0 0% 99%)');
      document.documentElement.style.setProperty('--foreground', 'hsl(0 0% 9%)');
      document.documentElement.style.setProperty('--muted', 'hsl(0 0% 96%)');
      document.documentElement.style.setProperty('--muted-foreground', 'hsl(0 0% 45%)');
      document.documentElement.style.setProperty('--card', 'hsl(0 0% 100%)');
      document.documentElement.style.setProperty('--card-foreground', 'hsl(0 0% 9%)');
      document.documentElement.style.setProperty('--border', 'hsl(0 0% 90%)');
      document.documentElement.style.setProperty('--input', 'hsl(0 0% 90%)');
      document.documentElement.style.setProperty('--accent', 'hsl(0 0% 96%)');
      document.documentElement.style.setProperty('--accent-foreground', 'hsl(0 0% 9%)');
      document.documentElement.style.setProperty('--popover', 'hsl(0 0% 100%)');
      document.documentElement.style.setProperty('--popover-foreground', 'hsl(0 0% 9%)');
    } else {
      document.documentElement.style.setProperty('--background', 'hsl(220 10% 9%)');
      document.documentElement.style.setProperty('--foreground', 'hsl(0 0% 99%)');
      document.documentElement.style.setProperty('--muted', 'hsl(215 10% 15%)');
      document.documentElement.style.setProperty('--muted-foreground', 'hsl(0 0% 65%)');
      document.documentElement.style.setProperty('--card', 'hsl(220 10% 12%)');
      document.documentElement.style.setProperty('--card-foreground', 'hsl(0 0% 99%)');
      document.documentElement.style.setProperty('--border', 'hsl(220 10% 18%)');
      document.documentElement.style.setProperty('--input', 'hsl(220 10% 20%)');
      document.documentElement.style.setProperty('--accent', 'hsl(220 10% 15%)');
      document.documentElement.style.setProperty('--accent-foreground', 'hsl(0 0% 99%)');
      document.documentElement.style.setProperty('--popover', 'hsl(220 10% 12%)');
      document.documentElement.style.setProperty('--popover-foreground', 'hsl(0 0% 99%)');
    }
    
    // Common variables
    document.documentElement.style.setProperty('--primary-foreground', 'hsl(0 0% 100%)');
    document.documentElement.style.setProperty('--ring', themeColors[color].hsl);
  }, [mode, color]);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const changeThemeColor = (newColor: ThemeColor) => {
    setColor(newColor);
    localStorage.setItem('themeColor', newColor);
  };

  const contextValue = {
    mode,
    color,
    toggleColorMode,
    changeThemeColor,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
