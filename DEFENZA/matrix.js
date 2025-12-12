
// matrix.js
class Matrix {
  constructor(rowsParam, colsParam, defaultValue = 1) {
    this.rows = rowsParam;
    this.cols = colsParam;
    this.data = [];
    for (let i = 0; i < rowsParam; i++) {
      const rowTemp = [];
      for (let j = 0; j < colsParam; j++) rowTemp.push(defaultValue);
      this.data.push(rowTemp);
    }
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  setValue(row, col, value) {
    if (this.isValidPosition(row, col)) this.data[row][col] = value;
  }

  getValue(row, col) {
    if (!this.isValidPosition(row, col)) return null;
    return this.data[row][col];
  }

  fillFromArray(array2D) {
    const rows = Array.isArray(array2D) ? array2D.length : 0;
    const cols = rows > 0 && Array.isArray(array2D[0]) ? array2D[0].length : 0;
    this.data = new Array(rows);
    for (let r = 0; r < rows; r++) this.data[r] = array2D[r].slice();
    this.rows = rows;
    this.cols = cols;
  }

  toString() {
    return this.data.map((row) => row.join("\t")).join("\n");
  }
}
