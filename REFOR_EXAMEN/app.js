// Elementos del DOM
const canvas = document.getElementById('matrixCanvas');
const fillButton = document.getElementById('fillBtn');
const clearButton = document.getElementById('clearBtn');
//anadir aca  tu ejercicio ------------------------------------------------
const ejercicioUnoBtn = document.getElementById('ejercicioUnoBtn');//Convierto el btn en una var


// Contexto de dibujo
const context = canvas.getContext('2d');

// Instancia de la CLASS matrix
const matrix = new Matrix(10, 10, 0);

// Inicializa el canvas y dibuja la matriz
function initializeCanvas() {
  drawMatrix();
  window.addEventListener('resize', drawMatrix);
  fillButton.addEventListener('click', fillMatrix);
  clearButton.addEventListener('click', clearCanvas);
  //anadir aca tu ejericicio----------------------------------------------------------
  ejercicioUnoBtn.addEventListener('click', ejercicioUnoBtnApp);//Click a "ejercicioUnoBtn"
 
  
}

// Dibuja la matriz en el canvas
function drawMatrix() {
  const width = canvas.width = canvas.clientWidth;
  const height = canvas.height = canvas.clientHeight;
  const cellWidth = width / matrix.cols;
  const cellHeight = height / matrix.rows;

  context.clearRect(0, 0, width, height);
  context.font = `${Math.min(cellWidth, cellHeight) / 3}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (let row = 0; row < matrix.rows; row++) {
    for (let col = 0; col < matrix.cols; col++) {
      const x = col * cellWidth;
      const y = row * cellHeight;
      const value = matrix.getValue(row, col);

      context.strokeRect(x, y, cellWidth, cellHeight);//margen de la celda
      context.fillText(value, x + cellWidth / 2, y + cellHeight / 2);//dibuja el valor
    }
  }
}

// Llena la matriz con valores aleatorios y la dibuja
function fillMatrix() {
  matrix.fillRandom(1, 100);
  drawMatrix();
}

// Limpia el canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
  //anadir aca tu ejercicio--------------------------
function ejercicioUnoBtnApp() {
  matrix.ejercicio1(); // Guardamos el valor
  drawMatrix();                     // Dibujamos la matriz
}



// Ejecuta la inicialización
initializeCanvas();