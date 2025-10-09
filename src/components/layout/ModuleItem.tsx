import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Module } from '@/lib/constants';
import { useUiStore } from '@/store/uiStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ModuleItemProps {
  mod: Module;
  isMobile?: boolean;
  collapsed?: boolean;
  showIconOnly?: boolean;
}

export function ModuleItem({ mod, isMobile = false, collapsed }: ModuleItemProps) {
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const handleClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Determinar la ruta a la que debe dirigirse el enlace
  const getModulePath = () => {
    // Si es el módulo de plantillas, redirigir a la página de cargar-app
    if (mod.path === '/plantillas') {
      return '/plantillas/cargar-app';
    }
    // Para otros módulos, usar la ruta normal
    return mod.path;
  };
  
  const renderLink = ({ isActive }: { isActive: boolean }) => (
    <div className={cn(
      'flex items-center rounded-md p-2 text-sm font-medium transition-colors',
      !collapsed && 'space-x-3',
      'hover:bg-accent hover:text-accent-foreground',
      isActive
        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
        : 'text-muted-foreground',
      collapsed && 'justify-center'
    )}>
      <mod.Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span>{mod.name}</span>}
    </div>
  );
  
  // Si está colapsado, mostrar un tooltip con el nombre del módulo
  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={getModulePath()}
              onClick={handleClick}
            >
              {renderLink}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{mod.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <NavLink
      to={getModulePath()}
      onClick={handleClick}
    >
      {renderLink}
    </NavLink>
  );
}