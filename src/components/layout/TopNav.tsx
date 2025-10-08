import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { APP_NAME, MODULES } from '@/lib/constants';
import { useUiStore } from '@/store/uiStore';
import { Menu, Moon, Sun, Monitor, Bell, LogOut, Check } from 'lucide-react';
import { ModuleItem } from './ModuleItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
type HealthStatus = 'checking' | 'ok' | 'error';
interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
}
const mockUser = {
  name: 'Alex Moreno',
  email: 'alex.moreno@example.com',
  avatar: 'https://github.com/shadcn.png',
};
const mockNotifications: Notification[] = [
  { id: '1', title: 'Nuevo informe disponible', description: 'El informe de ventas del Q3 está listo.', read: false },
  { id: '2', title: 'Sincronización completada', description: 'La conexión con Salesforce se ha sincronizado.', read: false },
  { id: '3', title: 'Firma requerida', description: 'El documento "Contrato NDA" necesita tu firma.', read: true },
];
export function TopNav() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('checking');
  const [notifications, setNotifications] = useState(mockNotifications);
  const setTheme = useUiStore((state) => state.setTheme);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.get('/health');
        setHealthStatus('ok');
      } catch (error) {
        console.error('API health check failed:', error);
        setHealthStatus('error');
      }
    };
    checkHealth();
  }, []);
  const healthStatusMap: Record<HealthStatus, { color: string; text: string }> = {
    checking: { color: 'bg-gray-400 animate-pulse', text: 'Comprobando estado de la API...' },
    ok: { color: 'bg-green-500', text: 'La API est�� en línea' },
    error: { color: 'bg-yellow-500', text: 'Problema de conexión con la API' },
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">{APP_NAME}</span>
          </a>
        </div>
        <div className="md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <a href="/" className="flex items-center">
                <span className="font-bold">{APP_NAME}</span>
              </a>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {MODULES.map((mod) => (
                    <ModuleItem key={mod.path} mod={mod} isMobile={true} />
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search placeholder can go here */}
          </div>
          <nav className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className={cn("h-2.5 w-2.5 rounded-full", healthStatusMap[healthStatus].color)} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{healthStatusMap[healthStatus].text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                  <span className="sr-only">Notificaciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <DropdownMenuItem key={n.id} onSelect={(e) => e.preventDefault()} className={cn("flex items-start gap-2", !n.read && "font-semibold")}>
                      <div className={cn("h-2 w-2 rounded-full mt-1.5 flex-shrink-0", !n.read && "bg-primary")} />
                      <div className="flex-grow">
                        <p>{n.title}</p>
                        <p className={cn("text-xs text-muted-foreground", !n.read && "font-normal")}>{n.description}</p>
                      </div>
                      {!n.read && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markAsRead(n.id)}>
                                <Check className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Marcar como le��do</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem>
                    <p className="text-sm text-muted-foreground">No hay notificaciones nuevas.</p>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Cambiar tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Claro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Oscuro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>Sistema</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}