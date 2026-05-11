# Guia para personalizar MULTIPLICA

Esta guia te muestra donde cambiar manualmente los contenidos principales del prototipo.

## 1. Cambiar nombre, slogan y textos principales

Archivo:

```text
index.html
```

Busca estos textos:

```html
<strong>MULTIPLICA</strong>
<small>por IMPACTO MAKER</small>
<h1>Hagamos la tarea</h1>
```

Tambien puedes cambiar el texto de introduccion:

```html
<p class="hero-lead">
  Centro de tareas, laboratorio de IA...
</p>
```

## 2. Cambiar colores

Archivo:

```text
css/styles.css
```

Al inicio del archivo encontraras:

```css
:root {
  --bg: #18232e;
  --surface: #223141;
  --warm: #f46738;
  --sun: #ffcd50;
  --aqua: #54f0d6;
}
```

Colores recomendados para modificar:

- `--bg`: fondo general.
- `--surface`: tarjetas y paneles.
- `--warm`: color naranja principal.
- `--sun`: color amarillo para botones e indicadores.
- `--aqua`: color tecnologico para acentos.

## 3. Cambiar tareas activas

Hay dos lugares:

Botones visibles:

```text
index.html
```

Datos que aparecen al hacer clic:

```text
js/config.js
```

Ejemplo:

```js
tareas: {
  matematicas: ["Fracciones sin miedo", "Mentor: Sara | 4 estudiantes conectados | 25 min"]
}
```

El nombre `matematicas` debe coincidir con el atributo del boton:

```html
<button class="task-item active" data-task="matematicas">
```

## 4. Cambiar quioscos del mapa

Botones visibles:

```text
index.html
```

Busca:

```html
<button class="kiosk" style="--x: 38%; --y: 48%" data-kiosk="San Jose">San Jose</button>
```

Para mover un punto en el mapa, cambia:

- `--x`: posicion horizontal.
- `--y`: posicion vertical.

Datos que aparecen al hacer clic:

```text
js/config.js
```

Ejemplo:

```js
quioscos: {
  "San Jose": "Cupo medio | Club de lectura 5 PM | Lab IA manana"
}
```

El texto de `data-kiosk` debe coincidir exactamente con la clave en `js/config.js`.

## 4.1 Activar Google Maps real

Archivo:

```text
js/config.js
```

Busca:

```js
googleMapsApiKey: "",
```

Pega tu API key:

```js
googleMapsApiKey: "TU_API_KEY_AQUI",
```

En Google Cloud debes activar:

```text
Maps JavaScript API
```

Cuando publiques en GitHub Pages, restringe la API key al dominio de tu pagina.

## 4.2 Cambiar puntos propuestos de Google Maps

Archivo:

```text
js/config.js
```

Busca:

```js
puntosGoogle: [
  {
    nombre: "Quiosco La Honda",
    tipo: "Centro de tareas + mentorias",
    direccion: "Sector La Honda, Manrique, Medellin",
    lat: 6.2976,
    lng: -75.5486,
    horario: "Lunes a viernes | 3 PM - 7 PM"
  }
]
```

Puedes cambiar:

- `nombre`: nombre del punto.
- `tipo`: actividad principal.
- `direccion`: descripcion de ubicacion.
- `lat` y `lng`: coordenadas del marcador.
- `horario`: disponibilidad o agenda.

Si no tienes coordenadas exactas, abre Google Maps, haz clic derecho sobre el punto y copia las coordenadas.

## 5. Cambiar mentores

Archivo:

```text
index.html
```

Busca la seccion:

```html
<section id="mentores" class="module section-shell">
```

Cada mentor esta en una tarjeta:

```html
<article class="mentor-card">
  <span class="avatar">SA</span>
  <h3>Sara</h3>
  <p>Matematicas visuales...</p>
  <div class="badges"><span>Mentora 2</span><span>ODS 4</span></div>
</article>
```

## 6. Cambiar indicadores de impacto

Archivo:

```text
index.html
```

Busca:

```html
<strong data-count="428">0</strong><span>jovenes formados</span>
```

Cambia `data-count="428"` por el nuevo numero.

## 7. Cambiar mensajes del mentor virtual y accesos rapidos

Archivo:

```text
js/config.js
```

Busca:

```js
mensajesRapidos: {
  descargas: "Paquete offline listo...",
  proyecto: "Reto maker abierto...",
  ruta: "Impacto conectado..."
}
```

## 8. Cambiar imagen principal

Archivo actual:

```text
assets/community-lab.png
```

Puedes reemplazarlo por otra imagen con el mismo nombre. Si usas otro nombre, cambia las referencias en:

```text
index.html
css/styles.css
sw.js
```

## 9. Cambiar archivos cacheados offline

Archivo:

```text
sw.js
```

Si agregas imagenes, audios o documentos que deban funcionar offline, agregalos al arreglo:

```js
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/config.js",
  "./js/app.js",
  "./assets/community-lab.png"
];
```

## 10. Recomendacion para GitHub

Sube estos archivos al repositorio:

```text
index.html
css/
js/
assets/
sw.js
.nojekyll
README.md
PERSONALIZAR.md
README_MULTIPLICA.txt
```

No necesitas subir el `.zip` ni la carpeta `MULTIPLICA_prototipo_web`, porque son solo entregables locales generados.
