import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '../contexts/ThemeContext';

interface ThemeColor {
  name: string;
  color: string;
  gradient: string;
  textColor: string;
  ringColor: string;
}

const themeColors: ThemeColor[] = [
  { name: 'blue', color: '#2563eb', gradient: 'from-blue-500 to-indigo-600', textColor: 'text-white', ringColor: 'ring-blue-400' },
  { name: 'green', color: '#10b981', gradient: 'from-emerald-500 to-teal-600', textColor: 'text-white', ringColor: 'ring-emerald-400' },
  { name: 'purple', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600', textColor: 'text-white', ringColor: 'ring-violet-400' },
  { name: 'orange', color: '#f97316', gradient: 'from-orange-500 to-amber-600', textColor: 'text-white', ringColor: 'ring-orange-400' },
  { name: 'red', color: '#ef4444', gradient: 'from-rose-500 to-red-600', textColor: 'text-white', ringColor: 'ring-rose-400' },
];

export default function Settings() {
  const { mode, color, toggleColorMode, changeThemeColor } = useTheme();
  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [layoutMode, setLayoutMode] = useState('default');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Effect to load saved settings
  useEffect(() => {
    // Load notification settings from localStorage
    const savedEmailNotifications = localStorage.getItem('emailNotifications');
    const savedPushNotifications = localStorage.getItem('pushNotifications');
    const savedLayoutMode = localStorage.getItem('layoutMode');
    
    if (savedEmailNotifications !== null) {
      setEmailNotifications(savedEmailNotifications === 'true');
    }
    
    if (savedPushNotifications !== null) {
      setPushNotifications(savedPushNotifications === 'true');
    }
    
    if (savedLayoutMode) {
      setLayoutMode(savedLayoutMode);
    }
    
    // Sync selectedColor with theme context
    setSelectedColor(color);
  }, [color]);

  const handleColorChange = (color: string) => {
    // Only update the selected color in state, don't apply it yet
    setSelectedColor(color);
  };

  const handleSaveSettings = () => {
    // Save notification settings to localStorage
    localStorage.setItem('emailNotifications', String(emailNotifications));
    localStorage.setItem('pushNotifications', String(pushNotifications));
    localStorage.setItem('layoutMode', layoutMode);
    
    // Apply the selected theme color only when saving
    if (selectedColor !== color) {
      changeThemeColor(selectedColor as any);
    }
    
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="flex-1 space-y-3">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-2 bg-muted/80">
          <TabsTrigger value="appearance" className="data-[state=active]:bg-background">Appearance</TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-background">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <Card className="border-border/50 shadow-md">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg font-semibold text-foreground">Theme Settings</CardTitle>
              <CardDescription className="text-muted-foreground">Customize how the dashboard looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div>
                <h3 className="text-base font-medium mb-3 text-foreground">Mode</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={mode === 'dark' ? toggleColorMode : undefined}
                    style={mode === 'light' ? 
                      {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb', color: 'white'} : 
                      {}}
                    className={`px-4 py-2 rounded-md w-24 text-sm font-medium transition-colors
                      ${mode !== 'light' 
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600' 
                      : ''}`}
                    disabled={mode === 'light'}
                  >
                    Light
                  </button>
                  <button 
                    onClick={mode === 'light' ? toggleColorMode : undefined}
                    style={mode === 'dark' ? 
                      {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb', color: 'white'} : 
                      {}}
                    className={`px-4 py-2 rounded-md w-24 text-sm font-medium transition-colors
                      ${mode !== 'dark' 
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600' 
                      : ''}`}
                    disabled={mode === 'dark'}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium mb-3 text-foreground">Theme Color</h3>
                <div className="flex flex-wrap gap-4">
                  {themeColors.map(themeColor => (
                    <button
                      key={themeColor.name}
                      onClick={() => handleColorChange(themeColor.name)}
                      className={`w-12 h-12 bg-gradient-to-br ${themeColor.gradient} rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background shadow-lg transition-all duration-200 hover:scale-105 ${
                        selectedColor === themeColor.name ? `ring-2 ring-offset-2 ring-offset-background ${themeColor.ringColor}` : ''
                      }`}
                      aria-label={`Select ${themeColor.name} theme`}
                    >
                      {selectedColor === themeColor.name && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className={`w-6 h-6 ${themeColor.textColor}`}
                        >
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSaveSettings}
                  style={{backgroundColor: themeColors.find(t => t.name === selectedColor)?.color || '#2563eb'}}
                  className="w-full px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-colors"
                >
                  Save Settings
                </button>
                {saveMessage && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400 text-center">{saveMessage}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card className="border-border/50 shadow-md">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg text-foreground font-semibold">User Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div>
                <h3 className="text-base font-medium mb-3 text-foreground">Notifications</h3>
                <div className="flex flex-col gap-3 bg-muted/30 p-3 rounded-md border border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium text-foreground">Email notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      style={emailNotifications ? {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb'} : {}}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="space-y-0.5">
                      <h4 className="font-medium text-foreground">Push notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications for important updates
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                      style={pushNotifications ? {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb'} : {}}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium mb-3 text-foreground">Dashboard Layout</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setLayoutMode('compact')}
                    style={layoutMode === 'compact' ? 
                      {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb', color: 'white'} : 
                      {}}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors 
                      ${layoutMode !== 'compact' 
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                      : ''}`}
                  >
                    Compact
                  </button>
                  <button 
                    onClick={() => setLayoutMode('default')}
                    style={layoutMode === 'default' ? 
                      {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb', color: 'white'} : 
                      {}}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${layoutMode !== 'default' 
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                      : ''}`}
                  >
                    Default
                  </button>
                  <button 
                    onClick={() => setLayoutMode('comfortable')}
                    style={layoutMode === 'comfortable' ? 
                      {backgroundColor: themeColors.find(t => t.name === color)?.color || '#2563eb', color: 'white'} : 
                      {}}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${layoutMode !== 'comfortable' 
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                      : ''}`}
                  >
                    Comfortable
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSaveSettings}
                  style={{backgroundColor: themeColors.find(t => t.name === selectedColor)?.color || '#2563eb'}}
                  className="w-full px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-colors"
                >
                  Save Preferences
                </button>
                {saveMessage && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400 text-center">{saveMessage}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
