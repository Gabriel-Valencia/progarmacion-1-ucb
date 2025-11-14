class Matrix {
  rows;
  cols;
  data;

  constructor(rowsParam, colsParam, defaultValue) {
    this.rows = rowsParam;
    this.cols = colsParam;
    this.data = [];

    for (let i = 0; i < rowsParam; i++) {
      const rowTemp = [];
      for (let j = 0; j < colsParam; j++) {
        rowTemp.push(defaultValue);
      }
      this.data.push(rowTemp);
    }
  }

  //Función de validacion de rango valido en la matriz
  isValidPosition(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  setValue(row, col, value) {
    //if (isValidPosition(row, col)) {
    this.data[row][col] = value;
    //}
  }

  getValue(row, col) {
    if (this.isValidPosition(row, col)) {
      return this.data[row][col];
    } else {
      return null
    }
  }

  fillRandom(min, max) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        this.data[i][j] = random;
      }
    }
  }

  ejercicioClase() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = (j % 3) + (i * 3 + 1);
      }
    }
  }
  
  ejercicio2() {
    console.log("entor al ejercicio2")
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i === 0 || j === 0 || i === 9 || j === 9) {
          this.data[i][j] = 0;
        }
        else {
          this.data[i][j] = 1;
        }
      }
    }
  }
  ejercicio3() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {

        var mitadColumna = Math.floor(this.cols / 2);
        var mitadFilas = Math.floor(this.rows / 2);
        if (i === mitadFilas || j === mitadColumna) {
          this.data[i][j] = 1;
        }
      }
    }
  }

  ejercicio4() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i === 0 || j === 0 || i === 9 || j === 9) {
          this.data[i][j] = 1;
        }
        else {
          if (i === j || i + j === 9) {
            this.data[i][j] = 2;

          }
          else {
            this.data[i][j] = 0;
          }
        }
      }
    }
  }


  
  ejercicio5(){
  if (this.rows === 0 || this.cols === 0) return;
  
  const originalRows = this.rows;
  const originalCols = this.cols;
  const rotatedData = [];

  for (let j = 0; j < originalCols; j++) {
    const newRow = [];
    for (let i = originalRows - 1; i >= 0; i--) { 
      newRow.push(this.data[i][j]); 
    }
    rotatedData.push(newRow);
  }
  this.rows = originalCols;
  this.cols = originalRows;
  this.data = rotatedData;
  }



  

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }

    // Método: rellenar la matriz con nombres de imágenes (array de strings)
  fillFromAssets(imageNames) {
    let index = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (index < imageNames.length) {
          // Extraer número del nombre de archivo (ej: "img_5.png" → 5)
          const match = imageNames[index].match(/\d+/);
          this.data[i][j] = match ? parseInt(match[0]) : imageNames[index];
          index++;
        } else {
          this.data[i][j] = null; // si no hay más imágenes
        }
      }
    }
  }
}