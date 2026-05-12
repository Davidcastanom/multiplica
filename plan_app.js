/**
 * MÓDULO COMUNIDAD — app.js
 * Empresa Social Sin Ánimo de Lucro · Medellín, Colombia
 * Versión: 2.0.0 — Actualizado mayo 2026
 *
 * Fuentes:
 *  - Salario mínimo: Decretos 1469 y 1470 del 29 dic 2025
 *  - Precios insumos: Panafargo, Suescun, papelerías mayoristas Medellín 2025-2026
 */

'use strict';

/* ============================================================
   1. CONSTANTES LEGALES 2026
   Fuente: Decretos 1469 y 1470 — Ministerio de Trabajo Colombia
   ============================================================ */

const LEGAL_2026 = {
  smmlv:              1750905,
  auxilioTransporte:  249095,
  ingresoBase:        2000000,
  prestaciones: {
    salud:      0.085,
    pension:    0.12,
    arl:        0.00522,
    caja:       0.04,
    cesantias:  0.0833,
    prima:      0.0833,
    vacaciones: 0.0417,
  },
  factorTotal: 1.4365,
};

/* ============================================================
   2. CATÁLOGO DE INSUMOS 2026
   Precios promedio mercado Medellín
   Fuentes: Panafargo, Suescun, papelerías mayoristas
   ============================================================ */

const CATALOGO_INSUMOS = {

  papelCartulina: {
    nombre: 'Papel y Cartulina',
    icono: '📄',
    color: '#3a86ff',
    items: [
      { id:'P01', nombre:'Cartulina pliego estándar 140gr (70x100cm)',  unidad:'pliego',  precioCosto:900,   precioVenta:1500,  margen:67, usoTarea:'Carteleras, portafolios, maquetas de base' },
      { id:'P02', nombre:'Cartulina 1/8 plana surtida colores',         unidad:'unidad',  precioCosto:350,   precioVenta:600,   margen:71, usoTarea:'Tarjetas, separadores, fichas temáticas' },
      { id:'P03', nombre:'Cartulina 1/8 neón (amarillo/verde/fucsia)',   unidad:'unidad',  precioCosto:400,   precioVenta:700,   margen:75, usoTarea:'Carteleras llamativas, señalización escolar' },
      { id:'P04', nombre:'Papel kraft pliego (70x100cm)',                unidad:'pliego',  precioCosto:800,   precioVenta:1400,  margen:75, usoTarea:'Envolturas, fondos, collage, arte mixto' },
      { id:'P05', nombre:'Block de dibujo carta x20 hojas',             unidad:'block',   precioCosto:2800,  precioVenta:4500,  margen:61, usoTarea:'Ilustración, bocetos, mapas conceptuales' },
      { id:'P06', nombre:'Papel seda pliego colores surtidos',          unidad:'pliego',  precioCosto:300,   precioVenta:500,   margen:67, usoTarea:'Flores de papel, decoración, piñatas' },
      { id:'P07', nombre:'Papel periódico pliego',                      unidad:'pliego',  precioCosto:200,   precioVenta:400,   margen:100,usoTarea:'Papier maché, proteger mesa de trabajo' },
      { id:'P08', nombre:'Cartón paja 1mm pliego',                     unidad:'pliego',  precioCosto:1200,  precioVenta:2000,  margen:67, usoTarea:'Maquetas, estructuras, cajas artesanales' },
    ]
  },

  foamiMateriales: {
    nombre: 'Foami y Materiales 3D',
    icono: '🎨',
    color: '#2ddb81',
    items: [
      { id:'F01', nombre:'Foami liso carta (21x28cm) surtido colores',  unidad:'unidad',  precioCosto:600,   precioVenta:1000,  margen:67, usoTarea:'Figuras, letras 3D, decoraciones planas' },
      { id:'F02', nombre:'Foami escarchado carta x10 und',             unidad:'paquete', precioCosto:7500,  precioVenta:12000, margen:60, usoTarea:'Detalles brillantes, tarjetas especiales' },
      { id:'F03', nombre:'Foami liso cuatro cartas (43x56cm)',         unidad:'unidad',  precioCosto:1500,  precioVenta:2500,  margen:67, usoTarea:'Proyectos grandes, fondos de escenografía' },
      { id:'F04', nombre:'Icopor plancha 50x70cm (2cm espesor)',       unidad:'plancha', precioCosto:5500,  precioVenta:9000,  margen:64, usoTarea:'Maquetas de relieve, dioramas, estructuras' },
      { id:'F05', nombre:'Plastilina x12 colores mediana',             unidad:'caja',    precioCosto:3500,  precioVenta:5500,  margen:57, usoTarea:'Modelado, ciencias naturales, arte 3D' },
      { id:'F06', nombre:'Arcilla blanca x500gr',                     unidad:'bolsa',   precioCosto:4000,  precioVenta:7000,  margen:75, usoTarea:'Cerámica escolar, esculturas, biología' },
      { id:'F07', nombre:'Palitos de balso (madera) x50 und',         unidad:'paquete', precioCosto:2500,  precioVenta:4000,  margen:60, usoTarea:'Maquetas arquitectura, estructuras, física' },
      { id:'F08', nombre:'Limpiapipas surtidos x50 und',              unidad:'paquete', precioCosto:2000,  precioVenta:3500,  margen:75, usoTarea:'Figuras articuladas, manualidades creativas' },
    ]
  },

  pinturaColor: {
    nombre: 'Pintura y Color',
    icono: '🖌️',
    color: '#ffd60a',
    items: [
      { id:'C01', nombre:'Vinilos escolares x6 colores 30ml',          unidad:'set',     precioCosto:4500,  precioVenta:7500,  margen:67, usoTarea:'Pintura sobre cartón, madera, tela' },
      { id:'C02', nombre:'Témperas x12 colores 15ml',                  unidad:'caja',    precioCosto:6500,  precioVenta:11000, margen:69, usoTarea:'Acuarela escolar, pintura decorativa' },
      { id:'C03', nombre:'Colores lápiz x12 (Norma/Faber Castell)',    unidad:'caja',    precioCosto:3500,  precioVenta:5800,  margen:66, usoTarea:'Ilustración, mapas, biología, historia' },
      { id:'C04', nombre:'Crayones x12 (Crayola/Norma)',               unidad:'caja',    precioCosto:4000,  precioVenta:6500,  margen:63, usoTarea:'Arte en papel, texturizados, primaria' },
      { id:'C05', nombre:'Marcadores punta gruesa x12 colores',        unidad:'caja',    precioCosto:5500,  precioVenta:9000,  margen:64, usoTarea:'Carteleras, cartón, foami, rótulos' },
      { id:'C06', nombre:'Pinceles escolares surtidos x6',             unidad:'set',     precioCosto:3500,  precioVenta:6000,  margen:71, usoTarea:'Pintura con témperas y vinilos' },
      { id:'C07', nombre:'Escarcha x12 colores surtido',               unidad:'set',     precioCosto:4000,  precioVenta:7000,  margen:75, usoTarea:'Decoración brillante, tarjetas, foami' },
      { id:'C08', nombre:'Acrílico multiusos x250ml (base blanca)',    unidad:'frasco',  precioCosto:5000,  precioVenta:8500,  margen:70, usoTarea:'Pintura durable sobre múltiples superficies' },
    ]
  },

  herramientas: {
    nombre: 'Pegado, Corte y Herramientas',
    icono: '✂️',
    color: '#ff6b35',
    items: [
      { id:'H01', nombre:'Silicona en barra x12 und (pistola estándar)', unidad:'paquete',precioCosto:3000,  precioVenta:5000,  margen:67, usoTarea:'Pegado de foami, cartón, decoraciones' },
      { id:'H02', nombre:'Pistola de silicona pequeña',                 unidad:'unidad', precioCosto:8000,  precioVenta:14000, margen:75, usoTarea:'Herramienta base (dotación módulo)' },
      { id:'H03', nombre:'Colbón blanco x250ml',                       unidad:'frasco', precioCosto:4000,  precioVenta:6500,  margen:63, usoTarea:'Collage, papel, cartón, tela' },
      { id:'H04', nombre:'Pegante en barra Pritt/Colbón x3',           unidad:'pack',   precioCosto:3500,  precioVenta:5800,  margen:66, usoTarea:'Tareas rápidas, papel fotocopia, cartulina' },
      { id:'H05', nombre:'Tijeras punta roma escolar',                  unidad:'unidad', precioCosto:2500,  precioVenta:4200,  margen:68, usoTarea:'Corte general de papel, cartulina, foami' },
      { id:'H06', nombre:'Cinta transparente (colofán) x3 rollos',     unidad:'pack',   precioCosto:2000,  precioVenta:3500,  margen:75, usoTarea:'Pegado, refuerzo, presentaciones' },
      { id:'H07', nombre:'Bisturí escolar + repuesto x5 hojas',        unidad:'set',    precioCosto:2500,  precioVenta:4500,  margen:80, usoTarea:'Cortes precisos en maquetas y cartón' },
      { id:'H08', nombre:'Regla 30cm plástico resistente',             unidad:'unidad', precioCosto:1200,  precioVenta:2000,  margen:67, usoTarea:'Medición y guía de corte' },
      { id:'H09', nombre:'Compás escolar metálico',                    unidad:'unidad', precioCosto:4000,  precioVenta:7000,  margen:75, usoTarea:'Geometría, trazado de círculos' },
      { id:'H10', nombre:'Perforadora 2 huecos estándar',              unidad:'unidad', precioCosto:8500,  precioVenta:14000, margen:65, usoTarea:'Encuadernación, portafolios, trabajos escritos' },
    ]
  },

  kitsEspeciales: {
    nombre: 'Kits por Tipo de Tarea',
    icono: '📦',
    color: '#ff3366',
    items: [
      { id:'K01', nombre:'KIT MAQUETA BÁSICA',     descripcion:'Geografía, historia, ciencias naturales',
        contenido:['Plancha icopor','Cartulina x3 pliegos','Vinilos x6','Palitos balso','Colbón','Papel seda x5'],
        precioCosto:18000, precioVenta:26000, margen:44,
        usoTarea:'Relieve geográfico, diorama, ecosistema, proyecto ciencias' },
      { id:'K02', nombre:'KIT CARTELERA ESCOLAR',  descripcion:'Exposiciones y trabajos visuales',
        contenido:['Cartulina x4 pliegos','Marcadores x12','Escarcha x6','Stickers','Cinta','Pegante barra'],
        precioCosto:14000, precioVenta:20000, margen:43,
        usoTarea:'Exposiciones orales, efemérides, proyectos de aula' },
      { id:'K03', nombre:'KIT MANUALIDAD FOAMI',   descripcion:'Decoración y artesanía escolar',
        contenido:['Foami x6 carta','Foami escarchado x3','Silicona x6 barras','Marcadores','Tijeras','Escarcha'],
        precioCosto:16000, precioVenta:23000, margen:44,
        usoTarea:'Portarretratos, porta-lapiceros, decoración, regalos escolares' },
      { id:'K04', nombre:'KIT ARTE Y PINTURA',     descripcion:'Artística y expresión plástica',
        contenido:['Témperas x12','Pinceles x6','Block de dibujo','Vinilos x6','Paleta acrílica','Papel protector'],
        precioCosto:22000, precioVenta:31000, margen:41,
        usoTarea:'Clase de artística, proyecto cultura, expresión plástica' },
      { id:'K05', nombre:'KIT PAPELERÍA BÁSICA',   descripcion:'Insumos escritura y presentación general',
        contenido:['Colores x12','Crayones x8','Marcadores x6','Regla','Pegante barra x2','Cartulina x4'],
        precioCosto:12000, precioVenta:17500, margen:46,
        usoTarea:'Tareas generales, mapas conceptuales, guías escolares' },
      { id:'K06', nombre:'KIT MODELADO 3D',        descripcion:'Proyectos tridimensionales',
        contenido:['Plastilina x12','Arcilla x250gr','Palitos balso x20','Limpiapipas x20','Colbón','Vinilos'],
        precioCosto:19000, precioVenta:27500, margen:45,
        usoTarea:'Arte 3D, biología (células, órganos), historia (monumentos)' },
    ]
  }
};

/* ============================================================
   3. DATOS FINANCIEROS 2026
   ============================================================ */

const DATOS_2026 = {
  administrador: {
    smmlv:           LEGAL_2026.smmlv,
    salarioBasico:   Math.round(2   * LEGAL_2026.smmlv),
    salarioConsolid: Math.round(2.5 * LEGAL_2026.smmlv),
    get prestacionesBasico()   { return Math.round(this.salarioBasico   * 0.4365); },
    get prestacionesConsolid() { return Math.round(this.salarioConsolid * 0.4365); },
    get costoTotalBasico()     { return this.salarioBasico   + this.prestacionesBasico;   },
    get costoTotalConsolid()   { return this.salarioConsolid + this.prestacionesConsolid; },
  },

  costosFijos: {
    arriendo:       { min:0,       basico:800000,   consolid:1200000 },
    servicios:      { min:100000,  basico:350000,   consolid:520000  },
    wifi:           { min:85000,   basico:85000,    consolid:170000  },
    fondoTutores:   { min:250000,  basico:650000,   consolid:1500000 },
    contabilidad:   { min:0,       basico:180000,   consolid:300000  },
    plataformasIA:  { min:60000,   basico:190000,   consolid:430000  },
    marketing:      { min:40000,   basico:130000,   consolid:250000  },
    imprevistos:    { min:27000,   basico:229000,   consolid:387000  },
  },

  costosVariables: {
    insumos:        { min:250000,  basico:750000,   consolid:1850000 },
    torneos:        { min:100000,  basico:250000,   consolid:500000  },
    cineParque:     { min:60000,   basico:125000,   consolid:250000  },
    talleresEmpren: { min:0,       basico:100000,   consolid:250000  },
    transporte:     { min:0,       basico:75000,    consolid:185000  },
  },

  dotacion: [
    { item:'Proyector portátil 3500 lúmenes',                qty:1, precio:580000,  prioridad:'alta'  },
    { item:'Parlante Bluetooth 40W exterior',                qty:1, precio:320000,  prioridad:'alta'  },
    { item:'Router 4G + SIM datos 20GB/mes',                 qty:1, precio:220000,  prioridad:'alta'  },
    { item:'Kit insumos creativos arranque',                 qty:1, precio:500000,  prioridad:'alta'  },
    { item:'Computador portátil reacondicionado (i3)',       qty:1, precio:900000,  prioridad:'alta'  },
    { item:'Mesas plegables x4 + sillas x10',               qty:1, precio:750000,  prioridad:'media' },
    { item:'Uniformes oficiales (Polos/Chaquetas)',         qty:6, precio:65000,   prioridad:'alta'  },
    { item:'Materiales menores (Pistola silicona, etc.)',   qty:1, precio:80000,   prioridad:'alta'  },
    { item:'Valla / señalética identidad visual',           qty:1, precio:260000,  prioridad:'media' },
    { item:'Gastos constitución entidad',                   qty:1, precio:380000,  prioridad:'alta'  },
  ],

  ingresos: {
    insumos:    { m1:250000,  m3:750000,  m6:1850000 },
    tutorias:   { m1:380000,  m3:1100000, m6:2950000 },
    serviciosIA:{ m1:0,       m3:500000,  m6:2200000 },
    asesorias:  { m1:0,       m3:180000,  m6:740000  },
    torneos:    { m1:0,       m3:290000,  m6:730000  },
    patrocinio: { m1:0,       m3:120000,  m6:490000  },
    donaciones: { m1:600000,  m3:600000,  m6:1200000 },
  },
};

/* ============================================================
   4. UTILIDADES
   ============================================================ */

function formatCOP(n) {
  if (!n && n !== 0) return '—';
  if (n === 0) return '$0';
  return '$' + Math.round(n).toLocaleString('es-CO');
}

function margenColor(pct) {
  if (pct >= 75) return 'var(--verde)';
  if (pct >= 60) return 'var(--amarillo)';
  return 'var(--naranja)';
}

function calcularAdmin() {
  const smmlv = LEGAL_2026.smmlv;
  const p = LEGAL_2026.prestaciones;
  
  // Básico = 1 SMMLV (reduce riesgo en meses 3-4)
  const salarioBasico = smmlv * 1; 
  // Consolidado = 2 SMMLV (mes 6+ cuando el módulo factura bien)
  const salarioConsolidado = smmlv * 2;
  
  // Costos totales con carga prestacional (43.65%)
  const costoTotalBasico = salarioBasico * LEGAL_2026.factorTotal;
  const costoTotalConsolid = salarioConsolidado * LEGAL_2026.factorTotal;

  // Bonos variables (No prestacionales para este ejercicio)
  const bonoBasico = 500000; // Por cumplimiento de metas mes 3-4
  const bonoRetroactivo = 800000; // Pago en cuotas por el trabajo Ad Honorem del mes 1-2

  return { 
    smmlv,
    salarioBasico, 
    salarioConsolidado, 
    costoTotalBasico: costoTotalBasico + bonoBasico, 
    costoTotalConsolid: costoTotalConsolid + bonoRetroactivo,
    prestacionesBasico: costoTotalBasico - salarioBasico,
    prestacionesConsolid: costoTotalConsolid - salarioConsolidado,
    bonoBasico: bonoBasico,
    bonoRetroactivo: bonoRetroactivo
  };
}

function calcularFinanzas() {
  const cf  = DATOS_2026.costosFijos;
  const cv  = DATOS_2026.costosVariables;
  // El administrador ya fue calculado con su nueva lógica, pero lo obtenemos directo aquí
  const a = calcularAdmin();
  const fijosBasico   = Object.values(cf).reduce((acc,i)=>acc+i.basico,0)  + a.costoTotalBasico;
  const fijosConsolid = Object.values(cf).reduce((acc,i)=>acc+i.consolid,0) + a.costoTotalConsolid;
  const fijosMin      = Object.values(cf).reduce((a,i)=>a+i.min,0);
  const varBasico     = Object.values(cv).reduce((a,i)=>a+i.basico,0);
  const varConsolid   = Object.values(cv).reduce((a,i)=>a+i.consolid,0);
  const varMin        = Object.values(cv).reduce((a,i)=>a+i.min,0);

  return {
    totalMin:      fijosMin + varMin,
    totalBasico:   fijosBasico + varBasico,
    totalConsolid: fijosConsolid + varConsolid,
    fijosBasico, fijosConsolid, fijosMin,
    varBasico, varConsolid, varMin,
    totalDotacion: dot.reduce((a,d)=>a+d.precio*d.qty,0),
    ingM1: Object.values(ing).reduce((a,i)=>a+i.m1,0),
    ingM3: Object.values(ing).reduce((a,i)=>a+i.m3,0),
    ingM6: Object.values(ing).reduce((a,i)=>a+i.m6,0),
  };
}

/* ============================================================
   5. RENDERIZADORES DINÁMICOS
   ============================================================ */

function renderAdminDesglose() {
  const c = document.getElementById('admin-desglose');
  if (!c) return;
  const a = calcularAdmin();
  c.innerHTML = `
  <div class="card card-warn" style="border-color:var(--amarillo)">
    <div class="badge badge-naranja">Modelo de Compensación Flexible</div>
    <h3 style="margin-bottom:1rem;color:var(--amarillo)">Proyección Salarial Administrador</h3>
    <p style="margin-bottom:1rem;font-size:0.78rem;color:var(--gris3);">
      SMMLV 2026: <strong style="color:var(--verde);">${formatCOP(a.smmlv)}</strong>
    </p>
    <table style="margin-bottom:0">
      <tr><th>Concepto</th><th>Arranque (Mes 3-4)</th><th>Equilibrio (Mes 6+)</th></tr>
      <tr><td>Salario Base Fijo</td><td class="num">${formatCOP(a.salarioBasico)}</td><td class="num">${formatCOP(a.salarioConsolidado)}</td></tr>
      <tr><td>Carga Prestacional (43.65%)</td><td class="num">${formatCOP(a.prestacionesBasico)}</td><td class="num">${formatCOP(a.prestacionesConsolid)}</td></tr>
      <tr><td>Bono Cumplimiento (Metas)</td><td class="num" style="color:var(--verde)">+${formatCOP(a.bonoBasico)}</td><td class="num">—</td></tr>
      <tr><td>Bono Retroactivo (Pago deuda)</td><td class="num">—</td><td class="num" style="color:var(--verde)">+${formatCOP(a.bonoRetroactivo)}</td></tr>
      <tr class="total-row"><td><strong>COSTO TOTAL ADMIN / MES</strong></td><td class="num"><strong>${formatCOP(a.costoTotalBasico)}</strong></td><td class="num"><strong>${formatCOP(a.costoTotalConsolid)}</strong></td></tr>
    </table>
    <p style="font-size:0.72rem;color:var(--gris3);margin-top:0.5rem;">* Meses 1-2: Trabajo Ad Honorem. Meses 3-4: 1 SMMLV fijo + Bono por cumplimiento de ventas para aliviar la caja. Mes 6+: 2 SMMLV fijo + Bono mensual retroactivo para pagar el tiempo donado en el arranque.</p>
  </div>`;
  initInteractiveTables();
}

function renderCatalogoInsumos() {
  const container = document.getElementById('catalogo-insumos');
  if (!container) return;
  const cats = Object.entries(CATALOGO_INSUMOS);
  let html = '<div class="cat-tabs">';
  cats.forEach(([key,cat],idx) => {
    html += `<button class="cat-tab${idx===0?' active':''}" onclick="switchCat('${key}',this)">${cat.icono} ${cat.nombre}</button>`;
  });
  html += '</div>';

  cats.forEach(([key,cat],idx) => {
    const isKits = key === 'kitsEspeciales';
    html += `<div class="cat-panel${idx===0?' active':''}" id="panel-${key}">`;

    if (isKits) {
      html += '<div class="grid-2">';
      cat.items.forEach(item => {
        html += `<div class="card" style="border-left:3px solid ${cat.color};">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.6rem;">
            <span class="badge badge-rojo">${item.id}</span>
            <div style="text-align:right;">
              <div style="font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:var(--verde);">${formatCOP(item.precioVenta)}</div>
              <div style="font-size:0.6rem;color:var(--gris3);">precio venta</div>
            </div>
          </div>
          <h3 style="color:var(--blanco);margin-bottom:0.3rem;">${item.nombre}</h3>
          <p style="font-size:0.75rem;margin-bottom:0.6rem;">${item.descripcion}</p>
          <div class="tags" style="margin-bottom:0.6rem;">${item.contenido.map(c=>`<span class="tag">${c}</span>`).join('')}</div>
          <div style="display:flex;justify-content:space-between;padding-top:0.5rem;border-top:1px solid var(--gris2);">
            <span style="font-size:0.7rem;color:var(--gris3);">Costo: ${formatCOP(item.precioCosto)}</span>
            <span style="font-size:0.7rem;color:${margenColor(item.margen)};">Margen ${item.margen}%</span>
          </div>
          <p style="font-size:0.72rem;margin-top:0.4rem;color:${cat.color};">📚 ${item.usoTarea}</p>
        </div>`;
      });
      html += '</div>';
    } else {
      html += `<table>
        <tr><th>Cód.</th><th>Insumo</th><th>Unidad</th><th style="text-align:right">Costo</th><th style="text-align:right">Venta</th><th style="text-align:right">Margen</th><th>Uso en tareas</th></tr>`;
      cat.items.forEach(item => {
        html += `<tr>
          <td><span class="badge badge-azul">${item.id}</span></td>
          <td><strong>${item.nombre}</strong></td>
          <td class="cat">${item.unidad}</td>
          <td class="num">${formatCOP(item.precioCosto)}</td>
          <td class="num" style="color:var(--verde);">${formatCOP(item.precioVenta)}</td>
          <td class="num" style="color:${margenColor(item.margen)};">${item.margen}%</td>
          <td style="font-size:0.72rem;color:var(--gris3);">${item.usoTarea}</td>
        </tr>`;
      });
      html += '</table>';
    }
    html += '</div>';
  });

  container.innerHTML = html;
  initInteractiveTables();
}

function switchCat(key, btn) {
  document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('panel-' + key);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ============================================================
   6. NAVEGACIÓN SPA
   ============================================================ */

const SECCIONES = ['resumen','costos','insumos','ingresos','viabilidad','kpis','ruta','donantes','pitch'];

function mostrarSeccion(id, btn) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  const seccion = document.getElementById(id);
  if (seccion) seccion.classList.add('active');
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'insumos') renderCatalogoInsumos();
  if (id === 'costos')  renderAdminDesglose();
  initInteractiveTables();
  
  // Re-activar animaciones de números para la sección visible si las hay
  setTimeout(() => {
    initAnimatedCounters();
  }, 100);
}

document.addEventListener('keydown', e => {
  if (e.altKey) {
    const idx = parseInt(e.key) - 1;
    if (idx >= 0 && idx < SECCIONES.length) {
      const btns = document.querySelectorAll('nav button');
      mostrarSeccion(SECCIONES[idx], btns[idx + 1]);
    }
  }
});

/* ============================================================
   7. INTERFAZ DASHBOARD (TABLAS EXPANSIBLES)
   ============================================================ */
function initInteractiveTables() {
  document.querySelectorAll('table').forEach(table => {
    // Evitar envolver dos veces
    if (table.parentElement && table.parentElement.classList.contains('table-scroll')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    
    const header = document.createElement('div');
    header.className = 'table-header';
    
    const title = document.createElement('div');
    title.className = 'table-title';
    
    // Buscar si hay un h2 previo para usarlo de título
    let prev = table.previousElementSibling;
    let titleText = '📊 Panel de Datos';
    if (prev && (prev.tagName === 'H2' || prev.tagName === 'H3')) {
      titleText = '📊 ' + prev.innerText;
      prev.style.display = 'none'; // Ocultar el h2 original porque ahora está en la cabecera
    }
    title.innerHTML = titleText;

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '0.5rem';

    const btnCollapse = document.createElement('button');
    btnCollapse.className = 'btn-collapse';
    btnCollapse.innerHTML = '− Minimizar';
    btnCollapse.onclick = () => {
      wrapper.classList.toggle('collapsed');
      btnCollapse.innerHTML = wrapper.classList.contains('collapsed') ? '+ Expandir' : '− Minimizar';
    };

    const btn = document.createElement('button');
    btn.className = 'btn-maximize';
    btn.innerHTML = '⛶ Ampliar';
    btn.onclick = () => {
      const isMax = wrapper.classList.toggle('fullscreen');
      btn.innerHTML = isMax ? '✕ Cerrar Panel' : '⛶ Ampliar';
      if (isMax) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    actions.appendChild(btnCollapse);
    actions.appendChild(btn);

    header.appendChild(title);
    header.appendChild(actions);

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(header);
    
    const scrollArea = document.createElement('div');
    scrollArea.className = 'table-scroll';
    scrollArea.appendChild(table);
    wrapper.appendChild(scrollArea);
  });
}

/* ============================================================
   8. EFECTO CONTADOR NUMÉRICO (ANIMACIÓN)
   ============================================================ */
function initAnimatedCounters() {
  const elements = document.querySelectorAll('.metric-value, .hero-stat-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      
      if (entry.isIntersecting) {
        if (el.dataset.animating === 'true') return;
        el.dataset.animating = 'true';
        
        if (!el.dataset.original) {
          el.dataset.original = el.innerText;
        }
        const originalText = el.dataset.original;
        
        // Extraer solo los números
        const numStr = originalText.replace(/[^0-9]/g, '');
        if (!numStr) return;
        
        const targetNum = parseInt(numStr, 10);
        const duration = 1500; // 1.5 segundos
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          // Easing easeOutExpo para frenar al final
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentNum = Math.floor(targetNum * easeProgress);
          
          let formattedNum = currentNum.toLocaleString('es-CO');
          
          // Reconstruir prefijos y sufijos
          if (originalText.includes('$')) {
            formattedNum = '$' + formattedNum;
          } else if (originalText.includes('M')) {
            formattedNum = formattedNum + 'M';
          } else if (originalText.includes('h')) {
            formattedNum = formattedNum + 'h';
          } else if (originalText.includes('%')) {
            formattedNum = formattedNum + '%';
          } else if (originalText.includes('/10')) {
            formattedNum = formattedNum + '/10';
          }
          
          el.innerText = formattedNum;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerText = originalText; // Valor exacto al finalizar
            el.dataset.animating = 'false';
          }
        };
        requestAnimationFrame(updateCounter);
      } else {
        // Permite que la animación se repita si el usuario hace scroll hacia arriba y vuelve a bajar
        el.dataset.animating = 'false';
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   8. INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const fin = calcularFinanzas();
  const adm = calcularAdmin();
  renderAdminDesglose();
  initInteractiveTables();
  initAnimatedCounters();
  
  console.log('MÓDULO COMUNIDAD v2.0 · 2026');
  console.log('SMMLV:', formatCOP(LEGAL_2026.smmlv));
  console.log('Admin básico:', formatCOP(adm.costoTotalBasico), '| consolidado:', formatCOP(adm.costoTotalConsolid));
  console.log('Total costos/mes básico:', formatCOP(fin.totalBasico), '| consolidado:', formatCOP(fin.totalConsolid));
  console.log('Ingresos mes 6+:', formatCOP(fin.ingM6));
  console.log('Dotación inicial:', formatCOP(fin.totalDotacion));
  console.log('Catálogo:', window.ModuloComunidad?.catalogo);
});

/* ============================================================
   9. API PÚBLICA
   ============================================================ */

window.ModuloComunidad = {
  legal2026: LEGAL_2026,
  datos: DATOS_2026,
  catalogo: CATALOGO_INSUMOS,
  calcularFinanzas,
  calcularAdmin,
  formatCOP,
  version: '2.0.0',
};
