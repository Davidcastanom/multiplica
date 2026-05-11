/**
 * MULTIPLICA - Motor de Interactividad (PICH Edition)
 * Versión restaurada al estado anterior al comentado.
 */

const $ = (s, scope = document) => scope.querySelector(s);
const $$ = (s, scope = document) => [...scope.querySelectorAll(s)];

// --- NAVEGACIÓN SPA ---
function showSection(id) {
  const modules = $$(".module");
  const navLinks = $$(".nav a");
  if (!id || id === "#" || id === "") id = "#inicio";
  const target = $(id);
  if (!target) return;
  modules.forEach(m => m.classList.remove("active"));
  navLinks.forEach(l => l.classList.remove("active"));
  target.classList.add("active");
  const activeLink = navLinks.find(l => l.getAttribute("href") === id);
  if (activeLink) activeLink.classList.add("active");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener("popstate", () => showSection(window.location.hash));
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a && a.getAttribute("href")?.startsWith("#")) {
    e.preventDefault();
    const href = a.getAttribute("href");
    history.pushState(null, null, href);
    showSection(href);
  }
});

// --- PIZARRA COLABORATIVA ---
function initWhiteboard() {
  const whiteboard = $(".whiteboard");
  if (!whiteboard) return;

  let activeItem = null;
  let offset = { x: 0, y: 0 };
  let lastFocusedNote = null;

  // Capturar la nota activa al hacer mousedown
  whiteboard.addEventListener("mousedown", (e) => {
    const note = e.target.closest(".note");
    if (note && note.contentEditable === "true") lastFocusedNote = note;
  });

  function makeInteractive(el) {
    el.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      if (document.activeElement === el) return;
      activeItem = el;
      const rect = el.getBoundingClientRect();
      offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      el.style.zIndex = 1000;
    });

    if (!el.querySelector(".delete-btn")) {
      const btn = document.createElement("button");
      btn.className = "delete-btn";
      btn.innerHTML = "×";
      btn.onclick = (e) => { e.stopPropagation(); el.remove(); };
      el.appendChild(btn);
    }
  }

  $$(".note", whiteboard).forEach(makeInteractive);

  // Botón: Añadir Nota
  const addNoteBtn = $("#addNoteBtn");
  if (addNoteBtn) {
    addNoteBtn.onclick = () => {
      const n = document.createElement("div");
      n.className = "note";
      n.contentEditable = "true";
      n.textContent = "Escribe aquí...";
      n.style.left = (25 + Math.random() * 30) + "%";
      n.style.top = (20 + Math.random() * 30) + "%";
      whiteboard.appendChild(n);
      makeInteractive(n);
      n.focus();
      lastFocusedNote = n;
    };
  }

  // Botón: Imagen
  const imgInput = $("#imageInput");
  const addImageBtn = $("#addImageBtn");
  if (addImageBtn && imgInput) {
    addImageBtn.onclick = () => imgInput.click();
    imgInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const div = document.createElement("div");
        div.className = "note image-note";
        div.style.cssText = "left:20%;top:20%;padding:6px;background:transparent;";
        const img = document.createElement("img");
        img.src = ev.target.result;
        img.style.cssText = "max-width:220px;border-radius:8px;display:block;";
        div.appendChild(img);
        whiteboard.appendChild(div);
        makeInteractive(div);
      };
      reader.readAsDataURL(file);
    };
  }

  // Botón: Pantalla Completa
  const fsBtn = $("#fullscreenBtn");
  const panel = $(".collab-panel");
  let placeholder = null;
  if (fsBtn && panel) {
    fsBtn.onclick = () => {
      const isMax = panel.classList.toggle("fs");
      if (isMax) {
        placeholder = document.createElement("div");
        panel.parentElement.insertBefore(placeholder, panel);
        document.body.appendChild(panel);
        fsBtn.textContent = "✕";
      } else {
        if (placeholder) {
          placeholder.parentElement.insertBefore(panel, placeholder);
          placeholder.remove();
        }
        fsBtn.textContent = "⛶";
      }
    };
  }

  // Motor Matemático
  const toggleMath = $("#toggleMath");
  const mathTools = $("#mathTools");
  if (toggleMath && mathTools) {
    toggleMath.onclick = () => {
      mathTools.style.display = mathTools.style.display === "none" ? "flex" : "none";
    };
  }

  $$(".math-btn").forEach(btn => {
    // Evitar que el botón robe el foco de la nota
    btn.onmousedown = (e) => e.preventDefault();

    btn.onclick = () => {
      const sym = btn.dataset.symbol;
      if (!sym) return;
      let html = sym;

      if (sym === "frac") {
        html = `<span class="math-fraction" contenteditable="false"><span class="num" contenteditable="true">n</span><span class="den" contenteditable="true">d</span></span>&nbsp;`;
      } else if (sym === "pow") {
        html = `<span class="math-pow" contenteditable="false"><span class="base" contenteditable="true">x</span><span class="exp" contenteditable="true">y</span></span>&nbsp;`;
      } else if (sym === "sqrt") {
        html = `<span class="math-sqrt" contenteditable="false"><span class="index" contenteditable="true">n</span><span class="tick">√</span><span class="radicand" contenteditable="true">x</span></span>&nbsp;`;
      } else if (sym === "(") {
        html = `(<span contenteditable="true" style="min-width:1ch;display:inline-block;">  </span>)`;
      }

      if (lastFocusedNote) {
        if (!document.activeElement.isContentEditable) lastFocusedNote.focus();
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

  // Movimiento del ratón
  document.addEventListener("mousemove", (e) => {
    if (!activeItem) return;
    const rect = whiteboard.getBoundingClientRect();
    activeItem.style.left = ((e.clientX - rect.left - offset.x) / rect.width * 100) + "%";
    activeItem.style.top = ((e.clientY - rect.top - offset.y) / rect.height * 100) + "%";
  });
  document.addEventListener("mouseup", () => activeItem = null);
}

// --- CONTADORES DE IMPACTO ---
function initImpact() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const end = parseInt(target.dataset.count, 10);
      let cur = 0;
      const step = Math.ceil(end / 40);
      const tick = () => {
        cur = Math.min(cur + step, end);
        target.textContent = cur.toLocaleString();
        if (cur < end) requestAnimationFrame(tick);
      };
      tick();
      io.unobserve(target);
    });
  }, { threshold: 0.5 });

  $$("[data-count]").forEach(el => io.observe(el));
}

// --- INICIO ---
document.addEventListener("DOMContentLoaded", () => {
  showSection(window.location.hash || "#inicio");
  initWhiteboard();
  initImpact();
});
