import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableFileItem } from './SortableFileItem';
import { MockFile } from '@/hooks/useMockFileUpload';
interface SortableFileListProps {
  files: MockFile[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  onRemove: (id: string) => void;
}
export function SortableFileList({ files, onReorder, onRemove }: SortableFileListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={files} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {files.map((file) => (
            <SortableFileItem key={file.id} file={file} onRemove={onRemove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}