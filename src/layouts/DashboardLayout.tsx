import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  TableProperties,
  BarChart,
  Calendar,
  Kanban,
  Settings,
  Menu,
  ChevronLeft,
  Sun,
  Moon,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { mode, color, toggleColorMode } = useTheme();
  const currentPath = window.location.pathname;

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/' },
    { text: 'Tables', icon: <TableProperties size={24} />, path: '/tables' },
    { text: 'Charts', icon: <BarChart size={24} />, path: '/charts' },
    { text: 'Calendar', icon: <Calendar size={24} />, path: '/calendar' },
    { text: 'Kanban', icon: <Kanban size={24} />, path: '/kanban' },
    { text: 'Settings', icon: <Settings size={24} />, path: '/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={`bg-card border-r border-border shadow-md transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-[240px]'
          }`}
      >
        {/* Sidebar header */}
        <div className="h-14 flex items-center justify-between px-3 py-3 border-b border-border/40">
          {!isCollapsed ? (
            <>
              <span className="text-lg font-semibold text-foreground">Hello</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-muted"
                onClick={() => setIsCollapsed(true)}
              >
                <ChevronLeft size={18} />
              </Button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted"
                onClick={() => setIsCollapsed(false)}
              >
                <Menu size={20} />
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar menu */}
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path ||
                (item.path !== '/' && currentPath.startsWith(item.path));

              return (
                <Button
                  key={item.text}
                  variant="ghost"
                  className={`w-full justify-start ${isCollapsed ? 'justify-center px-1' : 'px-4'
                    } mb-2 py-3 relative group ${isActive 
                    ? 'bg-theme-accent text-theme font-medium' 
                    : 'hover-theme text-foreground/90 transition-all duration-200'
                    }`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center">
                    <span className={`${isActive 
                      ? 'text-theme active-nav-item' 
                      : 'text-muted-foreground group-hover:text-theme transition-colors duration-200'}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className={`ml-3 text-[15px] ${isActive 
                        ? 'font-medium text-theme active-nav-item' 
                        : 'text-muted-foreground group-hover:text-theme group-hover:translate-x-0.5 transition-all duration-200'}`}>
                        {item.text}
                      </span>
                    )}
                  </div>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-border/50 bg-card flex items-center justify-between px-4 shadow-sm">
          <h1 className="text-xl font-semibold text-foreground">
            {menuItems.find(item => item.path === currentPath || 
              (item.path !== '/' && currentPath.startsWith(item.path)))?.text || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleColorMode}
              className="rounded-full h-8 w-8 p-0 flex items-center justify-center border border-border"
            >
              {mode === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-primary" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full p-0 border-2 border-border">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback className="bg-muted-foreground text-background font-medium">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <div className="max-w-[2000px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
