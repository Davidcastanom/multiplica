# 🟢 Módulo Comunidad — Plan Estratégico

> **Empresa social sin ánimo de lucro** · Red de nodos comunitarios en parques · Medellín, Colombia

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-brightgreen)
![Versión](https://img.shields.io/badge/versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-yellow)
![Colombia](https://img.shields.io/badge/origen-Medellín%2C%20Colombia-red)

---

## 📌 ¿Qué es Módulo Comunidad?

**Módulo Comunidad** es un modelo de empresa social sin ánimo de lucro que transforma los parques barriales en ecosistemas de aprendizaje, creatividad e ingresos. Cada *módulo* es un nodo autónomo instalado en un parque que ofrece:

- 📚 **Tutorías y venta de insumos** para tareas escolares de actividades manuales y creativas
- 🤖 **Servicios de Inteligencia Artificial** vendibles (diseño, automatización, contenido)
- 📡 **WiFi gratuito** para la comunidad
- 🎬 **Cine en el parque** con proyector
- ⚽ **Torneos de fútbol** por barrios
- 💡 **Asesorías a emprendedores** locales
- 👨‍🏫 **Tutores jóvenes pagados** — los estudiantes se convierten en mentores

El modelo es **autosostenible, replicable y escalable** a cualquier parque del país.

---

## 📂 Estructura del Repositorio

```
modulo-comunidad/
│
├── index.html              # Aplicación principal (SPA navegable)
├── css/
│   └── styles.css          # Estilos completos separados
├── js/
│   └── app.js              # Lógica de navegación y datos
├── assets/
│   └── (logos, imágenes cuando se agreguen)
│
├── README.md               # Este archivo
├── LICENSE                 # Licencia MIT
└── .gitignore              # Archivos a ignorar
```

---

## 🚀 Cómo usar localmente

### Opción 1 — Abrir directo en el navegador
```bash
# Clona el repositorio
git clone https://github.com/TU_USUARIO/modulo-comunidad.git

# Entra al directorio
cd modulo-comunidad

# Abre en el navegador (Mac/Linux)
open index.html

# O en Windows
start index.html
```

### Opción 2 — Servidor local (recomendado)
```bash
# Con Python 3
python3 -m http.server 8080

# Luego abre en el navegador:
# http://localhost:8080
```

### Opción 3 — Extensión Live Server (VS Code)
1. Instala la extensión **Live Server** en VS Code
2. Clic derecho en `index.html` → `Open with Live Server`

---

## 📊 Secciones del documento

| Sección | Contenido |
|---|---|
| **Resumen** | Visión general, concepto central y mejoras clave |
| **Costos** | Hoja detallada: fijos, variables, dotación inicial (3 escenarios) |
| **Ingresos** | Proyección mensual por línea de negocio (meses 1 a 6+) |
| **Viabilidad** | Análisis con calificación, mejoras propuestas e implementación |
| **KPIs Sociales** | Indicadores de impacto y sostenibilidad con metas |
| **Ruta 0** | De cero capital a red nacional — 7 etapas paso a paso |
| **Donantes** | Fuentes públicas, RSE y cooperación internacional |
| **Pitch Deck** | 8 diapositivas para inversores y donantes |

---

## 💰 Resumen Financiero (Módulo Básico)

| Concepto | Valor COP/mes |
|---|---|
| Costos fijos totales | $4.726.000 |
| Costos variables totales | $1.040.000 |
| **Total costos/mes** | **$5.766.000** |
| Ingresos proyectados mes 6 | $8.300.000 |
| **Punto de equilibrio** | **Mes 5-7** |
| Costo por joven beneficiado | ~$48.000/mes |

> ⚠️ El salario del **Administrador de Módulo** está incluido como costo fijo: **$2.200.000/mes** (escenario consolidado) con su respectiva carga prestacional (~$726.000).

---

## 🏗️ Roadmap de Implementación

```
Sem 1-2   → Constitución legal + redes sociales + dotación mínima
Mes 1     → Primera actividad pública (cine en parque) + primeras ventas
Mes 2-3   → Primeros tutores jóvenes + servicios IA
Mes 4-6   → Punto de equilibrio + manual operativo
Mes 7-12  → 3 módulos activos en Medellín
Año 2-3   → Red nacional
```

---

## 🎯 KPIs Clave (Meta Año 1)

- 🧑‍🤝‍🧑 **120 jóvenes activos** por módulo
- 👨‍🏫 **18 tutores jóvenes** con ingresos propios
- 💼 **24 emprendimientos** asesorados
- 🎬 **3.600 asistentes** a cine en parque/año
- 📈 **75% tasa de retención** mensual

---

## 🤝 Cómo contribuir

Este proyecto es de código abierto y social. Puedes contribuir:

1. **Reportando mejoras** → Abre un Issue describiendo la sugerencia
2. **Mejorando el diseño** → Fork + Pull Request con tus cambios
3. **Adaptando el modelo** → Si lo replicas en otro barrio/ciudad, comparte tu experiencia
4. **Traduciendo** → El modelo puede aplicarse en cualquier país hispanohablante

```bash
# Fork del repositorio en GitHub
# Luego:
git clone https://github.com/TU_USUARIO/modulo-comunidad.git
git checkout -b feature/mi-mejora
# ... haz tus cambios ...
git commit -m "feat: descripción de la mejora"
git push origin feature/mi-mejora
# Abre un Pull Request en GitHub
```

---

## 📋 Convenciones de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva sección o funcionalidad |
| `fix:` | Corrección de datos o errores |
| `docs:` | Cambios en documentación |
| `style:` | Cambios visuales sin afectar lógica |
| `data:` | Actualización de cifras o proyecciones |

---

## 📄 Licencia

MIT License — Libre para usar, modificar y distribuir con atribución.

```
Copyright (c) 2025 Módulo Comunidad — Medellín, Colombia
```

---

## 📬 Contacto

¿Quieres replicar este modelo en tu barrio o ciudad?  
¿Eres una organización interesada en apoyar?

> Abre un Issue en este repositorio o escribe a través de las redes del proyecto.

---

*Hecho con propósito en Medellín 🇨🇴 — El parque es de todos.*
