/**
 * 生成数独解决方案
 */

import { makeMatrix, shuffle, checkFillNumber } from 'js/core/utils';

class Generator {
  constructor() {
    this.matrix = makeMatrix();
    this.ordersMatrix = this._getOrdersMatrix();
  }

  /**
   * 生成数独解决方案
   */
  generate() {
    let count = 1;
    while(!this._fillNumber() && count < 100) {
      console.log('try agin');
      this.matrix = makeMatrix();
      this.ordersMatrix = this._getOrdersMatrix();
      count++;
    }
  }

  /**
   * 生成随机数矩阵
   */
  _getOrdersMatrix() {
    return makeMatrix().map(row => {
      const arr = Array.from({ length: 9 }, (v, i) => i);
      return shuffle(arr);
    });
  }

  /**
   * 填写1-9到矩阵中
   */
  _fillNumber() {
    for(let n = 1; n <= 9; n++) {
      if(!this._fillRow(n, 0)) {
        return false;
      }
    }
    return true;
  }

  /**
   * 在第n行填写n
   * @param {*} n 
   * @param {*} rowIndex 
   */
  _fillRow(n, rowIndex) {
    if(rowIndex > 8) {
      return true;
    }

    const orders = this.ordersMatrix[rowIndex];
    const rows = this.matrix[rowIndex];

    for(let i = 0; i < 9; i++) {
      let colIndex = orders[i];
      if (rows[colIndex] || !checkFillNumber(this.matrix, n, rowIndex, colIndex)) {
          continue;
      }

      rows[colIndex] = n;

      if(!this._fillRow(n, rowIndex + 1)) {
        rows[colIndex] = 0;
        continue;
      }
      return true;
    }
    return false;
  }
}

export default Generator;
