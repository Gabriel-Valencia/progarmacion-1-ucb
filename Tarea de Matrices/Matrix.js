// FUNCIONES DE MATRICES (EJERCICIOS 1–11)
// Todas las matrices son de 10 filas × 9 columnas

function crearMatriz(filas = 10, columnas = 9, valor = 0) {
  return Array.from({ length: filas }, () => Array(columnas).fill(valor));
}

// Ejercicio 1: Cuadrado Relleno
function matrizEj1() {
  return crearMatriz(10, 9, 1);
}

// Ejercicio 2: Marco Interno
function matrizEj2() {
  const m = crearMatriz();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 9; j++) {
      m[i][j] = (i === 0 || i === 9 - 1 || j === 0 || j === 9 - 1) ? 0 : 1;
    }
  }
  return m;
}

// Ejercicio 3: Cruces
function matrizEj3() {
  const m = crearMatriz();
  const midFila = Math.floor(10 / 2) - 1; // índice 4
  const midCol = Math.floor(9 / 2);       // índice 4
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 9; j++) {
      if (i === midFila || j === midCol) m[i][j] = 1;
    }
  }
  return m;
}

// Ejercicio 4: Bordes y Diagonales
function matrizEj4() {
  const m = crearMatriz();
  const filas = 10, cols = 9;
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || i === filas - 1 || j === 0 || j === cols - 1) {
        m[i][j] = 1; // Bordes
      } else if (i === j || i + j === cols - 1) {
        m[i][j] = 2; // Diagonales dentro del área interna
      }
    }
  }
  return m;
}

// Ejercicio 5: Bandera (3 franjas horizontales)
function matrizEj5() {
  const m = crearMatriz();
  for (let i = 0; i < 10; i++) {
    const val = i < 3 ? 1 : i < 6 ? 2 : 0;
    for (let j = 0; j < 9; j++) {
      m[i][j] = val;
    }
  }
  return m;
}

// Ejercicio 6: Relleno Alterno
function matrizEj6() {
  const m = crearMatriz();
  for (let i = 0; i < 10; i++) {
    m[i].fill(i % 2 === 0 ? 1 : 0);
  }
  return m;
}

// Ejercicio 7: Zig-Zag Horizontal (Diagonal principal)
function matrizEj7() {
  const m = crearMatriz();
  const min = Math.min(10, 9);
  for (let i = 0; i < min; i++) {
    m[i][i] = 1;
  }
  return m;
}

// Ejercicio 8: Relleno en Espiral (ajustado a 10×9)
function matrizEj8() {
  const m = crearMatriz();
  const filas = 10, cols = 9;

  // Capa exterior
  for (let j = 0; j < cols; j++) m[0][j] = 1;
  for (let i = 1; i < filas - 1; i++) m[i][cols - 1] = 1;
  for (let j = 0; j < cols; j++) m[filas - 1][j] = 1;
  for (let i = 1; i < filas - 1; i++) m[i][0] = 1;

  // Capas internas (adaptadas visualmente)
  for (let j = 2; j < cols - 1; j++) m[2][j] = 1;
  for (let j = 2; j < cols - 1; j++) m[4][j] = 1;
  for (let j = 2; j < cols - 1; j++) m[6][j] = 1;

  m[1][cols - 2] = 1;
  m[3][2] = 1; m[3][cols - 2] = 1;
  m[5][2] = 1; m[5][cols - 2] = 1;
  m[7][1] = 1; m[7][cols - 2] = 1;
  m[8][cols - 2] = 1;

  return m;
}

// Ejercicio 9: Triángulo Superior Izquierdo
function matrizEj9() {
  const m = crearMatriz();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j <= i && j < 9; j++) {
      m[i][j] = 1;
    }
  }
  return m;
}

// Ejercicio 10: Triángulo Inferior Derecho
function matrizEj10() {
  const m = crearMatriz();
  for (let i = 0; i < 10; i++) {
    for (let j = 9 - i - 1; j < 9; j++) {
      if (j >= 0) m[i][j] = 1;
    }
  }
  return m;
}

// Ejercicio 11: Cuadrícula
function matrizEj11() {
  const m = crearMatriz();
  const filas = 10, cols = 9;
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < cols; j++) {
      if (i % 2 === 0 || j === 0 || j === cols - 1) m[i][j] = 1;
    }
  }
  return m;
}
