
// bullet.js
class Bullet {
  constructor(row, col, direction, value = 50) {
    this.row = row;
    this.col = col;
    this.value = value;      // índice de sprite de la bala
    this.direction = direction;
    this.moveTimer = 0;
    this.moveDelay = 0.1;
    this.isActive = true;
  }

  update(dt, mapMatrix) {
    if (!this.isActive) return;

    this.moveTimer += dt;
    if (this.moveTimer < this.moveDelay) return;
    this.moveTimer = 0;

    // Delta de dirección
    let dr = 0, dc = 0;
    switch (this.direction) {
      case "up":    dr = -1; break;
      case "down":  dr =  1; break;
      case "left":  dc = -1; break;
      case "right": dc =  1; break;
    }

    const nr = this.row + dr;
    const nc = this.col + dc;
    const result = this.checkCollision(nr, nc, mapMatrix);

    if (result === "move") {
      // Limpia celda anterior si hay bala
      if (mapMatrix.getValue(this.row, this.col) === this.value) {
        mapMatrix.setValue(this.row, this.col, 0);
      }
      // Avanza y dibuja bala
      this.row = nr;
      this.col = nc;
      mapMatrix.setValue(this.row, this.col, this.value);
    } else if (result === "destroy") {
      this.isActive = false;
      mapMatrix.setValue(this.row, this.col, 0);
    }
  }

  checkCollision(nr, nc, mapMatrix) {
    if (!mapMatrix.isValidPosition(nr, nc)) return "destroy";

    const tile = mapMatrix.getValue(nr, nc);
    if (tile === 1) return "destroy";       // muro: se destruye
    if (tile === 3) {                       // roca: se rompe y deja piso
      mapMatrix.setValue(nr, nc, 2);
      return "destroy";
    }
    if (tile === 150) return "move";        // entra a la celda para que Game aplique daño
    if (tile === 0 || tile === 2) return "move";

    return "move";
  }
}
