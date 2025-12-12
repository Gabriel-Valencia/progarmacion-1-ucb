
// game.js
const PLAYER_SPRITE_SETS = {
  idle:  { down: [100, 100], up: [100, 100], left: [100, 100], right: [100, 100] },
  walk:  { down: [100, 100, 100, 100], up: [100, 100, 100, 100], left: [100, 100, 100, 100], right: [100, 100, 100, 100] }
};

class Game {
  startCellCleared = false;
  lastTime = 0;
  autoFireTimer = 0;
  autoFireDelay = 0.3;
  isGameOver = false;
  isGameWon = false;
  playerName = "Operador";
  level = 1;
  startTime = 0;
  totalEnemies = 0;
  killedEnemies = 0;

  constructor(canvasId, mapMatrix, images, level = 1, playerName = "Operador") {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.rows = mapMatrix.rows;
    this.cols = mapMatrix.cols;
    this.cellSize = Math.floor(Math.min(this.canvas.width / this.cols, this.canvas.height / this.rows));

    this.mapMatrix = mapMatrix;
    this.images = images;
    this.playerName = playerName;
    this.level = level;

    // Jugador (sin vidas)
    this.player = this.initPlayer();

    // Enemigos (con HP por nivel)
    this.enemies = this.initEnemies();
    this.totalEnemies = this.enemies.length;

    // Balas y cámara
    this.bullets = [];
    this.offsetX = 0;
    this.offsetY = 0;
    this.updateCamera();

    // Controles y loop
    this.initControls();
    if (!this.isGameOver && !this.isGameWon) {
      this.startTime = performance.now();
      this.gameLoop();
    }
  }

  // Loop
  gameLoop(timestamp = 0) {
    if (this.isGameOver || this.isGameWon) return;
    const dt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(dt);
    this.draw();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  // Update
  update(dt) {
    const isMoving = this.player.state === "walk";
    this.player.updateAnimation(dt, isMoving);
    this.player.state = "idle";

    // Enemigos
    for (const enemy of this.enemies) this.moveEnemy(enemy);

    // Balas
    const activeBullets = [];
    for (const bullet of this.bullets) {
      bullet.update(dt, this.mapMatrix);

      if (bullet.isActive) {
        const hit = this.checkBulletEnemyHit(bullet.row, bullet.col);
        if (hit) {
          const died = hit.takeDamage(1);
          bullet.isActive = false;
          this.mapMatrix.setValue(bullet.row, bullet.col, 0);
          if (died) this.killEnemy(hit);
          else this.mapMatrix.setValue(hit.row, hit.col, hit.value);
        }
      }
      if (bullet.isActive) activeBullets.push(bullet);
      else this.mapMatrix.setValue(bullet.row, bullet.col, 0);
    }
    this.bullets = activeBullets;

    // Colisión jugador-enemigo => perder
    this.checkCollisions();

    // Auto-disparo
    this.autoFireTimer += dt;
    if (this.autoFireTimer >= this.autoFireDelay) {
      this.autoFireTimer = 0;
      this.handleShoot();
    }

    // Victoria
    if (this.killedEnemies === this.totalEnemies && !this.isGameWon) this.winGame();

    // Cámara
    this.updateCamera();
  }

  // Draw (centrado)
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const mapW = this.cols * this.cellSize;
    const mapH = this.rows * this.cellSize;
    const centerX = (this.canvas.width - mapW) / 2;
    const centerY = (this.canvas.height - mapH) / 2;

    // Tiles (excepto 100)
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const value = this.mapMatrix.getValue(r, c);
        if (value === 100) continue;
        const img = this.images[value];
        if (img) {
          this.ctx.drawImage(
            img,
            c * this.cellSize - this.offsetX + centerX,
            r * this.cellSize - this.offsetY + centerY,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }

    // Jugador
    const spriteIndex = this.player.getCurrentSpriteIndex(PLAYER_SPRITE_SETS);
    const playerImg = this.images[spriteIndex];
    if (playerImg) {
      this.ctx.drawImage(
        playerImg,
        this.player.col * this.cellSize - this.offsetX + centerX,
        this.player.row * this.cellSize - this.offsetY + centerY,
        this.cellSize,
        this.cellSize
      );
    }
  }

  // Utilidad
  initPlayer() {
    let row = -1, col = -1;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.mapMatrix.getValue(r, c) === 100) {
          row = r; col = c;
          this.mapMatrix.setValue(r, c, 0); // quitar 100 del mapa
          break;
        }
      }
    }
    return new Player(row, col);
  }

  getEnemyHealthForLevel() {
    switch (this.level) {
      case 1: return 1;
      case 2: return 3;
      case 3: return 5;
      default: return 1;
    }
  }

  initEnemies() {
    const enemies = [];
    const hp = this.getEnemyHealthForLevel();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.mapMatrix.getValue(r, c) === 150) enemies.push(new Enemy(r, c, 150, hp));
      }
    }
    return enemies;
  }

  initControls() {
    document.addEventListener("keydown", (e) => {
      if (this.isGameOver || this.isGameWon) return;
      switch (e.key) {
        case "ArrowUp":
        case "w": this.handleMove(-1, 0); break;
        case "ArrowDown":
        case "s": this.handleMove( 1, 0); break;
        case "ArrowLeft":
        case "a": this.handleMove( 0,-1); break;
        case "ArrowRight":
        case "d": this.handleMove( 0, 1); break;
      }
    });
  }

  updateCamera() {
    this.offsetX = Math.max(
      0,
      Math.min(
        this.player.col * this.cellSize + this.cellSize / 2 - this.canvas.width / 2,
        this.cols * this.cellSize - this.canvas.width
      )
    );
    this.offsetY = Math.max(
      0,
      Math.min(
        this.player.row * this.cellSize + this.cellSize / 2 - this.canvas.height / 2,
        this.rows * this.cellSize - this.canvas.height
      )
    );
  }

  moveEnemy(enemy) {
    const br = enemy.row, bc = enemy.col;
    enemy.updateAI(this.player, this.mapMatrix);
    const moved = enemy.row !== br || enemy.col !== bc;
    if (moved) {
      this.mapMatrix.setValue(br, bc, 0);
      this.mapMatrix.setValue(enemy.row, enemy.col, enemy.value);
    }
  }

  handleMove(dr, dc) {
    const nr = this.player.row + dr;
    const nc = this.player.col + dc;
    if (!this.mapMatrix.isValidPosition(nr, nc)) return;
    const tile = this.mapMatrix.getValue(nr, nc);
    if (tile === 1 || tile === 150 || tile === 3) return; // bloqueado

    if (!this.startCellCleared) {
      this.mapMatrix.setValue(this.player.row, this.player.col, 0);
      this.startCellCleared = true;
    }

    this.player.move(dr, dc, this.rows, this.cols);
    this.player.state = "walk";
    this.updateCamera();
  }

  handleShoot() {
    const b = new Bullet(this.player.row, this.player.col, this.player.direction);
    this.bullets.push(b);
    this.mapMatrix.setValue(b.row, b.col, b.value);
  }

  // Lógica de juego
  checkBulletEnemyHit(row, col) {
    return this.enemies.find((e) => e.row === row && e.col === col);
  }

  killEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    this.mapMatrix.setValue(enemy.row, enemy.col, 0);
    this.killedEnemies++;
  }

  checkCollisions() {
    for (const enemy of this.enemies) {
      if (enemy.row === this.player.row && enemy.col === this.player.col) {
        this.gameOver(`El Agente te alcanzó en el Nivel ${this.level}.`);
        return;
      }
    }
  }

  gameOver(message) {
    this.isGameOver = true;
    document.getElementById("gameCanvas").classList.add("hidden");
    const loseScreen = document.getElementById("lose-screen");
    const msg = document.getElementById("lose-message");
    if (msg) msg.textContent = message;
    loseScreen.classList.remove("hidden");
  }

  winGame() {
    this.isGameWon = true;
    const elapsed = (performance.now() - this.startTime) / 1000;

    this.saveRecord(elapsed);

    document.getElementById("gameCanvas").classList.add("hidden");
    const winScreen = document.getElementById("win-screen");
    const finalTimeEl = document.getElementById("final-time");
    if (finalTimeEl) finalTimeEl.textContent = elapsed.toFixed(2);

    const totalLevels = Object.keys(MAP_DATA).length;
    if (this.level < totalLevels) {
      document.getElementById("win-title").textContent = `¡NIVEL ${this.level} DESPEJADO! 🎉`;
      document.getElementById("next-level-button").classList.remove("hidden");
      document.getElementById("restart-button-win").classList.add("hidden");
    } else {
      document.getElementById("win-title").textContent = "¡HAS GANADO EL JUEGO COMPLETO! 🏆";
      document.getElementById("next-level-button").classList.add("hidden");
      document.getElementById("restart-button-win").classList.remove("hidden");
    }
    winScreen.classList.remove("hidden");
  }

  // Récords por nivel
  loadRecords() {
    let raw = localStorage.getItem("gameRecords") || "{}";
    let store;
    try {
      store = JSON.parse(raw);
    } catch {
      try {
        const oldArr = JSON.parse(raw);
        store = { [String(this.level)]: Array.isArray(oldArr) ? oldArr : [] };
      } catch {
        store = {};
      }
    }

    const levelKey = String(this.level);
    const levelRecords = Array.isArray(store[levelKey]) ? store[levelKey] : [];
    levelRecords.sort((a, b) => Number(a.time) - Number(b.time));

    const list = document.getElementById("records-list");
    if (!list) return;

    list.innerHTML = "";
    if (levelRecords.length === 0) {
      list.innerHTML = "<li>Sin récords aún. ¡Sé el primero!</li>";
      return;
    }

    levelRecords.slice(0, 5).forEach((r, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${i + 1}. ${r.name}</strong><span>${Number(r.time).toFixed(2)}s</span>`;
      list.appendChild(li);
    });

    const title = document.getElementById("records-title");
    if (title) title.textContent = `🏆 Récords - Nivel ${this.level} (Mejor Tiempo)`;
  }

  saveRecord(time) {
    const t = typeof time === "string" ? parseFloat(time) : Number(time);
    let store;
    try {
      store = JSON.parse(localStorage.getItem("gameRecords") || "{}");
    } catch {
      store = {};
    }

    const levelKey = String(this.level);
    const list = Array.isArray(store[levelKey]) ? store[levelKey] : [];
    const idx = list.findIndex((r) => r.name === this.playerName);

    if (idx !== -1) {
      if (t < Number(list[idx].time)) list[idx].time = t;
    } else {
      list.push({ name: this.playerName, time: t });
    }

    store[levelKey] = list;
    localStorage.setItem("gameRecords", JSON.stringify(store));
    this.loadRecords();
  }
}
