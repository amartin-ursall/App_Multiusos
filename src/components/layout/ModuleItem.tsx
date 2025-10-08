import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Module } from '@/lib/constants';
import { useUiStore } from '@/store/uiStore';
interface ModuleItemProps {
  mod: Module;
  isMobile?: boolean;
}
export function ModuleItem({ mod, isMobile = false }: ModuleItemProps) {
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const handleClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  return (
    <NavLink
      to={mod.path}
      onClick={handleClick}
      className={({ isActive }) =>
        cn(
          'flex items-center space-x-3 rounded-md p-2 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          isActive
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'text-muted-foreground'
        )
      }
    >
      <mod.Icon className="h-5 w-5" />
      <span>{mod.name}</span>
    </NavLink>
  );
}