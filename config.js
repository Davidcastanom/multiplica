/*
  // TODO: Configurar contenido dinámico.
  // CONTEXTO: Archivo principal de datos interactivos. 
  // Modificar los textos, quioscos y mensajes aquí.
  // Al agregar un nuevo quiosco o tarea, recordar añadir el botón correspondiente en index.html.
*/

window.MULTIPLICA_CONFIG = {
  /*
    // TODO: Activar Google Maps
    // CONTEXTO: 
    // 1. Crea una API key en Google Cloud Console.
    // 2. Activa "Maps JavaScript API".
    // 3. Pega la key en googleMapsApiKey.
    // 4. Restringe la key al dominio de tu sitio.
    // (Si queda vacío, se usará el mapa estático de respaldo).
  */
  googleMapsApiKey: "",

  googleMapsCenter: {
    lat: 6.2856,
    lng: -75.5548
  },

  puntosGoogle: [
    {
      nombre: "Quiosco La Honda",
      tipo: "Centro de tareas + mentorías",
      direccion: "Sector La Honda, Manrique, Medellín",
      lat: 6.2976,
      lng: -75.5486,
      horario: "Lunes a viernes | 3 PM - 7 PM"
    },
    {
      nombre: "Quiosco San José",
      tipo: "Lectura + recursos offline",
      direccion: "Sector San José La Cima, Manrique, Medellín",
      lat: 6.2898,
      lng: -75.5524,
      horario: "Martes y jueves | 4 PM - 7 PM"
    },
    {
      nombre: "Quiosco Las Granjas",
      tipo: "Cine comunitario + podcast",
      direccion: "Sector Las Granjas, Manrique, Medellín",
      lat: 6.2819,
      lng: -75.5489,
      horario: "Viernes | 5 PM - 8 PM"
    },
    {
      nombre: "Quiosco Manrique Central",
      tipo: "Laboratorio IA + agencia maker",
      direccion: "Manrique Central, Medellín",
      lat: 6.2729,
      lng: -75.5563,
      horario: "Sábados | 9 AM - 1 PM"
    }
  ],

  tareas: {
    matematicas: ["Fracciones sin miedo", "Mentor: Sara | 4 estudiantes conectados | 25 min"],
    lectura: ["Lectura en voz alta", "Mentor: David | 6 estudiantes conectados | 40 min"],
    maqueta: ["Maqueta del barrio", "Mentora: Mariana | 3 equipos maker | 55 min"]
  },

  quioscos: {
    "La Honda": "Disponible ahora | 3 mentores | Taller de tareas 4 PM",
    "San Jose": "Cupo medio | Club de lectura 5 PM | Lab IA mañana",
    "Las Granjas": "Disponible | Cine comunitario 6 PM | Podcast activo",
    "Manrique Central": "Alta demanda | Mentorías pares | Ruta maker sábado"
  },

  lineaTiempo: {
    2028: "Primeros clubes de tareas se reúnen en casas, bibliotecas y canchas.",
    2029: "Los jóvenes empiezan a documentar historias barriales con celulares.",
    2030: "Nacen laboratorios maker con IA, diseño, guion y aprendizaje por proyectos.",
    2031: "MULTIPLICA conecta quioscos, mentores, cine comunitario e impacto visual."
  },

  nivelesMaker: {
    1: "Equipo: mentor par + guía impresa",
    2: "Equipo: lectura + dibujo + ejemplo local",
    3: "Equipo: diseño + guion + mentoría",
    4: "Equipo: IA + prototipo + validación familiar",
    5: "Equipo: agencia maker + aliado + vitrina de ingresos"
  },

  mensajesRapidos: {
    descargas: "Paquete offline listo: guías PDF, audios cortos y fichas de proyecto.",
    proyecto: "Reto maker abierto: crear una pieza visual para un emprendimiento del barrio.",
    ruta: "Impacto conectado: educación, innovación y ciudad cuidadora."
  },

  promptsIniciales: {
    historia: "Actúa como narrador comunitario de Manrique",
    imagen: "Actúa como director de arte para una campaña juvenil",
    guion: "Actúa como guionista de cine documental urbano",
    marca: "Actúa como mentor de branding para emprendimientos maker"
  }
};
