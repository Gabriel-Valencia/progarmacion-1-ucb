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

  //EJERCICIO 1
  
   // EJERCICIO 98 - Flecha doble (dos flechas cruzadas en el centro)
  ejercicio98_doubleArrow() {
    if (this.rows !== this.cols) throw new Error('Flecha doble: matriz cuadrada');
    const n = this.rows;
    const c = Math.floor(n / 2);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const cond = (j === c) || (i === j) || (i + j === n - 1);
        this.data[i][j] = cond ? 1 : 0;
      }
    }
    return this.data;
  }






  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}