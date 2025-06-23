import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red';

// Helper function to convert hex colors to RGB format for CSS variables
function hexToRgb(hex: string): string {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return as CSS RGB format
  return `${r}, ${g}, ${b}`;
}

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

    // Apply theme color using CSS variables for shadcn components
    const colorHsl = themeColors[color].hsl;
    
    // Set the --primary CSS variable which is what shadcn/ui components use
    document.documentElement.style.setProperty('--primary', colorHsl);
    
    // Also set a custom property with the actual hex color for direct access
    const hexValue = mode === 'light' ? themeColors[color].light : themeColors[color].dark;
    document.documentElement.style.setProperty('--theme-color', hexValue);
    document.documentElement.style.setProperty('--theme-color-rgb', hexToRgb(hexValue));
    
    // Create a CSS rule to define colors for buttons and other elements throughout the app
    const style = document.createElement('style');
    const rgbValue = hexToRgb(hexValue);
    style.innerHTML = `
      :root {
        --current-theme-color: ${hexValue};
        --current-theme-rgb: ${rgbValue};
      }
      
      /* Base theme colored element */
      .theme-colored {
        background-color: ${hexValue} !important;
        color: white !important;
      }
      
      /* Theme color with opacity variants */
      .bg-theme-soft {
        background-color: rgba(${rgbValue}, 0.1) !important;
      }
      
      .bg-theme-hover {
        background-color: rgba(${rgbValue}, 0.2) !important;
      }
      
      /* Enhanced Button Styling */
      .btn-primary, 
      button[data-variant="default"],
      .data-[state=active]:bg-primary {
        background-color: ${hexValue} !important;
        color: white !important;
      }
      
      /* Active navigation elements */
      .active-nav-item {
        color: ${hexValue} !important;
      }
      
      /* Border accents */
      .border-theme {
        border-color: ${hexValue} !important;
      }
      
      /* Text with theme color */
      .text-theme {
        color: ${hexValue} !important;
      }
      
      /* Custom hover effects */
      .hover-theme:hover {
        background-color: rgba(${rgbValue}, 0.1) !important;
        color: ${hexValue} !important;
      }

      /* Shadows with theme color */
      .shadow-theme {
        box-shadow: 0 0 8px rgba(${rgbValue}, 0.5) !important;
      }
      
      /* Accent backgrounds */
      .bg-theme-accent {
        background-color: rgba(${rgbValue}, 0.15) !important;
      }
      
      /* Progress bars, sliders & other interactive elements */
      progress::-webkit-progress-value,
      .slider-track {
        background-color: ${hexValue} !important;
      }
      
      /* Selected Tab Styles */
      [role="tablist"] [data-state="active"] {
        color: ${hexValue} !important;
        border-color: ${hexValue} !important;
      }
      
      /* Form focus states */
      input:focus, textarea:focus, select:focus {
        border-color: ${hexValue} !important;
        box-shadow: 0 0 0 2px rgba(${rgbValue}, 0.25) !important;
      }
      
      /* Additional utility classes */
      .ring-theme {
        box-shadow: 0 0 0 2px rgba(${rgbValue}, 0.5) !important;
      }
      
      /* Theme colors for different components */
      .theme-bg-opacity-10 { background-color: rgba(${rgbValue}, 0.1) !important; }
      .theme-bg-opacity-20 { background-color: rgba(${rgbValue}, 0.2) !important; }
      .theme-bg-opacity-30 { background-color: rgba(${rgbValue}, 0.3) !important; }
      .theme-text-light { color: rgba(${rgbValue}, 0.8) !important; }
      .theme-border-light { border-color: rgba(${rgbValue}, 0.3) !important; }
      
      /* Chart colors */
      .chart-theme-color { stroke: ${hexValue} !important; fill: ${hexValue} !important; }
      .chart-theme-area { fill: rgba(${rgbValue}, 0.2) !important; }
    `;
    
    // Remove any existing dynamic style
    const existingStyle = document.getElementById('theme-color-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Add the new style to the head
    style.id = 'theme-color-style';
    document.head.appendChild(style);
    
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
