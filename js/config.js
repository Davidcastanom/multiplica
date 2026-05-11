/*
  EDITA AQUI EL CONTENIDO INTERACTIVO DE MULTIPLICA
  ------------------------------------------------
  Este archivo es el lugar mas facil para cambiar datos sin tocar la logica.
  Puedes modificar textos entre comillas, agregar quioscos o ajustar mensajes.
  Si agregas una nueva tarea/quiosco aqui, recuerda crear tambien su boton en index.html.
*/

window.MULTIPLICA_CONFIG = {
  /*
    GOOGLE MAPS
    -----------
    1. Crea una API key en Google Cloud.
    2. Activa "Maps JavaScript API".
    3. Pega la key abajo.
    4. Restringe la key al dominio de GitHub Pages cuando publiques.

    Si dejas googleMapsApiKey vacio, la pagina mostrara el mapa visual alternativo
    y un enlace para abrir la zona en Google Maps.
  */
  googleMapsApiKey: "",

  googleMapsCenter: {
    lat: 6.2856,
    lng: -75.5548
  },

  puntosGoogle: [
    {
      nombre: "Cancha de mini fútbol la concordia.",
      tipo: "Posible quiosco",
      direccion: "Cra. 31a #70-4, Versalles, Medellín, Manrique, Medellín, Antioquia, Colombia",
      horario: "Por definir"
    },
    {
      nombre: "Centro de Servicios a la Ciudadanía.",
      tipo: "Posible quiosco",
      direccion: "Cra. 43 #66G-45, Manrique Central II, Medellín, Villa Hermosa, Medellín, Antioquia, Colombia",
      horario: "Por definir"
    },
    {
      nombre: "Uva los sueños",
      tipo: "Posible quiosco",
      direccion: "Carrera 28 #Nº 69-04, Cl. 70 #27, Versalles, Medellín, Antioquia, Colombia.",
      horario: "Por definir"
    },
    {
      nombre: "Cancha sintética el Raizal.",
      tipo: "Posible quiosco",
      direccion: "Cra. 31a #7761 #77- a, Versalles, Medellín, Manrique, Medellín, Antioquia, Colombia",
      horario: "Por definir"
    },
    {
      nombre: "Parque de la rueda",
      tipo: "Posible quiosco",
      direccion: "Cl 71A #39, Cra. 41a #39-1, Manrique Oriental, Medellín, Manrique, Medellín, Antioquia, Colombia",
      horario: "Por definir"
    },
    {
      nombre: "Parque Gaitán.",
      tipo: "Posible quiosco",
      direccion: "Cl. 71 #39-2, Manrique Oriental, Medellín, Manrique, Medellín, Antioquia, Colombia",
      horario: "Por definir"
    }
  ],

  tareas: {
    matematicas: ["Fracciones sin miedo", "Mentor: Sara | 4 estudiantes conectados | 25 min"],
    lectura: ["Lectura en voz alta", "Mentor: David | 6 estudiantes conectados | 40 min"],
    maqueta: ["Maqueta del barrio", "Mentora: Mariana | 3 equipos maker | 55 min"]
  },

  quioscos: {
    "Cancha de mini fútbol la concordia.": "Cra. 31a #70-4, Versalles, Medellín, Manrique, Medellín, Antioquia, Colombia",
    "Centro de Servicios a la Ciudadanía.": "Cra. 43 #66G-45, Manrique Central II, Medellín, Villa Hermosa, Medellín, Antioquia, Colombia",
    "Uva los sueños": "Carrera 28 #Nº 69-04, Cl. 70 #27, Versalles, Medellín, Antioquia, Colombia.",
    "Cancha sintética el Raizal.": "Cra. 31a #7761 #77- a, Versalles, Medellín, Manrique, Medellín, Antioquia, Colombia",
    "Parque de la rueda": "Cl 71A #39, Cra. 41a #39-1, Manrique Oriental, Medellín, Manrique, Medellín, Antioquia, Colombia",
    "Parque Gaitán.": "Cl. 71 #39-2, Manrique Oriental, Medellín, Manrique, Medellín, Antioquia, Colombia"
  },

  lineaTiempo: {
    2028: "Primeros clubes de tareas se realizan en casas, centros de integración, bibliotecas y espacios públicos.",
    2029: "Los jóvenes empiezan a documentar historias barriales, crear, aprender, emprender y realizar sus propios proyectos.",
    2030: "Nacen laboratorios maker con IA, diseño, guion y aprendizaje por proyectos con personas adultas y jóvenes del barrio.",
    2031: "MULTIPLICA conecta quioscos, espacios públicos, mentores, cine comunitario e impacto visual."
  },

  nivelesMaker: {
    1: "Equipo: mentor par + guía impresa",
    2: "Equipo: lectura + dibujo + ejemplo local",
    3: "Equipo: diseño + guion + mentoría",
    4: "Equipo: IA + prototipo + validación familiar",
    5: "Equipo: agencia maker + aliado + vitrina de ingresos"
  },

  mensajesRapidos: {
    descargas: "Paquete offline listo: guias PDF, audios cortos y fichas de proyecto.",
    proyecto: "Reto maker abierto: crear una pieza visual para un emprendimiento del barrio.",
    ruta: "Impacto conectado: educacion, innovacion y ciudad cuidadora."
  },

  promptsIniciales: {
    historia: "Actua como narrador comunitario de Manrique",
    imagen: "Actua como director de arte para una campana juvenil",
    guion: "Actua como guionista de cine documental urbano",
    marca: "Actua como mentor de branding para emprendimientos maker"
  }
};
