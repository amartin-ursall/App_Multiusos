import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
const MOCK_DOC_A = `El tercer trimestre ha mostrado un crecimiento constante en la adquisición de usuarios, con un aumento del 15% en comparación con el Q2. La participación en los módulos de PDF e Imágenes sigue siendo la más alta.
Métricas Clave:
- Usuarios Activos Mensuales (MAU): 12,450 (+8%)
- Tasa de Retención: 65%
- Nuevas Suscripciones: 1,230
Próximos Pasos:
Se planea lanzar el módulo de Conector en el Q4 para impulsar la integración de datos empresariales.`;
const MOCK_DOC_B = `El tercer trimestre ha mostrado un crecimiento sólido en la adquisición de usuarios, con un aumento del 15% en comparación con el Q2. La participación en los módulos de PDF e Imágenes sigue siendo la más alta.
Métricas Clave:
- Usuarios Activos Mensuales (MAU): 12,850 (+11%)
- Tasa de Retención: 65%
- Nuevas Suscripciones: 1,230
Próximos Pasos:
Se planea lanzar el módulo de Conector en el Q4 para impulsar la integración de datos empresariales. Se asignará un presupuesto de marketing adicional para promocionar las nuevas funcionalidades.`;
export function DocumentCompareView() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Documento A (Original)</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 rounded-md border p-4 font-mono text-sm">
            <p>
              El tercer trimestre ha mostrado un crecimiento{' '}
              <span className="bg-red-100 dark:bg-red-900/30">constante</span> en la adquisición de
              usuarios, con un aumento del 15% en comparación con el Q2. La participación en los
              módulos de PDF e Imágenes sigue siendo la más alta.
            </p>
            <br />
            <p>Métricas Clave:</p>
            <p>
              - Usuarios Activos Mensuales (MAU):{' '}
              <span className="bg-red-100 dark:bg-red-900/30">12,450 (+8%)</span>
            </p>
            <p>- Tasa de Retención: 65%</p>
            <p>- Nuevas Suscripciones: 1,230</p>
            <br />
            <p>Próximos Pasos:</p>
            <p>
              Se planea lanzar el módulo de Conector en el Q4 para impulsar la integración de datos
              empresariales.
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Documento B (Revisado)</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 rounded-md border p-4 font-mono text-sm">
            <p>
              El tercer trimestre ha mostrado un crecimiento{' '}
              <span className="bg-green-100 dark:bg-green-900/30">sólido</span> en la adquisición de
              usuarios, con un aumento del 15% en comparación con el Q2. La participación en los
              módulos de PDF e Imágenes sigue siendo la más alta.
            </p>
            <br />
            <p>Métricas Clave:</p>
            <p>
              - Usuarios Activos Mensuales (MAU):{' '}
              <span className="bg-green-100 dark:bg-green-900/30">12,850 (+11%)</span>
            </p>
            <p>- Tasa de Retención: 65%</p>
            <p>- Nuevas Suscripciones: 1,230</p>
            <br />
            <p>Próximos Pasos:</p>
            <p>
              Se planea lanzar el módulo de Conector en el Q4 para impulsar la integración de datos
              empresariales.{' '}
              <span className="bg-green-100 dark:bg-green-900/30">
                Se asignará un presupuesto de marketing adicional para promocionar las nuevas
                funcionalidades.
              </span>
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}