import { MODULES } from '@/lib/constants';
import { ModuleItem } from './ModuleItem';
export function RightSidebar() {
  return (
    <aside className="hidden md:block w-64 border-l border-border/40 p-4">
      <div className="space-y-2">
        {MODULES.map((mod) => (
          <ModuleItem key={mod.path} mod={mod} />
        ))}
      </div>
    </aside>
  );
}