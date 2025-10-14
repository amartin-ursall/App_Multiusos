import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { AppLayout } from '@/components/layout/AppLayout';
import { InicioPage } from '@/pages/modules/InicioPage';
import { PdfPage } from '@/pages/modules/PdfPage';
import { ImagesPage } from '@/pages/modules/ImagesPage';
import { TemplatesPage } from '@/pages/modules/TemplatesPage';
import { ConnectorPage } from '@/pages/modules/ConnectorPage';
import { QueryPage } from '@/pages/modules/QueryPage';
import { DocumentsPage } from '@/pages/modules/DocumentsPage';
import { OrganizationPage } from '@/pages/modules/OrganizationPage';
import { PdfMergePage } from '@/pages/tools/PdfMergePage';
import { PdfSplitPage } from '@/pages/tools/PdfSplitPage';
import { PdfCompressPage } from '@/pages/tools/PdfCompressPage';
import { PdfSignPage } from '@/pages/tools/PdfSignPage';
import { ImageCompressPage } from '@/pages/tools/ImageCompressPage';
import { ImageResizePage } from '@/pages/tools/ImageResizePage';
import { ImageCropPage } from '@/pages/tools/ImageCropPage';
import { ImageConvertToJpgPage } from '@/pages/tools/ImageConvertToJpgPage';
import { TemplateGalleryPage } from '@/pages/tools/TemplateGalleryPage';
import { TemplateManagePage } from '@/pages/tools/TemplateManagePage';
import { TemplateBuilderPage } from '@/pages/tools/TemplateBuilderPage';
import ExternalAppLoaderPage from '@/pages/modules/templates/ExternalAppLoaderPage';
import AsanaPage from '@/pages/modules/AsanaPage';
import { ConnectorNewPage } from '@/pages/tools/ConnectorNewPage';
import { ConnectorManagePage } from '@/pages/tools/ConnectorManagePage';
import { ConnectorSyncPage } from '@/pages/tools/ConnectorSyncPage';
import { DocumentOcrPage } from '@/pages/tools/DocumentOcrPage';
import { DocumentComparePage } from '@/pages/tools/DocumentComparePage';
import { DocumentSignatureRequestPage } from '@/pages/tools/DocumentSignatureRequestPage';
import { DocumentProtectPage } from '@/pages/tools/DocumentProtectPage';
import { PdfToOfficePage } from '@/pages/tools/PdfToOfficePage';
import { PdfRedactPage } from '@/pages/tools/PdfRedactPage';
import { ImageRemoveBackgroundPage } from '@/pages/tools/ImageRemoveBackgroundPage';
import { ImageConvertToGifPage } from '@/pages/tools/ImageConvertToGifPage';
import { ConnectorWebhooksPage } from '@/pages/tools/ConnectorWebhooksPage';
import SensitivePage from '@/pages/modules/SensitivePage';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/inicio", element: <InicioPage /> },
      { path: "/pdf", element: <PdfPage /> },
      { path: "/pdf/unir", element: <PdfMergePage /> },
      { path: "/pdf/dividir", element: <PdfSplitPage /> },
      { path: "/pdf/comprimir", element: <PdfCompressPage /> },
      { path: "/pdf/firmar", element: <PdfSignPage /> },
      { path: "/pdf/a-word", element: <PdfToOfficePage /> },
      { path: "/pdf/a-powerpoint", element: <PdfToOfficePage /> },
      { path: "/pdf/a-excel", element: <PdfToOfficePage /> },
      { path: "/pdf/redactar", element: <PdfRedactPage /> },
      { path: "/imagenes", element: <ImagesPage /> },
      { path: "/imagenes/comprimir", element: <ImageCompressPage /> },
      { path: "/imagenes/redimensionar", element: <ImageResizePage /> },
      { path: "/imagenes/recortar", element: <ImageCropPage /> },
      { path: "/imagenes/convertir-jpg", element: <ImageConvertToJpgPage /> },
      { path: "/imagenes/convertir-gif", element: <ImageConvertToGifPage /> },
      { path: "/imagenes/eliminar-fondo", element: <ImageRemoveBackgroundPage /> },
      { path: "/plantillas", element: <TemplatesPage /> },
      { path: "/plantillas/crear", element: <TemplateBuilderPage /> },
      { path: "/plantillas/explorar", element: <TemplateGalleryPage /> },
      { path: "/plantillas/mis-plantillas", element: <TemplateManagePage /> },
      { path: "/plantillas/cargar-app", element: <ExternalAppLoaderPage /> },
      { path: "/asana", element: <AsanaPage /> },
      { path: "/sensibles", element: <SensitivePage /> },
      { path: "/conector", element: <ConnectorPage /> },
      { path: "/conector/nueva", element: <ConnectorNewPage /> },
      { path: "/conector/gestionar", element: <ConnectorManagePage /> },
      { path: "/conector/sincronizacion", element: <ConnectorSyncPage /> },
      { path: "/conector/webhooks", element: <ConnectorWebhooksPage /> },
      { path: "/consultar", element: <QueryPage /> },
      { path: "/documentos", element: <DocumentsPage /> },
      { path: "/documentos/ocr", element: <DocumentOcrPage /> },
      { path: "/documentos/comparar", element: <DocumentComparePage /> },
      { path: "/documentos/firma-electronica", element: <DocumentSignatureRequestPage /> },
      { path: "/documentos/proteger", element: <DocumentProtectPage /> },
      { path: "/organizacion", element: <OrganizationPage /> },
    ]
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)