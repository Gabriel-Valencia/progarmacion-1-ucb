
// app.js
// Canvas a pantalla completa
const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Elementos UI
const startMenu = document.getElementById("start-menu");
const startForm = document.getElementById("start-form");
const playerNameInput = document.getElementById("player-name");
const loseScreen = document.getElementById("lose-screen");
const winScreen = document.getElementById("win-screen");
const restartButtonLose = document.getElementById("restart-button-lose");
const restartButtonWin = document.getElementById("restart-button-win");
const nextLevelButton = document.getElementById("next-level-button");

let currentGame = null;
let currentPlayerName = "";

// --- Menú inicial ---
function showStartMenu() {
  canvas.classList.add("hidden");
  loseScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  startMenu.classList.remove("hidden");

  // Precargar nombre anterior
  playerNameInput.value = localStorage.getItem("lastPlayerName") || "";

  // Pintar récords
  if (currentGame && typeof currentGame.loadRecords === "function") {
    currentGame.loadRecords();
  } else {
    loadAndDisplayRecords(1);
  }
}

// --- Cargar juego ---
function loadGame(level) {
  const levelData = MAP_DATA[level];
  if (!levelData) return;

  startMenu.classList.add("hidden");
  loseScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  canvas.classList.remove("hidden");

  // Matriz del nivel
  const mapMatrix = new Matrix(1, 1);
  mapMatrix.fillFromArray(levelData);

  // Índices de tiles usados (desde el nivel) + bala (50)
  const usedIndices = new Set();
  for (const row of levelData) for (const v of row) usedIndices.add(v);
  usedIndices.add(50); // bala

  // Cargar imágenes
  const images = {};
  let loadedCount = 0;
  const totalImages = usedIndices.size;

  const initializeGame = () => {
    currentGame = new Game("gameCanvas", mapMatrix, images, level, currentPlayerName);
  };

  if (totalImages === 0) {
    initializeGame();
    return;
  }

  for (const idx of usedIndices) {
    const img = new Image();
    img.src = `assets/${idx}.png`;
    img.onload = () => {
      loadedCount++;
      images[idx] = img;
      if (loadedCount === totalImages) initializeGame();
    };
    img.onerror = () => {
      console.warn(`No se encontró assets/${idx}.png`);
      loadedCount++;
      images[idx] = null;
      if (loadedCount === totalImages) initializeGame();
    };
  }
}

// --- Récords en menú sin Game ---
function loadAndDisplayRecords(level = 1) {
  let store;
  try {
    store = JSON.parse(localStorage.getItem("gameRecords") || "{}");
  } catch {
    store = {};
  }

  const levelKey = String(level);
  const levelRecords = Array.isArray(store[levelKey]) ? store[levelKey] : [];
  levelRecords.sort((a, b) => Number(a.time) - Number(b.time));

  const recordsList = document.getElementById("records-list");
  if (!recordsList) return;

  recordsList.innerHTML = "";
  if (levelRecords.length === 0) {
    recordsList.innerHTML = "<li>Sin récords aún. ¡Sé el primero!</li>";
    return;
  }

  levelRecords.slice(0, 5).forEach((record, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${i + 1}. ${record.name}</strong><span>${Number(record.time).toFixed(2)}s</span>`;
    recordsList.appendChild(li);
  });

  const title = document.getElementById("records-title");
  if (title) title.textContent = `🏆 Récords - Nivel ${level} (Mejor Tiempo)`;
}

// --- Eventos UI ---
startForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPlayerName = playerNameInput.value.trim() || "Operador Desconocido";
  localStorage.setItem("lastPlayerName", currentPlayerName);
  loadGame(1);
});

const restartGame = () => showStartMenu();
restartButtonLose.addEventListener("click", restartGame);
restartButtonWin.addEventListener("click", restartGame);

nextLevelButton.addEventListener("click", () => {
  if (currentGame) {
    const nextLevel = currentGame.level + 1;
    loadGame(nextLevel);
  }
});

// --- Inicialización ---
window.addEventListener("load", () => {
  showStartMenu();

  const audio = document.getElementById("bgm");
  const initAudio = () => {
    audio.play().catch((err) => console.warn("No se pudo iniciar el audio:", err));
    document.removeEventListener("click", initAudio);
    document.removeEventListener("keydown", initAudio);
  };
  document.addEventListener("click", initAudio);
  document.addEventListener("keydown", initAudio);
});
