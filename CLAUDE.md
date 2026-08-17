# LandingAstro — Landing replicable por empresa

Landing page estático construido con **Astro**. El diseño (sistema "Modernist":
tipografía Archivo, retícula editorial, líneas divisorias de 2px, sin bordes
redondeados) es **fijo y compartido**; lo único que cambia entre empresas es el
**contenido**: textos, imágenes y color de acento.

## Regla de oro

> **Contenido y formato están separados a propósito.**
>
> - ✅ **Contenido** → se edita SOLO en `src/config/content.ts` + `public/images/`
> - ❌ **Formato** → `src/components/`, `src/layouts/`, `src/styles/`, `src/pages/` **no se tocan** al adaptar el landing a una empresa nueva

## Cómo interpretar las peticiones del usuario

Cuando el usuario proporcione **nuevos textos y/o imágenes** (aunque no lo diga
explícitamente), significa que quiere **adaptar este mismo landing a otra
empresa o actualizar su contenido**, manteniendo el formato intacto:

1. Copiar las imágenes nuevas a `public/images/` (nombres en kebab-case, p. ej.
   `hero.jpg`, `galeria-1.jpg`, `equipo-lucia.jpg`).
2. Actualizar `src/config/content.ts`: textos, rutas de imagen (`src:
   '/images/...'`), `alt`, marca, color de acento, URL de reservas.
3. **No** modificar componentes, layout, estilos ni la estructura de la página.
4. Si el usuario no da algún dato (p. ej. le falta una foto del equipo), dejar
   `src: null` — el diseño muestra un marcador elegante automáticamente.

Solo si el usuario pide **explícitamente** un cambio de diseño/estructura
("añade una sección", "cambia la tipografía", "quiero bordes redondeados") se
tocan los archivos de formato.

## Estructura del proyecto

```
├── CLAUDE.md                  ← este documento
├── package.json / astro.config.mjs / tsconfig.json
├── public/
│   ├── favicon.svg            ← cuadrado del color de acento (actualizar hex si cambia la marca)
│   ├── fonts/                 ← Archivo variable (woff2 autoalojadas) — NO TOCAR
│   └── images/                ← 📷 AQUÍ van las imágenes de cada empresa
└── src/
    ├── config/
    │   └── content.ts         ← ✏️ ÚNICA FUENTE DE CONTENIDO (textos, rutas de imagen, marca)
    ├── styles/
    │   └── global.css         ← FORMATO: tokens del sistema de diseño + clases (btn, card…)
    ├── layouts/
    │   └── Base.astro         ← FORMATO: <head>, SEO, re-tematizado del acento
    ├── components/            ← FORMATO: una sección del landing por archivo
    │   ├── ImageSlot.astro    ← imagen o marcador si src es null
    │   ├── Nav.astro          ├── Hero.astro         ├── InfoBar.astro
    │   ├── Services.astro     ├── Gallery.astro      ├── Team.astro
    │   ├── Quote.astro        ├── Schedule.astro     ├── CtaBanner.astro
    │   └── Footer.astro
    └── pages/
        └── index.astro        ← FORMATO: orden de las secciones
```

## `content.ts`: mapa de secciones

| Clave en `content.ts` | Sección visible | Notas |
|---|---|---|
| `brand.name` | Logo del nav + footer | |
| `brand.accentColor` | Botones, enlaces, banner final, kickers | Un solo hex re-tematiza todo (la rama tonal se deriva sola) |
| `meta` | `<title>`, description, `lang` | SEO por empresa |
| `bookingUrl` | TODOS los botones "Reservar" | URL de la app uniCitas cuando esté disponible |
| `nav` | Enlaces de navegación + CTA | Los `href` (`#servicios`…) anclan a las secciones |
| `hero` | Titular (una entrada por línea), subtítulo, CTAs, foto 4:5 | |
| `infoBar` | 3 datos rápidos (hoy/dónde/teléfono) | Exactamente 3 para mantener la retícula |
| `services` | Tabla de servicios y precios | ⚡ Se alimenta de la API (ver abajo); `items[]` es el contenido inicial/de respaldo |
| `gallery` | 4 fotos 3:4 | Exactamente 4 para mantener la retícula |
| `team` | Miembros con foto 1:1 | 3 por fila queda óptimo |
| `quote` | Testimonio destacado | Incluir comillas tipográficas “ ” en el texto |
| `schedule` | Tabla de horarios | `closed: true` atenúa la hora |
| `location` | Foto/mapa 3:2 + dirección | `lines[]`: una entrada por línea |
| `ctaBanner` | Banner final a color | |
| `footer` | Texto tras "© {año} {marca} · " | El año se calcula solo |

## Servicios desde la API

La sección **"Servicios y precios"** NO se mantiene a mano: en cada visita, un
script en `Services.astro` consulta

```
GET {PUBLIC_API_URL}/api/public/services
→ { Succeeded: true, Data: [{ ServiceId, Name, Description, DurationMinutes, Price, IsActive, CreatedAt }] }
```

filtra `IsActive: true`, formatea `DurationMinutes` como "N min" y `Price` como
`$N` (locale es-MX), y sustituye las filas. Así, si el dueño edita sus
servicios en la app, el landing se actualiza solo, sin redeploy.

- `PUBLIC_API_URL` se configura en `.env` (copiar de `.env.example`). En
  producción, apuntar al dominio del backend de esa empresa.
- El backend debe permitir **CORS** (GET) desde el dominio del landing.
- `services.items` en `content.ts` es el contenido inicial y de **respaldo**:
  se muestra si la API falla o no responde. Mantenerlo razonablemente al día.
- Al adaptar a una empresa nueva: cambiar `PUBLIC_API_URL`, no el componente.

## Imágenes: formatos y proporciones

Las cajas de imagen recortan con `object-fit: cover`, así que cualquier foto
funciona, pero estas proporciones evitan recortes agresivos:

| Slot | Proporción | Sugerencia |
|---|---|---|
| `hero.image` | 4:5 vertical | ≥1200px de ancho |
| `gallery.images[0..3]` | 3:4 vertical | ≥800px |
| `team.members[].image` | 1:1 cuadrada | ≥600px |
| `location.image` | 3:2 horizontal | ≥1200px |

Todas las fotos se muestran en **blanco y negro** (filtro `grayscale` del
diseño) — es parte de la identidad visual, no un error. El color de marca lo
pone `accentColor`.

## Comandos

Este proyecto usa **pnpm** (no npm):

```bash
pnpm install     # primera vez
pnpm dev         # desarrollo → http://localhost:4321
pnpm build       # producción → dist/
pnpm preview     # probar el build
```

## Checklist al clonar para una empresa nueva

- [ ] `brand.name` y `brand.accentColor`
- [ ] `meta.title` y `meta.description` (SEO)
- [ ] `bookingUrl` apuntando a la app de reservas de esa empresa
- [ ] `PUBLIC_API_URL` en `.env` apuntando al backend de esa empresa (CORS habilitado)
- [ ] Textos de todas las secciones (hero, servicios, horarios, quote…)
- [ ] Imágenes en `public/images/` y sus rutas + `alt` en `content.ts`
- [ ] `public/favicon.svg`: actualizar el `fill` al nuevo acento
- [ ] `pnpm build` termina sin errores
