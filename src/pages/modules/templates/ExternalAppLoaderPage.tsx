import React from 'react';
import { ExternalAppFrame } from '@/components/templates/ExternalAppFrame';

export default function ExternalAppLoaderPage() {
  return (
    <div className="h-full w-full">
      <ExternalAppFrame height="100vh" allowUrlChange={false} />
    </div>
  );
}