// Maps theme colors to CSS variable names.
const CSS_VAR = {
  background: "--bg",
  foreground: "--fg",
  accent: "--accent",
  accentForeground: "--accent-fg",
};

// Starting theme
const theme = {
  background: { r: 255, g: 255, b: 255 },
  foreground: { r: 31, g: 41, b: 55 },
  accent: { r: 59, g: 130, b: 246 },
  accentForeground: { r: 255, g: 255, b: 255 },
};

const clamp = (n) => Math.max(0, Math.min(255, n));
const toHexPart = (n) => clamp(n).toString(16).padStart(2, "0");
const rgbToHex = ({ r, g, b }) => `#${toHexPart(r)}${toHexPart(g)}${toHexPart(b)}`;

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

const card = document.getElementById("preview-card");
const jsonOutput = document.getElementById("json-output");
const fields = document.querySelectorAll(".color-field");

function applyCard() {
  for (const role in CSS_VAR) {
    card.style.setProperty(CSS_VAR[role], rgbToHex(theme[role]));
  }
}

function renderJson() {
  const color = (c) => ({
    $type: "site.standard.theme.color#rgb",
    r: c.r,
    g: c.g,
    b: c.b,
  });
  const record = {
    $type: "site.standard.theme.basic",
    background: color(theme.background),
    foreground: color(theme.foreground),
    accent: color(theme.accent),
    accentForeground: color(theme.accentForeground),
  };
  jsonOutput.innerHTML = highlightJson(JSON.stringify(record, null, 2));
}

function highlightJson(json) {
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(?:\\.|[^"\\])*"(\s*:)?|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "tok-num";
      if (/^"/.test(match)) {
        cls = /:\s*$/.test(match) ? "tok-key" : "tok-str";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function syncFieldInputs(field, role) {
  field.querySelector(".hex-input").value = rgbToHex(theme[role]);
  field.querySelectorAll(".rgb-input").forEach((input) => {
    input.value = theme[role][input.dataset.channel];
  });
}

fields.forEach((field) => {
  const role = field.dataset.role;

  field.querySelector(".hex-input").addEventListener("input", (e) => {
    theme[role] = hexToRgb(e.target.value);
    syncFieldInputs(field, role);
    applyCard();
    renderJson();
  });

  field.querySelectorAll(".rgb-input").forEach((input) => {
    input.addEventListener("input", () => {
      const value = clamp(parseInt(input.value, 10) || 0);
      input.value = value;
      theme[role][input.dataset.channel] = value;
      field.querySelector(".hex-input").value = rgbToHex(theme[role]);
      applyCard();
      renderJson();
    });
  });

  syncFieldInputs(field, role);
});

const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", async () => {
  navigator.clipboard.writeText(jsonOutput.textContent).then(
    () => {
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("is-copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
      }, 1500);
    },
    (e) => {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
    }
  )
});

applyCard();
renderJson();
