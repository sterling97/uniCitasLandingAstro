/* ══════════════════════════════════════════════════════════════════════
   content.ts — ÚNICA FUENTE DE CONTENIDO del landing.

   ✅ Para adaptar el landing a otra empresa, edita SOLO este archivo
      (y coloca las imágenes nuevas en public/images/).
   ❌ No toques componentes, layouts ni estilos: definen el FORMATO.

   Imágenes: usa rutas que empiecen por /images/ (los archivos viven en
   public/images/). Si `src` es null, se muestra un marcador con el texto
   de `placeholder` — útil mientras no tengas la foto definitiva.
   ══════════════════════════════════════════════════════════════════════ */

export interface ImageRef {
  /** Ruta pública de la imagen, p. ej. "/images/hero.jpg". null = marcador. */
  src: string | null;
  /** Texto alternativo (accesibilidad/SEO). */
  alt: string;
  /** Texto del marcador cuando no hay imagen. */
  placeholder: string;
}

export interface Service {
  name: string;
  description: string;
  duration: string; // p. ej. "60 min"
  price: string;    // p. ej. "$450"
}

export interface TeamMember {
  name: string;
  role: string;
  image: ImageRef;
}

export interface ScheduleRow {
  days: string;   // p. ej. "Martes y miércoles"
  hours: string;  // p. ej. "10:00 – 19:00" o "Cerrado"
  closed?: boolean; // true = se muestra atenuado
}

export const content = {
  /* ── Marca ──────────────────────────────────────────────────────────── */
  brand: {
    name: 'Salón Lumen',
    /** Color de acento de la marca (hex). Cambia botones, enlaces y banner. */
    accentColor: '#1d5c4f',
  },

  /* ── SEO / <head> ───────────────────────────────────────────────────── */
  meta: {
    lang: 'es',
    title: 'Salón Lumen — Corte, color y peinado en Roma Norte',
    description:
      'Corte, color y peinado en la Roma Norte. Reserva en línea en un minuto — sin llamadas y sin crear cuenta.',
  },

  /** URL de la app de reservas (todos los botones "Reservar" apuntan aquí). */
  bookingUrl: 'http://localhost:4201/reservar',

  /* ── Navegación ─────────────────────────────────────────────────────── */
  nav: {
    links: [
      { label: 'Servicios', href: '#servicios' },
      { label: 'Galería', href: '#galeria' },
      { label: 'Horarios', href: '#horarios' },
    ],
    ctaLabel: 'Reservar cita',
  },

  /* ── Hero ───────────────────────────────────────────────────────────── */
  hero: {
    /** Cada elemento es una línea del titular. */
    titleLines: ['Ven despeinada.', 'Sal siendo tú.'],
    subtitle:
      'Corte, color y peinado en la Roma Norte desde hace doce años. Reserva en línea en un minuto — sin llamadas y sin crear cuenta.',
    primaryCtaLabel: 'Reservar cita',
    secondaryCtaLabel: 'Ver servicios y precios',
    image: {
      src: null,
      alt: 'Interior del salón',
      placeholder: 'Foto principal del salón',
    } as ImageRef,
  },

  /* ── Barra de datos rápidos (3 columnas) ────────────────────────────── */
  infoBar: [
    { label: 'Hoy', value: '10:00 – 20:00' },
    { label: 'Dónde', value: 'Colima 212, Roma Norte' },
    { label: 'Teléfono', value: '55 5512 8890' },
  ],

  /* ── Servicios y precios ────────────────────────────────────────────── */
  services: {
    kicker: 'Servicios y precios',
    items: [
      { name: 'Corte de dama', description: 'Lavado, corte y secado', duration: '60 min', price: '$450' },
      { name: 'Corte de caballero', description: 'Clásico a tijera o máquina', duration: '30 min', price: '$280' },
      { name: 'Tinte completo', description: 'Color de raíz a puntas', duration: '120 min', price: '$1,200' },
      { name: 'Balayage', description: 'Aclarado a mano alzada más matiz', duration: '180 min', price: '$2,400' },
      { name: 'Peinado y ondas', description: 'Para eventos, con fijación', duration: '45 min', price: '$600' },
      { name: 'Keratina', description: 'Alisado que dura tres meses', duration: '90 min', price: '$1,500' },
    ] as Service[],
    ctaLabel: 'Reservar uno de estos',
  },

  /* ── Galería (4 fotos) ──────────────────────────────────────────────── */
  gallery: {
    kicker: 'El trabajo habla',
    images: [
      { src: null, alt: 'Trabajo 1', placeholder: 'Foto 1' },
      { src: null, alt: 'Trabajo 2', placeholder: 'Foto 2' },
      { src: null, alt: 'Trabajo 3', placeholder: 'Foto 3' },
      { src: null, alt: 'Trabajo 4', placeholder: 'Foto 4' },
    ] as ImageRef[],
  },

  /* ── Equipo ─────────────────────────────────────────────────────────── */
  team: {
    kicker: 'El equipo',
    members: [
      {
        name: 'Lucía Bernal',
        role: 'Colorista',
        image: { src: null, alt: 'Lucía Bernal', placeholder: 'Foto de Lucía' },
      },
      {
        name: 'Diego Torres',
        role: 'Corte y barbería',
        image: { src: null, alt: 'Diego Torres', placeholder: 'Foto de Diego' },
      },
      {
        name: 'Mar Ocampo',
        role: 'Estilista',
        image: { src: null, alt: 'Mar Ocampo', placeholder: 'Foto de Mar' },
      },
    ] as TeamMember[],
  },

  /* ── Cita destacada (testimonio) ────────────────────────────────────── */
  quote: {
    text: '“Llevo tres años sin dejar que nadie más me toque el pelo.”',
    author: '— Valeria S., clienta desde 2023',
  },

  /* ── Horarios ───────────────────────────────────────────────────────── */
  schedule: {
    kicker: 'Horarios',
    rows: [
      { days: 'Lunes', hours: 'Cerrado', closed: true },
      { days: 'Martes y miércoles', hours: '10:00 – 19:00' },
      { days: 'Jueves y viernes', hours: '10:00 – 20:00' },
      { days: 'Sábado', hours: '9:00 – 17:00' },
      { days: 'Domingo', hours: 'Cerrado', closed: true },
    ] as ScheduleRow[],
  },

  /* ── Ubicación ──────────────────────────────────────────────────────── */
  location: {
    kicker: 'Dónde estamos',
    image: {
      src: null,
      alt: 'Ubicación del salón',
      placeholder: 'Mapa o foto de la fachada',
    } as ImageRef,
    /** Cada elemento es una línea (se separan con <br>). */
    lines: ['Colima 212, Roma Norte, CDMX', 'hola@salonlumen.mx · 55 5512 8890'],
  },

  /* ── Banner final ───────────────────────────────────────────────────── */
  ctaBanner: {
    title: 'Tu silla te espera.',
    ctaLabel: 'Reservar cita en línea',
  },

  /* ── Pie de página ──────────────────────────────────────────────────── */
  footer: {
    /** Se muestra tras "© {año} {marca} · ". */
    note: 'Colima 212, Roma Norte, CDMX',
  },
};

export type Content = typeof content;
