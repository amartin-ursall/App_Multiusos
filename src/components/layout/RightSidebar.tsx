import { MODULES } from '@/lib/constants';
import { ModuleItem } from './ModuleItem';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RightSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="relative hidden md:flex">
      <aside className={cn(
        "transition-all duration-300 ease-in-out border-l border-border/40 p-4",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className={cn(
          "space-y-2",
          collapsed && "flex flex-col items-center"
        )}>
          {MODULES.map((mod) => (
            <ModuleItem key={mod.path} mod={mod} collapsed={collapsed} />
          ))}
        </div>
      </aside>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 -left-3 h-6 w-6 rounded-full border shadow-sm bg-background"
        onClick={toggleSidebar}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}