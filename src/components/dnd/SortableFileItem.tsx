import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, FileText, X } from 'lucide-react';
import { MockFile } from '@/hooks/useMockFileUpload';
interface SortableFileItemProps {
  file: MockFile;
  onRemove: (id: string) => void;
}
export function SortableFileItem({ file, onRemove }: SortableFileItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: file.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  return (
    <div ref={setNodeRef} style={style}>
      <Card className="flex items-center p-2 pr-3 shadow-sm">
        <div {...attributes} {...listeners} className="cursor-grab p-2 text-muted-foreground hover:text-foreground">
          <GripVertical className="h-5 w-5" />
        </div>
        <FileText className="h-8 w-8 flex-shrink-0 text-primary" />
        <div className="ml-3 flex-grow overflow-hidden">
          <p className="truncate font-medium text-sm">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-2 h-8 w-8 flex-shrink-0" onClick={() => onRemove(file.id)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Eliminar archivo</span>
        </Button>
      </Card>
    </div>
  );
}