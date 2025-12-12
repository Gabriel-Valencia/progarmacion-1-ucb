
// enemy.js
class Enemy {
  constructor(row, col, value = 150, health = 1) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.maxHealth = health;
    this.health = health;
    this.moveTimer = 0;
    this.moveDelay = 0.5;
  }

  updateAI(player, mapMatrix) {
    // Nota: usa 1/60 como dt aproximado; si quieres lo cambiamos a dt real
    this.moveTimer += 1 / 60;
    if (this.moveTimer < this.moveDelay) return;
    this.moveTimer = 0;

    // Seguir al jugador
    let dr = 0, dc = 0;
    const dRow = Math.abs(player.row - this.row);
    const dCol = Math.abs(player.col - this.col);

    if (dRow >= dCol) {
      if (player.row > this.row) dr = 1; else if (player.row < this.row) dr = -1;
    } else {
      if (player.col > this.col) dc = 1; else if (player.col < this.col) dc = -1;
    }

    if (dr === 0 && dc === 0) {
      if (dRow < dCol) { if (player.row > this.row) dr = 1; else if (player.row < this.row) dr = -1; }
      else { if (player.col > this.col) dc = 1; else if (player.col < this.col) dc = -1; }
    }

    this.tryMove(dr, dc, mapMatrix);
  }

  tryMove(dr, dc, mapMatrix) {
    const nr = this.row + dr;
    const nc = this.col + dc;
    if (!mapMatrix.isValidPosition(nr, nc)) return;

    const t = mapMatrix.getValue(nr, nc);
    if (t === 1 || t === 3 || t === 150) return;

    mapMatrix.setValue(this.row, this.col, 0);
    this.row = nr;
    this.col = nc;
    mapMatrix.setValue(this.row, this.col, this.value);
  }

  takeDamage(amount = 1) {
    this.health = Math.max(0, this.health - amount);
    return this.health <= 0;
  }
}
