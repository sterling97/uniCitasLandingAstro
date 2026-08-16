# LandingAstro

Landing page estático (Astro) replicable entre empresas cambiando solo
contenido e imágenes. **Lee `CLAUDE.md`** para el flujo de trabajo completo.

```bash
pnpm install
pnpm dev         # http://localhost:4321
pnpm build       # → dist/
```

- Contenido: `src/config/content.ts` + `public/images/`
- Formato (no tocar al rebrandear): `src/components/`, `src/layouts/`, `src/styles/`
