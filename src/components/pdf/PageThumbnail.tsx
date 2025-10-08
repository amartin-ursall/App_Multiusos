import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
interface PageThumbnailProps {
  pageNumber: number;
  isSelected: boolean;
  onToggle: (pageNumber: number) => void;
}
export function PageThumbnail({ pageNumber, isSelected, onToggle }: PageThumbnailProps) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => onToggle(pageNumber)}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onToggle(pageNumber)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
    >
      <Card
        className={cn(
          'overflow-hidden transition-all duration-200',
          isSelected
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
            : 'ring-1 ring-border'
        )}
      >
        <CardContent className="flex aspect-[3/4] flex-col items-center justify-center p-2">
          <div className="flex h-full w-full items-center justify-center rounded-sm bg-muted">
            <span className="text-2xl font-bold text-muted-foreground">{pageNumber}</span>
          </div>
        </CardContent>
      </Card>
      <div className="absolute right-2 top-2">
        <Checkbox checked={isSelected} className="h-5 w-5" />
      </div>
    </div>
  );
}