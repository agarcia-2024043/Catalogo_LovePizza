/**
 * DATA.JS - Catálogo de productos de LOVE PIZZA
 * Moneda: Quetzales (Q)
 * 
 * Cada producto cuenta con:
 * - id: Identificador único
 * - nombre: Nombre comercial
 * - categoria: Identificador de categoría para filtros
 * - descripcion: Descripción apetitosa de ingredientes
 * - imagen: Ruta en img/ o vacío para usar el espacio reservado (placeholder)
 * - etiquetas: Array de badges
 * - precios: Objeto con { personal, mediana, familiar } o { unico }
 */

const CATEGORIAS = [
  { id: "todas", nombre: "Todas" },
  { id: "clasicas", nombre: "Pizzas Clásicas" },
  { id: "especiales", nombre: "Pizzas Especiales" },
  { id: "alitas", nombre: "Alitas" },
  { id: "especialidades", nombre: "Especialidades" },
  { id: "postres", nombre: "Postres" }
];

const PRODUCTOS = [
  // ══════════════ PIZZAS CLÁSICAS ══════════════
  {
    id: "piz-jamon",
    nombre: "Pizza de Jamón",
    categoria: "clasicas",
    descripcion: "Salsa de tomate pomodoro artesanal, abundante queso mozzarella fundido y jamón horneado seleccionado.",
    imagen: "img/Jamon.webp", 
    etiquetas: ["Clásica", "Favorita"],
    precios: { personal: 45, mediana: 80, familiar: 115 }
  },
  {
    id: "piz-pepperoni",
    nombre: "Peperoni",
    categoria: "clasicas",
    descripcion: "Salsa de tomate artesanal, doble queso mozzarella fundido y abundante pepperoni crujiente de primera calidad.",
    imagen: "img/Pepperoni.webp",
    etiquetas: ["Favorita", "Clásica"],
    precios: { personal: 45, mediana: 85, familiar: 125 }
  },
  {
    id: "piz-salami",
    nombre: "Salami",
    categoria: "clasicas",
    descripcion: "Nuestra clásica masa madurada con queso mozzarella, exquisitas rodajas de salami curado y toque de especias finas.",
    imagen: "img/Salami.webp",
    etiquetas: ["Clásica"],
    precios: { personal: 45, mediana: 85, familiar: 125 }
  },
  {
    id: "piz-queso",
    nombre: "Queso",
    categoria: "clasicas",
    descripcion: "Nuestra clásica base de masa artesanal con salsa pomodoro y una generosa capa de queso mozzarella dorado al horno.",
    imagen: "img/Queso.webp",
    etiquetas: ["Full Queso", "Veggie"],
    precios: { personal: 40, mediana: 75, familiar: 110 }
  },

  // ══════════════ PIZZAS ESPECIALES ══════════════
  {
    id: "piz-4-carnes",
    nombre: "4 Carnes",
    categoria: "especiales",
    descripcion: "Potente combinación de pepperoni, salchicha italiana, jamón horneado y tocino crujiente sobre queso mozzarella fundido.",
    imagen: "img/Carnes.webp", 
    etiquetas: ["Carnívora", "Favorita"],
    precios: { personal: 55, mediana: 95, familiar: 140 }
  },
  {
    id: "piz-deluxe",
    nombre: "Deluxe",
    categoria: "especiales",
    descripcion: "Pepperoni premium, carne sazonada, champiñones frescos, pimientos verdes y cebolla morada sobre mozzarella gratinada.",
    imagen: "img/Deluxe.webp",
    etiquetas: ["Especial", "Completa"],
    precios: { personal: 55, mediana: 95, familiar: 140 }
  },
  {
    id: "piz-hawaiana",
    nombre: "Hawaiana",
    categoria: "especiales",
    descripcion: "El clásico favorito bien resuelto con jamón artesanal horneado, trozos de piña caramelizada a la brasa y queso mozzarella extra.",
    imagen: "img/Hawaiana.webp",
    etiquetas: ["Tropical", "Favorita"],
    precios: { personal: 45, mediana: 80, familiar: 115 }
  },

  // ══════════════ BANQUETES DE ALITAS ══════════════
  {
    id: "ali-banquete-10",
    nombre: "Banquete de Alitas 10",
    categoria: "alitas",
    descripcion: "10 piezas de jugosas alitas horneadas, bañadas en tu salsa favorita (BBQ o Búfalo) y acompañadas con aderezo ranch.",
    imagen: "img/Alitas.webp",
    etiquetas: ["Alitas", "Horneadas"],
    precios: { unico: 65 }
  },
  {
    id: "ali-banquete-30",
    nombre: "Banquete de Alitas 30",
    categoria: "alitas",
    descripcion: "30 piezas de alitas doradas y crujientes, ideales para compartir en grupo, con variedad de salsas y aderezos de la casa.",
    imagen: "img/Alitas.webp", 
    etiquetas: ["Para Compartir", "Banquete"],
    precios: { unico: 175 }
  },

  // ══════════════ ESPECIALIDADES ══════════════
  {
    id: "esp-lasana-personal",
    nombre: "Lasaña Personal",
    categoria: "especialidades",
    descripcion: "Capas de pasta artesanal con salsa boloñesa con carne de res, bechamel suave y gratinada con abundante queso mozzarella.",
    imagen: "img/Lasaña.webp",
    etiquetas: ["Pasta", "Recién Horneada"],
    precios: { unico: 55 }
  },
  {
    id: "esp-calzone",
    nombre: "Calzone",
    categoria: "especialidades",
    descripcion: "Masa artesanal doblada y horneada al horno de piedra, rellena de abundante queso mozzarella derretido, salsa pomodoro y carnes selectas.",
    imagen: "img/Calzone.webp",
    etiquetas: ["Al Horno", "Especialidad"],
    precios: { unico: 48 }
  },

  // ══════════════ POSTRES ══════════════
  {
    id: "pos-canelitas",
    nombre: "Canelitas",
    categoria: "postres",
    descripcion: "Bocados de masa suave recién horneados, espolvoreados con azúcar y canela aromática, servidos con glaseado dulce.",
    imagen: "img/Canelitas.webp",
    etiquetas: ["Dulce", "Recién Horneado"],
    precios: { unico: 30 }
  }
];

// Datos de la galería de fotos tipo collage / grid asimétrico de 12 columnas
const GALERIA_FOTOS = [
  {
    titulo: "Nuestra masa fermentada 48 horas",
    subtitulo: "Hecha a mano cada mañana con harina italiana",
    colSpan: "col-span-8",
    rowSpan: "row-span-2",
    imagen: "img/galeria-1.webp",
    tag: "Proceso Artesanal"
  },
  {
    titulo: "El secreto del corazón",
    subtitulo: "Nuestras icónicas Love Pizzas",
    colSpan: "col-span-4",
    rowSpan: "row-span-1",
    imagen: "img/galeria-2.webp",
    tag: "Amor & Sabor"
  },
  {
    titulo: "Horno de piedra a 450°C",
    subtitulo: "Burbujas doradas y crocancia inigualable",
    colSpan: "col-span-4",
    rowSpan: "row-span-1",
    imagen: "img/galeria-3.webp",
    tag: "Fuego & Pasión"
  },
  {
    titulo: "Ingredientes del huerto",
    subtitulo: "Albahaca fresca, tomates pomodoro y quesos reales",
    colSpan: "col-span-4",
    rowSpan: "row-span-1",
    imagen: "img/galeria-4.webp",
    tag: "100% Fresco"
  },
  {
    titulo: "Momentos para compartir",
    subtitulo: "La pizza sabe mejor cuando se disfruta juntos",
    colSpan: "col-span-8",
    rowSpan: "row-span-1",
    imagen: "img/galeria-5.webp",
    tag: "Comunidad"
  }
];
