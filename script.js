/* ============================================================
   EAC LUCÍA — script.js
   Modelo de Jonassen | Entorno de Aprendizaje Constructivista
   ============================================================ */

"use strict";

/* ── 1. PROGRESS BAR ── */
(function initProgress() {
  const fill = document.getElementById("progress-fill");
  if (!fill) return;
  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = total > 0 ? ((scrolled / total) * 100).toFixed(1) + "%" : "0%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

/* ── 2. MOBILE NAV ── */
(function initNav() {
  const burger = document.querySelector(".nav-burger");
  const links  = document.querySelector(".nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  // close on link click
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
})();

/* ── 3. ACTIVE NAV LINK (IntersectionObserver) ── */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => obs.observe(s));
})();

/* ── 4. COLLAPSIBLE CASE BLOCKS ── */
(function initCollapsibles() {
  document.querySelectorAll(".case-block-header").forEach(header => {
    const block = header.closest(".case-block");
    header.addEventListener("click", () => {
      const isOpen = block.classList.toggle("open");
      header.setAttribute("aria-expanded", isOpen);
      const body = block.querySelector(".case-block-body");
      if (isOpen) {
        body.style.display = "block";
        body.style.animation = "fadeUp 0.3s ease";
      } else {
        body.style.display = "none";
      }
    });
  });
  // Open first block by default
  const first = document.querySelector(".case-block");
  if (first) {
    first.classList.add("open");
    const body = first.querySelector(".case-block-body");
    if (body) body.style.display = "block";
  }
})();

/* ── 5. TABS ── */
(function initTabs() {
  const tabBtns   = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const panel = document.getElementById("panel-" + target);
      if (panel) panel.classList.add("active");
    });
  });
})();

/* ── 6. SCAFFOLDING MODALS ── */
const MODAL_CONTENT = {
  formulacion: {
    title: "Andamiaje: Formulación de Caso Clínico",
    subtitle: "Modelo TTN (Tiempo–Tema–Narrativa) aplicado al caso de Lucía",
    sections: [
      {
        h4: "¿Qué es la formulación de caso?",
        content: "Es un mapa conceptual individualizado que integra los factores predisponentes, precipitantes, perpetuantes y protectores para explicar cómo y por qué se desarrolló el trastorno en esta persona específica (Johnstone & Dallos, 2014)."
      },
      {
        h4: "Paso 1 — Línea de tiempo (Tiempo)",
        content: `
          <ul>
            <li>2007 (10 años): TCE → inicio de síntomas prodrómicos (despersonalización, ilusiones visuales)</li>
            <li>2013 (15 años): Primera valoración psiquiátrica; diagnóstico probable epilepsia</li>
            <li>2021 (24 años): Primer episodio psicótico franco; hospitalización 84 días</li>
            <li>Dic 2023: Embarazo → ajuste de tratamiento (retiro valproato)</li>
            <li>Ene 2024: Parto por cesárea → suspensión total de antipsicóticos</li>
            <li>Abr 2024: Recaída psicótica severa → segundo internamiento (32 días)</li>
          </ul>
        `
      },
      {
        h4: "Paso 2 — Ejes temáticos (Tema)",
        content: `
          <ul>
            <li><strong>Biológico:</strong> TCE, EEG anormal (foco fronto-parietal), antecedente epiléptico, preeclampsia</li>
            <li><strong>Psicológico:</strong> Personalidad introvertida-esquizoide, escaso insight, delirios místico-religiosos</li>
            <li><strong>Social:</strong> Violencia de pareja, pobreza, aislamiento, escasa red de apoyo</li>
            <li><strong>Familiar:</strong> Padre fallecido, madre con epilepsia, dinámica de alta expresión emocional</li>
          </ul>
        `
      },
      {
        h4: "Paso 3 — Narrativa clínica (Narrativa)",
        content: `Lucía es una mujer de 26 años cuya vulnerabilidad biológica (TCE a los 10 años, antecedente epiléptico y posible predisposición genética) se ve potenciada por factores psicosociales crónicos (violencia de pareja, pobreza extrema, aislamiento social). 
        El evento precipitante del segundo episodio fue la suspensión voluntaria del antipsicótico durante la lactancia, en un contexto de nulo apoyo familiar y social.`,
        tip: "Consejo clínico: Siempre diferenciar factores que INICIAN el episodio (precipitantes) vs. factores que lo MANTIENEN (perpetuantes). En Lucía, la falta de apego al tratamiento es un factor perpetuante clave."
      },
      {
        h4: "Aplicación de la GPC de Esquizofrenia",
        content: `
          <ul>
            <li>Fase aguda: estabilización con antipsicótico + benzodiacepina</li>
            <li>Fase de mantenimiento: Olanzapina 20 mg → reducir síntomas positivos y prolactina</li>
            <li>Intervención psicosocial: IPSRT (Terapia Interpersonal y de Ritmo Social) para regularizar ciclos de sueño-vigilia</li>
            <li>Intervención familiar: psicoeducación a cuidadores principales</li>
          </ul>
        `
      }
    ]
  },
  ipsrt: {
    title: "Andamiaje: IPSRT — Prevención de Recaídas",
    subtitle: "Terapia Interpersonal y de Ritmo Social aplicada al caso de Lucía",
    sections: [
      {
        h4: "¿Qué es la IPSRT?",
        content: "Modalidad terapéutica que combina técnicas de terapia interpersonal con el manejo de los ritmos sociales (ciclos de actividad, sueño y alimentación). Tiene evidencia en el mantenimiento de la remisión en trastornos del espectro psicótico (Frank et al., 2005)."
      },
      {
        h4: "Aplicación al caso de Lucía",
        content: `
          <ul>
            <li><strong>Registro de Ritmo Social:</strong> Identificar la irregularidad producida por la lactancia nocturna como disparador del insomnio y la descompensación.</li>
            <li><strong>Regulación de rutinas:</strong> Establecer horarios fijos de sueño, alimentación y cuidado del bebé.</li>
            <li><strong>Área interpersonal:</strong> Abordar el duelo de roles (de mujer autónoma a cuidadora con enfermedad crónica).</li>
            <li><strong>Resolución del duelo:</strong> Pérdida del padre, violencia de pareja previa.</li>
          </ul>
        `,
        tip: "Recuerda: en Lucía el disparador proximal de la recaída fue la alteración del ritmo sueño-vigilia por maternidad. La IPSRT aborda exactamente este mecanismo."
      },
      {
        h4: "Contraindicaciones relativas a considerar",
        content: `
          <ul>
            <li>Fase psicótica aguda activa (requiere primero estabilización farmacológica)</li>
            <li>Insight nulo (trabajar psicoeducación antes)</li>
            <li>Sin red de apoyo mínima (involucrar a la madre como aliada terapéutica)</li>
          </ul>
        `
      }
    ]
  },
  bprs: {
    title: "Andamiaje: Evaluación Psicométrica en Psicosis",
    subtitle: "Selección e interpretación de instrumentos para el caso de Lucía",
    sections: [
      {
        h4: "Instrumentos recomendados por la GPC",
        content: `
          <ul>
            <li><strong>PANSS</strong> (Escala de Síntomas Positivos y Negativos): Gold standard para psicosis. Evalúa 30 ítems. Indica gravedad basal y respuesta a tratamiento.</li>
            <li><strong>BPRS</strong> (Escala Breve de Evaluación Psiquiátrica): 18–24 ítems; útil en urgencias y seguimiento.</li>
            <li><strong>CDSS</strong> (Escala de Depresión de Calgary para Esquizofrenia): distingue síntomas negativos de depresión comórbida.</li>
            <li><strong>GAF</strong> (Evaluación de Funcionamiento Global): imprescindible para planificación del alta.</li>
          </ul>
        `
      },
      {
        h4: "Consideraciones en el caso de Lucía",
        content: `
          <ul>
            <li>Aplicar en fase de mayor estabilidad (semanas 3-4 de internamiento)</li>
            <li>Bajo nivel educativo (secundaria incompleta): usar versiones con lenguaje simplificado y apoyo del entrevistador</li>
            <li>Nulo insight: aplicar primero escalas heteroadministradas (PANSS) antes de autoreporte</li>
          </ul>
        `,
        tip: "Error frecuente: aplicar MMSE como sustituto de evaluación cognitiva en psicosis. En su lugar, utiliza MoCA o baterías cognitivas específicas (MATRICS) cuando el paciente esté estabilizado."
      }
    ]
  }
};

function openModal(key) {
  const data = MODAL_CONTENT[key];
  if (!data) return;
  const overlay = document.getElementById("scaffold-modal");
  const titleEl = overlay.querySelector(".modal-title");
  const subEl   = overlay.querySelector(".modal-subtitle");
  const bodyEl  = overlay.querySelector(".modal-body");

  titleEl.textContent = data.title;
  subEl.textContent   = data.subtitle || "";
  bodyEl.innerHTML    = "";

  data.sections.forEach(sec => {
    const div = document.createElement("div");
    div.className = "modal-section";
    const h4 = document.createElement("h4");
    h4.textContent = sec.h4;
    div.appendChild(h4);
    if (sec.content) {
      const p = document.createElement("div");
      p.innerHTML = sec.content;
      div.appendChild(p);
    }
    if (sec.tip) {
      const tip = document.createElement("div");
      tip.className = "tip-box";
      tip.innerHTML = `<p>💡 <strong>Pista clínica:</strong> ${sec.tip}</p>`;
      div.appendChild(tip);
    }
    bodyEl.appendChild(div);
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("scaffold-modal");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Close on overlay click
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("scaffold-modal");
  if (overlay) {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });
  }
});

/* ── 7. FORUM INTERACTION ── */
(function initForum() {
  document.querySelectorAll(".fq-item").forEach(item => {
    item.addEventListener("click", () => {
      const replyBox = item.querySelector(".reply-box");
      if (!replyBox) return;
      const isOpen = replyBox.classList.toggle("open");
      // auto-focus textarea
      if (isOpen) {
        const ta = replyBox.querySelector("textarea");
        if (ta) setTimeout(() => ta.focus(), 50);
      }
    });
  });

  document.querySelectorAll(".reply-submit").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const box  = btn.closest(".reply-box");
      const ta   = box.querySelector("textarea");
      const text = ta.value.trim();
      if (!text) { ta.focus(); return; }
      // Gamification: show XP toast
      showToast("✅ Respuesta guardada — +15 XP");
      ta.value = "";
      box.classList.remove("open");
      // Increment student score in UI (demo)
      const lb = document.querySelector(".lb-item.gold-rank .lb-pts");
      if (lb) {
        const cur = parseInt(lb.textContent) || 0;
        lb.textContent = (cur + 15) + " XP";
      }
    });
  });
})();

/* ── 8. TOAST ── */
function showToast(msg) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    Object.assign(toastContainer.style, {
      position: "fixed", bottom: "2rem", right: "2rem",
      zIndex: "3000", display: "flex", flexDirection: "column", gap: "0.5rem"
    });
    document.body.appendChild(toastContainer);
  }
  const toast = document.createElement("div");
  Object.assign(toast.style, {
    background: "var(--blue-800)", color: "#fff",
    padding: "0.75rem 1.25rem", borderRadius: "8px",
    fontFamily: "'Source Serif 4', serif", fontSize: "0.88rem",
    boxShadow: "var(--shadow-md)",
    borderLeft: "3px solid var(--gold)",
    animation: "fadeUp 0.3s ease",
    transform: "translateY(0)"
  });
  toast.textContent = msg;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ── 9. SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ── 10. PRINT CASE ── */
function printCase() {
  window.print();
}

/* ── 11. DOWNLOAD SCAFFOLD (demo) ── */
function downloadScaffold(filename) {
  showToast("📄 Descargando guía: " + filename);
}
