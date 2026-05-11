const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/*
  LOGICA DEL PROTOTIPO - MULTIPLICA
  ---------------------------------
*/

const config = window.MULTIPLICA_CONFIG || {};
const taskData = config.tareas || {};
const kioskData = config.quioscos || {};
const timelineData = config.lineaTiempo || {};
const makerData = config.nivelesMaker || {};
const quickMessages = config.mensajesRapidos || {};
const promptStarters = config.promptsIniciales || {};
const googlePoints = config.puntosGoogle || [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initWhiteboard() {
  const whiteboard = $(".whiteboard");
  if (!whiteboard) return;

  let activeItem = null;
  let offset = { x: 0, y: 0 };
  let lastFocusedNote = null;
  let topZ = 1000;

  function makeInteractive(el) {
    el.addEventListener("mousedown", (e) => {
      if (e.target.closest(".delete-btn")) return;
      if (e.target.closest(".math-del")) return;
      
      const rect = el.getBoundingClientRect();
      const isResizeHandle = (e.clientX > rect.right - 25 && e.clientY > rect.bottom - 25);
      
      if (isResizeHandle) return; 
      
      activeItem = el;
      offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      
      topZ++;
      el.style.zIndex = topZ;
      lastFocusedNote = el;
      
      if (!el.isContentEditable) e.preventDefault();
    });

    if (!el.querySelector(".delete-btn")) {
      const btn = document.createElement("button");
      btn.className = "delete-btn";
      btn.type = "button";
      btn.innerHTML = "&times;";
      btn.onclick = (e) => {
        e.stopPropagation();
        el.remove();
      };
      el.appendChild(btn);
    }
  }

  $$(".note, .fraction-card", whiteboard).forEach(makeInteractive);

  const clearBoardBtn = $("#clearBoardBtn");
  if (clearBoardBtn) {
    clearBoardBtn.onclick = () => {
      if (confirm("¿Seguro que quieres limpiar toda la pizarra?")) {
        $$(".note, .fraction-card, .image-note", whiteboard).forEach(el => el.remove());
      }
    };
  }

  const addNoteBtn = $("#addNoteBtn");
  if (addNoteBtn) {
    addNoteBtn.onclick = () => {
      const n = document.createElement("div");
      n.className = "note";
      n.contentEditable = "true";
      n.textContent = "Escribe aquí...";
      n.style.left = "20%";
      n.style.top = "20%";
      whiteboard.appendChild(n);
      makeInteractive(n);
      n.focus();
      lastFocusedNote = n;
    };
  }

  const addImageBtn = $("#addImageBtn");
  const imgInput = $("#imageInput");
  if (addImageBtn && imgInput) {
    addImageBtn.onclick = () => imgInput.click();
    imgInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const div = document.createElement("div");
        div.className = "note image-note";
        div.style.cssText = "left:20%;top:20%;padding:10px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);cursor:grab;position:absolute;resize:both;overflow:hidden;width:280px;min-height:100px;";
        const img = document.createElement("img");
        img.src = ev.target.result;
        img.style.cssText = "width:100%;height:100%;object-fit:contain;border-radius:8px;pointer-events:none;display:block;";
        div.appendChild(img);
        whiteboard.appendChild(div);
        makeInteractive(div);
      };
      reader.readAsDataURL(file);
      imgInput.value = "";
    };
  }

  const fsBtn = $("#fullscreenBtn");
  const panel = $(".collab-panel");
  if (fsBtn && panel) {
    fsBtn.onclick = () => {
      const isMax = panel.classList.toggle("fs");
      fsBtn.textContent = isMax ? "✕" : "⛶";
    };
  }

  const toggleMath = $("#toggleMath");
  const mathTools = $("#mathTools");
  if (toggleMath && mathTools) {
    toggleMath.onclick = () => {
      mathTools.style.display = mathTools.style.display === "none" ? "flex" : "none";
    };
  }

  $$(".math-btn").forEach((btn) => {
    btn.onmousedown = (e) => e.preventDefault();
    btn.onclick = () => {
      const sym = btn.dataset.symbol;
      if (!sym) return;
      let html = "";
      const delBtnHtml = '<button class="math-del" type="button" onclick="this.parentElement.remove()" style="display:none;position:absolute;top:-8px;right:-8px;background:var(--magenta);color:white;border:none;border-radius:50%;width:16px;height:16px;font-size:10px;cursor:pointer;line-height:1;z-index:10;">&times;</button>';

      if (sym === "frac") {
        html = `<span class="math-fraction" contenteditable="false" onmouseover="this.querySelector('.math-del').style.display='block'" onmouseout="this.querySelector('.math-del').style.display='none'">${delBtnHtml}<span class="num" contenteditable="true">n</span><span class="den" contenteditable="true">d</span></span>&nbsp;`;
      } else if (sym === "pow") {
        html = `<span class="math-pow" contenteditable="false" onmouseover="this.querySelector('.math-del').style.display='block'" onmouseout="this.querySelector('.math-del').style.display='none'">${delBtnHtml}<span class="base" contenteditable="true">x</span><span class="exp" contenteditable="true">y</span></span>&nbsp;`;
      } else if (sym === "sqrt") {
        html = `<span class="math-sqrt" contenteditable="false" onmouseover="this.querySelector('.math-del').style.display='block'" onmouseout="this.querySelector('.math-del').style.display='none'">${delBtnHtml}<span class="index" contenteditable="true">n</span><span class="tick">√</span><span class="radicand" contenteditable="true">x</span></span>&nbsp;`;
      } else if (sym === "(") {
        html = `(<span contenteditable="true" style="min-width:1ch;display:inline-block;"> </span>)`;
      } else {
        html = sym;
      }

      if (lastFocusedNote) {
        lastFocusedNote.focus();
        document.execCommand("insertHTML", false, html);
      } else {
        const n = document.createElement("div");
        n.className = "note";
        n.contentEditable = "true";
        n.innerHTML = html;
        n.style.left = "40%";
        n.style.top = "35%";
        whiteboard.appendChild(n);
        makeInteractive(n);
        lastFocusedNote = n;
      }
    };
  });

  document.addEventListener("mousemove", (e) => {
    if (!activeItem) return;
    const rect = whiteboard.getBoundingClientRect();
    activeItem.style.left = `${((e.clientX - rect.left - offset.x) / rect.width) * 100}%`;
    activeItem.style.top = `${((e.clientY - rect.top - offset.y) / rect.height) * 100}%`;
    activeItem.style.cursor = "grabbing";
  });
  document.addEventListener("mouseup", () => {
    if (activeItem) activeItem.style.cursor = "grab";
    activeItem = null;
  });
}

function drawNetwork() {
  const canvas = $("#networkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const nodes = [
    [width * 0.16, height * 0.70], 
    [width * 0.36, height * 0.48], 
    [width * 0.56, height * 0.58], 
    [width * 0.76, height * 0.36],
    [width * 0.64, height * 0.24],
    [width * 0.26, height * 0.30]
  ];

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0, 240, 255, 0.2)";
  ctx.beginPath();
  nodes.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Glow line
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 240, 255, 0.6)";
  ctx.stroke();

  // Points on nodes (optional since icons are on top)
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

// UI HANDLERS
const menuToggle = $(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", (event) => {
    const nav = $("#nav");
    if (nav) {
      nav.classList.toggle("open");
      event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
    }
  });
}

const themeToggle = $("#themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const light = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = light ? "light" : "dark";
    themeToggle.textContent = light ? "N" : "D";
  });
}

// LOGICA DE RUTA DE APRENDIZAJE (Conexión Tarea -> Pizarra)
// Este sistema permite que al elegir una "misión" de la izquierda, la pizarra se prepare con el reto matemático correspondiente.
$$(".task-item").forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Gestionar estados visuales
    $$(".task-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    // 2. Actualizar textos de la misión
    const taskKey = button.dataset.task;
    const [title, meta] = taskData[taskKey] || ["Tarea", "Sin datos"];
    const tTitle = $("#taskTitle");
    const tMeta = $("#taskMeta");
    if (tTitle) tTitle.textContent = title;
    if (tMeta) tMeta.textContent = meta;

    // 3. CONEXIÓN CON LA PIZARRA: Limpiar y añadir ejemplo inicial
    const board = $("#whiteboard");
    if (board) {
      board.innerHTML = ""; // Limpiamos la pizarra para el nuevo reto
      
      // Añadimos un componente inicial según la tarea para dar "sentido"
      if (taskKey === "fracciones") {
        createMathComponent("fraction", 50, 50);
      } else if (taskKey === "potencias") {
        createMathComponent("pow", 50, 50);
      } else if (taskKey === "raices") {
        createMathComponent("sqrt", 50, 50);
      }
    }
  });
});

function typewriter(element, text, speed = 25) {
  element.textContent = "";
  const characters = Array.from(text); // Maneja correctamente caracteres especiales y emojis
  let i = 0;
  function tick() {
    if (i < characters.length) {
      element.textContent += characters[i];
      i++;
      setTimeout(tick, speed);
    }
  }
  tick();
}

$$(".time-dot").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".time-dot").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const tText = $("#timelineText");
    const content = timelineData[button.dataset.year] || "Archivo no encontrado...";
    if (tText) typewriter(tText, content);
  });
});

// LOGICA DE LABORATORIO IA (PROMPT BUILDER)
// GUIA MANUAL: Puedes añadir más plantillas aquí para diferentes tipos de proyectos
const buildBtn = $("#buildPrompt");
if (buildBtn) {
  buildBtn.addEventListener("click", () => {
    const type = $("#promptType").value;
    const theme = $("#promptTheme").value || "[Inserta un tema]";
    const tone = $("#promptTone").value;
    const style = $("#promptStyle").value;
    const output = $("#promptOutput");

    const templates = {
      historia: `Actúa como un cronista de Manrique. Crea una historia sobre "${theme}" con un tono ${tone} y una estética ${style}. Enfócate en el alma del barrio.`,
      imagen: `Prompt para IA de Imagen: Una escena hiperrealista de Manrique sobre "${theme}". Estética: ${style}. Iluminación cinematográfica, 8k, ultra detallado, tono ${tone}.`,
      guion: `Guion de microdoc de 1 min. Tema: "${theme}". Estética visual: ${style}. Tono: ${tone}. Describe escenas icónicas de la ladera con este estilo.`,
      marca: `Branding para emprendimiento en Manrique. Concepto: "${theme}". Estética: ${style}. Tono: ${tone}. Incluye paleta de colores y valores de marca.`
    };

    const prompt = templates[type] || "Selecciona una misión.";
    if (output) typewriter(output, prompt, 15);
  });
}

// LOGICA DEL SIMULADOR MAKER (La barra de energía)
// Esta barra conecta la "intensidad" del reto con el equipo que se necesita activar.
const makerRange = $("#makerRange");
if (makerRange) {
  makerRange.addEventListener("input", () => {
    const val = makerRange.value;
    const levelEl = $("#makerLevel");
    const resultEl = $("#makerResult");
    
    // Diccionario de resultados según el nivel de energía
    const results = {
      1: { name: "Nivel 1: Exploración", team: "Equipo: Curiosidad + Mentores" },
      2: { name: "Nivel 2: Prototipado", team: "Equipo: Diseño + Guion + Podcast" },
      3: { name: "Nivel 3: Construcción", team: "Equipo: Hardware + Programación + Storytelling" },
      4: { name: "Nivel 4: Producción", team: "Equipo: Cine + Edición + Branding" },
      5: { name: "Nivel 5: Lanzamiento", team: "Equipo: Comunidad + Redes + Multiplicadores" }
    };

    if (levelEl) levelEl.textContent = results[val].name;
    if (resultEl) {
      resultEl.style.opacity = 0;
      setTimeout(() => {
        resultEl.textContent = results[val].team;
        resultEl.style.opacity = 1;
      }, 50);
    }
  });
}

$$(".kiosk").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".kiosk").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const kName = $("#kioskName");
    const kStatus = $("#kioskStatus");
    if (kName) kName.textContent = button.dataset.kiosk;
    if (kStatus) kStatus.textContent = kioskData[button.dataset.kiosk] || "...";
  });
});

function drawNetwork() {
  const canvas = $("#networkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const nodes = [
    [width * 0.10, height * 0.80], 
    [width * 0.30, height * 0.55], 
    [width * 0.50, height * 0.65], 
    [width * 0.85, height * 0.45],
    [width * 0.70, height * 0.25],
    [width * 0.20, height * 0.35]
  ];

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
  ctx.beginPath();
  nodes.forEach(([x, y], i) => {
    // Connect to the next two nodes for a mesh effect
    const next1 = nodes[(i + 1) % nodes.length];
    const next2 = nodes[(i + 2) % nodes.length];
    
    ctx.moveTo(x, y);
    ctx.lineTo(next1[0], next1[1]);
    ctx.moveTo(x, y);
    ctx.lineTo(next2[0], next2[1]);
  });
  ctx.stroke();

  // Highlight glow
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(0, 240, 255, 0.6)";
  ctx.stroke();
}

// LOGICA DEL MENTOR VIRTUAL (PROTOTIPO)
const mAnswerBtn = $("#mentorAnswer");
if (mAnswerBtn) {
  mAnswerBtn.addEventListener("click", () => {
    const input = $("#mentorInput").value.trim();
    const responseEl = $("#mentorResponse");
    
    if (!input) {
      if (responseEl) responseEl.textContent = "Por favor, cuéntame qué tarea quieres resolver.";
      return;
    }

    // 1. Efecto de "Pensando"
    if (responseEl) {
      responseEl.innerHTML = '<span class="loading-dots">Analizando el reto...</span>';
      mAnswerBtn.disabled = true;
    }

    // Simulación de delay de red (2 segundos)
    setTimeout(() => {
      // 2. Respuesta Prototipo
      // GUIA MANUAL: Aquí es donde conectarías con una API real de IA (OpenAI, Gemini, etc.)
      // Fetch('https://tu-api-de-automatizacion.com', { method: 'POST', body: JSON.stringify({ q: input }) })
      
      const simulatedResponse = `
        ⚡ RUTA GENERADA PARA: "${input}"
        
        1. ENTENDER: Imagina que los números son porciones de una arepa...
        2. PRACTICAR: Resuelve 3 ejercicios visuales usando la pizarra.
        3. CREAR: Crea tu propio ejemplo basado en un emprendimiento del barrio.
        4. COMPARTIR: Explícale tu hallazgo a un compañero en el quiosco más cercano.
      `;

      if (responseEl) {
        responseEl.innerHTML = ""; // Limpiamos el loading
        typewriter(responseEl, simulatedResponse, 15);
      }
      mAnswerBtn.disabled = false;
    }, 1500);
  });
}

function initMatrixRain() {
  const canvas = $("#matrixCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  const charList = "0123456789X+/-=%√∑∆∞";
  const fontSize = 14;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
    ctx.font = `${fontSize}px Courier New`;

    for (let i = 0; i < drops.length; i++) {
      const text = charList[Math.floor(Math.random() * charList.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  // Ajustar en redimensionamiento
  window.addEventListener("resize", () => {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const newColumns = Math.floor(width / fontSize);
    drops.length = newColumns;
    drops.fill(1);
  });

  draw();
}

// LOGICA DE COMENTARIOS COLABORATIVOS (Pizarra)
function makeNoteInteractive(el) {
  // 1. Añadir botón de borrar si no existe
  if (!el.querySelector(".delete-btn")) {
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = "×";
    delBtn.title = "Eliminar nota";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      el.remove();
    };
    el.appendChild(delBtn);
  }

  // 2. Lógica de Arrastre (Drag & Drop)
  let isDragging = false;
  let startX, startY;

  el.addEventListener("mousedown", (e) => {
    // Si hacemos clic en el botón de borrar o estamos editando texto, no arrastramos
    if (e.target.classList.contains("delete-btn")) return;
    
    isDragging = true;
    startX = e.clientX - el.offsetLeft;
    startY = e.clientY - el.offsetTop;
    el.style.zIndex = 1000;
    el.style.cursor = "grabbing";
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const board = el.parentElement;
    const rect = board.getBoundingClientRect();
    
    // Mantener la nota dentro de la pizarra
    let x = e.clientX - startX;
    let y = e.clientY - startY;
    
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      el.style.zIndex = "";
      el.style.cursor = "grab";
    }
  });
}

// Inicializar todas las notas y cards existentes
$$(".note, .fraction-card").forEach(makeNoteInteractive);

const sendCommentBtn = $("#sendCommentBtn");
if (sendCommentBtn) {
  sendCommentBtn.addEventListener("click", () => {
    const input = $("#collaborativeInput");
    const board = $("#whiteboard");
    
    if (!input || !input.value.trim()) return;

    const val = input.value;
    input.value = ""; // Limpiar inmediatamente para mejor UX

    // Pequeño delay para simular "procesamiento"
    sendCommentBtn.disabled = true;
    sendCommentBtn.textContent = "...";

    setTimeout(() => {
      const newNote = document.createElement("div");
      newNote.className = "note";
      newNote.contentEditable = "true";
      newNote.textContent = val;
      
      // Posición aleatoria para que no se amontonen todas en el mismo sitio
      const randomX = Math.floor(Math.random() * (board.clientWidth - 150));
      const randomY = Math.random() * 100 + 150;
      
      newNote.style.left = `${randomX}px`;
      newNote.style.top = `${randomY}px`;
      
      if (board) {
        board.appendChild(newNote);
        makeNoteInteractive(newNote);
      }
      
      sendCommentBtn.disabled = false;
      sendCommentBtn.textContent = "Enviar";
    }, 300);
  });

  // Permitir enviar con la tecla Enter
  $("#collaborativeInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendCommentBtn.click();
  });
}

// LOGICA PARA ABRIR/CERRAR EL DIALOGO DEL MENTOR
const mentorFab = $("#mentorFab");
const mentorDialog = $("#mentorDialog");
if (mentorFab && mentorDialog) {
  mentorFab.addEventListener("click", () => {
    mentorDialog.showModal();
  });
}

// Cerrar con el botón 'x'
const closeBtn = $(".dialog-close", mentorDialog);
if (closeBtn && mentorDialog) {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mentorDialog.close();
  });
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initWhiteboard();
  initMatrixRain();
  drawNetwork();
  window.addEventListener("resize", () => {
    drawNetwork();
  });
  
  const counters = $$(".impact-grid strong");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const goal = Number(el.dataset.count);
      let current = 0;
      const tick = () => {
        current = Math.min(goal, current + Math.ceil(goal / 30));
        el.textContent = current.toLocaleString();
        if (current < goal) requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  });
  counters.forEach(c => observer.observe(c));
});
