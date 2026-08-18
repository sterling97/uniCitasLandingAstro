// @ts-check
import { defineConfig } from 'astro/config';

// Hosts autorizados a servir el preview de producción (Railway).
// RAILWAY_PUBLIC_DOMAIN lo inyecta Railway automáticamente en el contenedor.
// ALLOWED_HOSTS (separado por comas) permite añadir dominios propios.
const allowedHosts = [
  process.env.RAILWAY_PUBLIC_DOMAIN,
  ...(process.env.ALLOWED_HOSTS?.split(',') ?? []),
]
  .map((host) => host?.trim())
  .filter(Boolean);

// https://astro.build/config
export default defineConfig({
  // Sitio 100% estático: HTML generado en build, sin JS de cliente.
  vite: {
    preview: {
      allowedHosts,
    },
  },
});
