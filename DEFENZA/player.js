
// player.js
class Player {
  constructor(row, col, value = 100) {
    this.row = row;
    this.col = col;
    this.value = value;       // marcador en el mapa (no se dibuja directamente)
    this.direction = "down";  // 'up' | 'down' | 'left' | 'right'
    this.state = "idle";      // 'idle' | 'walk'
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.frameDelay = 0.12;
  }

  move(dr, dc, rows, cols) {
    const nr = this.row + dr;
    const nc = this.col + dc;
    if (nr < 0 || nr >= rows) return;
    if (nc < 0 || nc >= cols) return;

    this.row = nr;
    this.col = nc;

    if (dr < 0) this.direction = "up";
    else if (dr > 0) this.direction = "down";
    else if (dc < 0) this.direction = "left";
    else if (dc > 0) this.direction = "right";

    this.state = "walk";
  }

  updateAnimation(dt, isMoving) {
    this.frameTimer += dt;
    this.state = isMoving ? "walk" : "idle";

    if (this.frameTimer >= this.frameDelay) {
      this.frameTimer = 0;
      this.frameIndex++;
    }
  }

  getCurrentSpriteIndex(spriteSets) {
    const set = this.state === "walk"
      ? spriteSets.walk[this.direction]
      : spriteSets.idle[this.direction];
    return set[this.frameIndex % set.length];
  }
}
