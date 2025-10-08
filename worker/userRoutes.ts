import { Hono } from "hono";
import { Env } from './core-utils';
import { Message, UploadApplication } from '../src/types';
// Helper for simulating delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/pdf', (c) => c.json({ module: "pdf", status: "placeholder" }));
    app.get('/api/imagenes', (c) => c.json({ module: "imagenes", status: "placeholder" }));
    app.get('/api/plantillas', (c) => c.json({ module: "plantillas", status: "placeholder" }));
    app.get('/api/conector', (c) => c.json({ module: "conector", status: "placeholder" }));
    app.get('/api/consultar', (c) => c.json({ module: "consultar", status: "placeholder" }));
    app.get('/api/documentos', (c) => c.json({ module: "documentos", status: "placeholder" }));
    app.get('/api/organizacion', (c) => c.json({ module: "organizacion", status: "placeholder" }));
    // Endpoint for the Query module chatbot
    app.post('/api/query/chat', async (c) => {
        const { message } = await c.req.json<{ message: string }>();
        await sleep(1500); // Simulate processing delay
        if (!message) {
            return c.json({ error: 'Message is required' }, 400);
        }
        const responseContent = `He recibido tu consulta sobre la base de datos de SegElevia: "${message}". En este momento, soy una simulación. En una futura implementación, procesaría esta consulta para devolverte datos reales sobre mantenimientos, ascensores y clientes.`;
        return c.json({
            reply: responseContent,
        });
    });
    // New endpoint for the Organization module chatbot
    app.post('/api/organization/chat', async (c) => {
        const { messages, application } = await c.req.json<{ messages: Message[], application: UploadApplication }>();
        await sleep(1500);
        if (!messages || messages.length === 0 || !application) {
            return c.json({ error: 'Messages array and application are required' }, 400);
        }
        const userMessages = messages.filter(m => m.role === 'user');
        let reply = '';
        if (userMessages.length === 1) {
            reply = 'Entendido. ¿Cuál es el nombre del proyecto asociado a este documento?';
        } else if (userMessages.length === 2) {
            reply = 'Perfecto. ¿A qué departamento pertenece (ej. Marketing, Finanzas, IT)?';
        } else {
            const projectName = userMessages[1]?.content || 'ProyectoGeneral';
            const department = userMessages[2]?.content || 'General';
            const appName = application === 'dropbox' ? 'Dropbox' : 'SharePoint';
            const path = `/${appName}/Archivos/${department}/${projectName}/${messages[0]?.content || 'documento.pdf'}`;
            reply = `¡Genial! He generado la ruta de carga para ti. El documento se subirá a:\n\n\`${path}\`\n\n¿Confirmas la operación? (Responde "sí" para confirmar)`;
        }
        if (userMessages.length > 3 && userMessages.at(-1)?.content.toLowerCase().trim() === 'sí') {
            reply = '¡Confirmado! El documento ha sido subido exitosamente. Puedes iniciar un nuevo proceso si lo deseas.';
        }
        return c.json({ reply });
    });
}