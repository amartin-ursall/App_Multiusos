import { PageThumbnail } from './PageThumbnail';
interface PdfPreviewProps {
  pageCount: number;
  selectedPages: Set<number>;
  onPageToggle: (pageNumber: number) => void;
  pagePreviews?: Record<number, string>;
}
export function PdfPreview({ pageCount, selectedPages, onPageToggle, pagePreviews = {} }: PdfPreviewProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
      {pages.map((pageNumber) => (
        <PageThumbnail
          key={pageNumber}
          pageNumber={pageNumber}
          isSelected={selectedPages.has(pageNumber)}
          onToggle={onPageToggle}
          previewUrl={pagePreviews[pageNumber]}
        />
      ))}
    </div>
  );
}