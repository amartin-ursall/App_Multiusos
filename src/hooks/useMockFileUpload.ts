import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
export interface MockFile {
  id: string;
  name: string;
  size: number; // in bytes
}
export const useMockFileUpload = () => {
  const [files, setFiles] = useState<MockFile[]>([]);
  const addFile = () => {
    const fileNumber = files.length + 1;
    const newFile: MockFile = {
      id: uuidv4(),
      name: `documento_${fileNumber}.pdf`,
      size: Math.floor(Math.random() * (5 * 1024 * 1024)) + 102400, // 100KB to 5MB
    };
    setFiles((prev) => [...prev, newFile]);
  };
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };
  const reorderFiles = (oldIndex: number, newIndex: number) => {
    setFiles((prev) => arrayMove(prev, oldIndex, newIndex));
  };
  const resetFiles = () => {
    setFiles([]);
  };
  return { files, addFile, removeFile, reorderFiles, resetFiles };
};