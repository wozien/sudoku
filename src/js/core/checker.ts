import { makeMatrix, getBoxArr, convertToRowCol } from 'js/core/utils';

/**
 * 检查用户数独数据
 */
class Checker {
  public matrix: number[][];
  public matrixMasks: boolean[][];
  public isSucess: boolean;

  constructor(matrix: number[][]) {
    this.matrix = matrix;
    this.matrixMasks = makeMatrix(true);
    this.isSucess = false;
  }

  check() {
    this._checkRow();
    this._checkCol();
    this._checkBox();
    this.isSucess = this.matrixMasks.every(row => row.every(mark => mark));
    return this.isSucess;
  }

  _checkArr(arr: number[]) {
    const marks = new Array(9).fill(true);
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      if (!marks[i]) continue;

      if (!arr[i]) {
        marks[i] = false;
        continue;
      }

      for (let j = i + 1; j < len; j++) {
        if (arr[i] === arr[j]) {
          marks[i] = marks[j] = false;
        }
      }
    }
    return marks;
  }

  _checkRow() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const rowArr = this.matrix[rowIndex];
      const marks = this._checkArr(rowArr);
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (!marks[colIndex]) {
          this.matrixMasks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  _checkCol() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const colArr = Array.from({ length: 9 }, (v, i) => this.matrix[i][colIndex]);
      const marks = this._checkArr(colArr);
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        if (!marks[rowIndex]) {
          this.matrixMasks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  _checkBox() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxArr = getBoxArr(this.matrix, boxIndex);
      const marks = this._checkArr(boxArr);
      for (let i = 0; i < 9; i++) {
        if (!marks[i]) {
          const { rowIndex, colIndex } = convertToRowCol(boxIndex, i);
          this.matrixMasks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}

export default Checker;
